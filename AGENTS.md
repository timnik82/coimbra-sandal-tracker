# Sandal tracker agent notes

Before starting any new sandal search:

1. Read the `products` catalogue in `public/tracker.html`. It is the canonical
   list of every model already found, including rejected models.
2. Check the current user's archived state in the published Site (or the
   `user_state` D1 record when Sites database tools are available).
3. Do not add a model whose normalized brand and model already exist. Update its
   price, availability, evidence, or URL instead.
4. A model may leave the main view only through the user archive. Archiving must
   never delete it from the catalogue.
5. Keep the strict product requirement: a closed or strongly protected toe,
   secure heel retention, and a verified foam midsole with meaningful impact
   absorption. A padded footbed alone is insufficient.

User-specific notes, favourites, filters, statuses, and archive flags are stored
in D1 through `/api/state`. Browser storage is fallback-only.
