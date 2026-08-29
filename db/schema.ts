export const userStateSchema = `
CREATE TABLE IF NOT EXISTS user_state (
  user_id TEXT PRIMARY KEY,
  data_json TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL
)
`;
