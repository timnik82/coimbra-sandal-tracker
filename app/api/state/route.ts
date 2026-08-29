import { env } from 'cloudflare:workers';
import { userStateSchema } from '@/db/schema';

export const dynamic = 'force-dynamic';

type Bindings = {
  DB: D1Database;
};

const MAX_STATE_BYTES = 200_000;

function userId(request: Request) {
  return request.headers.get('oai-authenticated-user-id');
}

async function ensureSchema(db: D1Database) {
  await db.prepare(userStateSchema).run();
}

export async function GET(request: Request) {
  const id = userId(request);
  if (!id) return Response.json({ error: 'authentication_required' }, { status: 401 });

  const db = (env as unknown as Bindings).DB;
  await ensureSchema(db);
  const row = await db
    .prepare('SELECT data_json, updated_at FROM user_state WHERE user_id = ?')
    .bind(id)
    .first<{ data_json: string; updated_at: string }>();

  if (!row) return Response.json({ data: null, updatedAt: null });

  try {
    return Response.json({ data: JSON.parse(row.data_json), updatedAt: row.updated_at });
  } catch {
    return Response.json({ data: null, updatedAt: row.updated_at });
  }
}

export async function PUT(request: Request) {
  const id = userId(request);
  if (!id) return Response.json({ error: 'authentication_required' }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'invalid_state' }, { status: 400 });
  }

  const dataJson = JSON.stringify(body);
  if (new TextEncoder().encode(dataJson).byteLength > MAX_STATE_BYTES) {
    return Response.json({ error: 'state_too_large' }, { status: 413 });
  }

  const db = (env as unknown as Bindings).DB;
  await ensureSchema(db);
  const updatedAt = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO user_state (user_id, data_json, updated_at)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET
         data_json = excluded.data_json,
         updated_at = excluded.updated_at`,
    )
    .bind(id, dataJson, updatedAt)
    .run();

  return Response.json({ saved: true, updatedAt });
}
