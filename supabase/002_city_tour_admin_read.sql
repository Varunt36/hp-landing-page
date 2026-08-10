-- ============================================================
-- City Tour — read access for the admin panel
-- Run this in the Supabase SQL Editor. Safe to re-run.
--
-- hp-registration-api/sql/city_tour.sql closes these tables to the Data API
-- (RLS on, no policies, ALL revoked from anon and authenticated) so the anon
-- key shipped in the public bundle cannot read bookings. The admin panel
-- signs in with Supabase Auth and therefore acts as `authenticated`, so it
-- needs both halves of the gate opened: the GRANT (table privilege) and a
-- policy (row filter). Missing either one still yields 401/empty.
--
-- SELECT only, and only for `authenticated` — anon stays fully revoked.
-- Every logged-in user is an admin here; if that ever changes, tighten the
-- USING clause to a role check instead of true. Note this leaves the tables
-- stricter than members/registrations, which carry no RLS at all.
--
-- Turn OFF "Anonymous sign-ins" in Auth settings if it is enabled: those
-- sessions also carry the `authenticated` role and would inherit this read.
-- ============================================================

BEGIN;

SET LOCAL lock_timeout = '3s';
SET LOCAL statement_timeout = '30s';

GRANT SELECT ON city_tour_registrations TO authenticated;
GRANT SELECT ON city_tour_members       TO authenticated;

DROP POLICY IF EXISTS city_tour_registrations_admin_read ON city_tour_registrations;
CREATE POLICY city_tour_registrations_admin_read
  ON city_tour_registrations
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS city_tour_members_admin_read ON city_tour_members;
CREATE POLICY city_tour_members_admin_read
  ON city_tour_members
  FOR SELECT
  TO authenticated
  USING (true);

COMMIT;


-- ── Verify ──────────────────────────────────────────────────
-- RLS still on for both tables (expect relrowsecurity = true):
--   SELECT relname, relrowsecurity FROM pg_class
--    WHERE relname IN ('city_tour_registrations', 'city_tour_members');
--
-- One SELECT policy per table, for the authenticated role:
--   SELECT tablename, policyname, roles, cmd FROM pg_policies
--    WHERE tablename IN ('city_tour_registrations', 'city_tour_members');
--
-- anon must have no privileges (expect zero rows):
--   SELECT grantee, table_name, privilege_type FROM information_schema.role_table_grants
--    WHERE table_name IN ('city_tour_registrations', 'city_tour_members')
--      AND grantee = 'anon';


-- ── Rollback ────────────────────────────────────────────────
-- BEGIN;
--   DROP POLICY IF EXISTS city_tour_registrations_admin_read ON city_tour_registrations;
--   DROP POLICY IF EXISTS city_tour_members_admin_read       ON city_tour_members;
--   REVOKE SELECT ON city_tour_registrations, city_tour_members FROM authenticated;
-- COMMIT;
