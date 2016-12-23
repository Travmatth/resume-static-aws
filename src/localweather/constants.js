/* @flow */
import { 
  Daily, DailyForecast,
} from './index.js.flow' 

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

export function appendSuffix(day: number): string {
  return (
    day === 1 ? `${day}st` :
    day === 2 ? `${day}nd` :
    day === 3 ? `${day}rd` :
    day === 4 ? `${day}th` :
    `${day}th`
  )
}

export function dateString(time: Date): string {
  return `${week[time.getDay()]}, ` 
    + `${month[time.getMonth()]} ` 
    + `${appendSuffix(time.getDate())}`
}

export function parseTime(time: DailyForecast): Daily {
  const { date, ...rest } = time
  const duration = new Date(date * 1000)

  const hours = duration.getHours() % 12
  const minutes = duration.getMinutes()
  return { 
    ...rest, 
    day: dateString(duration), 
    time: `${hours}:${minutes}0`, 
  }
}