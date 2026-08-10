// src/utils/excel.ts
// One sheet, one download. Column widths are derived from the content, so
// callers only decide what goes in the rows.

import * as XLSX from 'xlsx'

export type ExcelRow = Record<string, string | number>

export function downloadExcel(rows: ExcelRow[], sheet: string, file: string): void {
  if (!rows.length) return

  const ws = XLSX.utils.json_to_sheet(rows)
  ws['!cols'] = Object.keys(rows[0]).map(key => ({
    wch: Math.max(key.length, ...rows.map(r => String(r[key] ?? '').length)) + 2,
  }))

  const wb = XLSX.utils.book_new()
  // Excel rejects sheet names over 31 chars or containing []:*?/\
  XLSX.utils.book_append_sheet(wb, ws, sheet.replace(/[[\]:*?/\\]/g, ' ').slice(0, 31))
  XLSX.writeFile(wb, file)
}
