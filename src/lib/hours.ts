import { hours } from '../data'

const dayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export type OpenState = {
  isOpen: boolean
  todayIndex: number
  label: string
}

export function getOpenState(now: Date = new Date()): OpenState {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)

  const weekday = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon'
  const hh = Number(parts.find((p) => p.type === 'hour')?.value ?? '0')
  const mm = Number(parts.find((p) => p.type === 'minute')?.value ?? '0')
  const todayIndex = dayIndex[weekday] ?? 1
  const minutes = hh * 60 + mm
  const today = hours[todayIndex]
  const isOpen = minutes >= today.open && minutes < today.close

  const toLabel = (value: number) => {
    const h24 = Math.floor(value / 60)
    const min = value % 60
    const suffix = h24 >= 12 ? 'pm' : 'am'
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12
    return `${h12}:${String(min).padStart(2, '0')} ${suffix}`
  }

  return {
    isOpen,
    todayIndex,
    label: isOpen ? `Open now · closes ${toLabel(today.close)}` : `Closed · opens ${toLabel(today.open)}`,
  }
}
