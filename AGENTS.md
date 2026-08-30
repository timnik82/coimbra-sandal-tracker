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
6. Append every meaningful search run to the `searchLog` array in
   `public/tracker.html`: use the actual date, connector/source, a concise query
   summary, what the run added or confirmed, and the rejection rule applied.
7. Keep every product's structured availability fields complete. Use an ISO
   date or `null` for `lastChecked`, a finite EUR number or `null` for
   `priceEur`, and a string or `null` for `retailer` and `evidenceUrl`.
8. Size states are `in_stock`, `size_exists`, `out_of_stock`, or `unknown`.
   Portugal delivery is `confirmed`, `unavailable`, or `unknown`; Coimbra
   try-on is `confirmed`, `possible`, `unavailable`, or `unknown`; office
   suitability is `good`, `acceptable`, `sporty`, or `unknown`.
9. Never infer a structured value from words such as “comfort” or “cushioned”.
   When the cited source does not confirm a fact, keep it explicitly unknown.
10. Comparison selections are user state. Keep `compareIds` unique, limited to
    four existing catalogue IDs, and synchronized with `sortBy` in preferences.

User-specific notes, favourites, filters, statuses, and archive flags are stored
in D1 through `/api/state`. Browser storage is fallback-only.
