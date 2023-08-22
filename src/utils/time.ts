export const calculateTime = (distance: number, speed: number) => distance / speed

export const secToHHMMSS = (sec: number) => {
  const hh = Math.floor(sec / 3600)
  const mm = Math.floor((sec - hh * 3600) / 60)
  const ss = sec - hh * 3600 - mm * 60

  return { hh, mm, ss }
}
