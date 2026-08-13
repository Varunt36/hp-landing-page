-- ============================================================
-- City Tour — public seat count for the booking page
-- Run this in the Supabase SQL Editor. Safe to re-run.
--
-- The booking page caps the tour at CITY_TOUR_CAPACITY (src/api/cityTour.ts)
-- and needs to know how many seats are gone before it renders the form. Every
-- city_tour_members row is a paid attendee — hp-registration-api writes them
-- only after the Stripe webhook confirms — so seats taken is a plain COUNT(*).
--
-- hp-registration-api/sql/city_tour.sql revokes ALL from anon, so the page
-- cannot run that count today. This opens the narrowest hole that makes it
-- work: SELECT on the `id` column ONLY, for anon ONLY.
--
-- The column list is the point. city_tour_members.full_name holds attendee
-- names and the anon key ships inside the public JS bundle, so a whole-table
-- GRANT would publish every name on the tour. With a column-level grant the
-- count succeeds and `select=full_name` is rejected outright.
--
-- Both halves of the gate are needed, same as 002: the GRANT (table
-- privilege) and a policy (row filter). Missing either still yields 401 or an
-- empty result.
--
-- city_tour_registrations is untouched and stays fully revoked from anon.
-- ============================================================

BEGIN;

SET LOCAL lock_timeout = '3s';
SET LOCAL statement_timeout = '30s';

GRANT SELECT (id) ON city_tour_members TO anon;

DROP POLICY IF EXISTS city_tour_members_public_count ON city_tour_members;
CREATE POLICY city_tour_members_public_count
  ON city_tour_members
  FOR SELECT
  TO anon
  USING (true);

COMMIT;


-- ── Verify ──────────────────────────────────────────────────
-- anon holds SELECT on `id` and nothing else (expect exactly one row, id):
--   SELECT column_name, privilege_type FROM information_schema.column_privileges
--    WHERE table_name = 'city_tour_members' AND grantee = 'anon';
--
-- anon has no table-wide grant (expect zero rows):
--   SELECT grantee, privilege_type FROM information_schema.role_table_grants
--    WHERE table_name = 'city_tour_members' AND grantee = 'anon';
--
-- city_tour_registrations still closed to anon (expect zero rows from both):
--   SELECT grantee, privilege_type FROM information_schema.role_table_grants
--    WHERE table_name = 'city_tour_registrations' AND grantee = 'anon';
--   SELECT grantee, column_name FROM information_schema.column_privileges
--    WHERE table_name = 'city_tour_registrations' AND grantee = 'anon';
--
-- End to end, with the anon key and no session. The first returns a
-- Content-Range count; the second must fail with 42501 / permission denied:
--   curl -sI "$URL/rest/v1/city_tour_members?select=id" \
--     -H "apikey: $ANON" -H "Prefer: count=exact" -H "Range: 0-0"
--   curl -s "$URL/rest/v1/city_tour_members?select=full_name" -H "apikey: $ANON"


-- ── Rollback ────────────────────────────────────────────────
-- BEGIN;
--   DROP POLICY IF EXISTS city_tour_members_public_count ON city_tour_members;
--   REVOKE SELECT (id) ON city_tour_members FROM anon;
-- COMMIT;
