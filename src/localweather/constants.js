export const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const month = [
 'January',
 'February',
 'March',
 'April',
 'May',
 'June',
 'July',
 'August',
 'September',
 'October',
 'November',
 'December',
]

export function appendSuffix(day) {
  return (
    day === 1 ? `${day}st` :
    day === 2 ? `${day}nd` :
    day === 3 ? `${day}rd` :
    day === 4 ? `${day}th` :
    `${day}th`
  )
}

export function dateString(time) {
  return `${week[time.getDay()]}, ` 
    + `${month[time.getMonth()]} ` 
    + `${appendSuffix(time.getDate())}`
}

export function parseTime({ date, ...rest }) {
  const date = new Date(date * 1000)

  const hours = date.getHours() % 12
  const minutes = date.getMinutes()
  return { 
    ...rest, 
    day: dateString(date), 
    time: `${hours}:${minutes}0`, 
  }
}