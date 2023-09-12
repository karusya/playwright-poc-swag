export interface FilterData {
  columnName: string
  filter: { status?: string[]; by?: string[] }
}

export function getLongTimestamp(): string {
  const timestamp = Date.now().toString()

  return timestamp.substring(timestamp.length - 8)
}

export function getShortTimestamp(): string {
  const timestamp = Date.now().toString()

  return timestamp.substring(timestamp.length - 4)
}
