export const hhmmssToSec = (
  hours: number | string,
  minutes: number | string,
  seconds: number | string
): number => {
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}
