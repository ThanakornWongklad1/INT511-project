import { DateTime } from 'luxon'

export const DateTimeFormat = (date: string) => {
  if (date) {
    return DateTime.fromISO(date).toFormat('dd/MM/yyyy, HH:mm')
  } else {
    return ' - '
  }
}

export const differenceTime = (scheduleDate: string, borrowDate: string) => {
  const borrow = DateTime.fromISO(borrowDate)
  const schedule = DateTime.fromISO(scheduleDate)
  const diff = borrow.diff(schedule, ['days', 'hours', 'minutes', 'seconds']).toObject()
  if (diff.days && diff.days > 0) {
    return diff
  } else {
    return false
  }
}
