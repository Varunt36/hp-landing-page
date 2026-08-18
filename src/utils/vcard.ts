// src/utils/vcard.ts
// One .vcf file, one download — the sibling of excel.ts. vCard 3.0, which is
// the dialect iOS Contacts imports without complaint (4.0 it merely tolerates).
// Callers decide what goes on each card; this file only knows the format.

export interface VCardContact {
  fullName: string
  org?: string
  phone?: string // E.164 preferred — iOS keeps whatever it is given
  email?: string
  note?: string
  categories?: string
  // Stable identity for the card, so exporting the same source row twice
  // produces the same UID. Clients that dedupe on it (macOS Contacts, Google
  // Contacts, anything over CardDAV) will update rather than duplicate.
  // iOS Contacts does NOT honour it on manual .vcf import — see downloadVCard.
  uid?: string
}

// RFC 6350 folds lines at 75 octets. iOS is lenient about long lines, but a
// roster NOTE for a five-person booking sails past this and some importers do
// truncate, so fold properly rather than hope.
const MAX_OCTETS = 75

const encoder = new TextEncoder()

/**
 * Escape a vCard TEXT value: backslash, comma and semicolon are delimiters,
 * and real newlines have to travel as the two-character sequence \n.
 *
 * Backslash must be replaced FIRST. Do it later and it would re-escape the
 * backslashes introduced by the other three rules, so "Smith, Jr" would ship
 * as "Smith\\, Jr" and display with a stray slash.
 */
function esc(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

/**
 * Fold one logical line into 75-octet chunks joined by CRLF + a single space.
 *
 * Counts UTF-8 octets, not characters: 'ü' and 'ॐ' are 2 and 3 bytes, so a
 * character count would let a line of umlauts run to 150 octets. Iterating
 * with for..of walks whole code points, so a surrogate pair can never be split
 * down the middle into two invalid halves.
 */
function fold(line: string): string {
  if (encoder.encode(line).length <= MAX_OCTETS) return line

  const out: string[] = []
  let current = ''
  let octets = 0

  for (const ch of line) {
    const size = encoder.encode(ch).length
    // Continuation lines begin with the unfolding space, which costs an octet.
    const limit = out.length === 0 ? MAX_OCTETS : MAX_OCTETS - 1
    if (octets + size > limit) {
      out.push(current)
      current = ''
      octets = 0
    }
    current += ch
    octets += size
  }
  out.push(current)

  return out.join('\r\n ')
}

/**
 * Build vCard's structured N field from a single free-text name.
 *
 * We store one `full_name` column, so the last whitespace-separated token is
 * taken as the family name. That is wrong for compound surnames ("van der
 * Berg"), but FN below always carries the exact stored string and FN is what
 * iOS displays — a bad split only affects how the contact sorts.
 */
function structuredName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length < 2) return `;${esc(fullName.trim())};;;`

  const family = parts[parts.length - 1]
  const given = parts.slice(0, -1).join(' ')
  return `${esc(family)};${esc(given)};;;`
}

function card(c: VCardContact): string[] {
  // N is escaped inside structuredName — its semicolons are delimiters, not
  // content, so it must not go through esc() a second time here.
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${structuredName(c.fullName)}`,
    `FN:${esc(c.fullName)}`,
  ]

  if (c.uid) lines.push(`UID:${esc(c.uid)}`)
  if (c.org) lines.push(`ORG:${esc(c.org)}`)
  if (c.categories) lines.push(`CATEGORIES:${esc(c.categories)}`)
  if (c.phone) lines.push(`TEL;TYPE=CELL:${esc(c.phone)}`)
  if (c.email) lines.push(`EMAIL;TYPE=INTERNET:${esc(c.email)}`)
  if (c.note) lines.push(`NOTE:${esc(c.note)}`)

  lines.push('END:VCARD')
  return lines.map(fold)
}

/**
 * Note on re-importing: iOS Contacts does not dedupe on UID when you open a
 * .vcf by hand. Import the same file twice and you get two copies of every
 * card. The recovery is inside Contacts itself — it detects the collision and
 * shows a "Duplicates Found" row at the top of the list that merges them.
 */
export function downloadVCard(contacts: VCardContact[], file: string): void {
  if (!contacts.length) return

  // CRLF throughout, and a trailing one — the spec requires it and some
  // importers drop the final card without it.
  const text = contacts.flatMap(card).join('\r\n') + '\r\n'

  // No BOM: it would land inside the first BEGIN:VCARD line and make card one
  // unparseable. The charset in the blob type is how iOS learns it is UTF-8.
  const url = URL.createObjectURL(
    new Blob([text], { type: 'text/vcard;charset=utf-8' }),
  )

  // The anchor has to be in the document for the click to count in Firefox,
  // and the URL is revoked a tick later so the download can start first.
  const a = document.createElement('a')
  a.href = url
  a.download = file
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
