export const calculatePace = (distance: number, time: number) => time / distance

export const pacetoSperKm = (pace: number) => pace * 1000

export const paceElements = (paceperKm: number) => {
  const minutes = Math.floor(paceperKm / 60)
  const seconds = Math.floor(paceperKm % 60)

  return { minutes, seconds }
}
