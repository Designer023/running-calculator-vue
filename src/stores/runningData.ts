import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

type Data = {
  distance: number // distance in metres
  time: number // time in seconds
  distanceLocked: boolean
  timeLocked: boolean
}

const defaultData: Data = {
  distance: 10000,
  time: 3600,
  distanceLocked: false,
  timeLocked: false
}

type DerivedData = {
  time: {
    hh: number
    mm: number
    ss: number
  }
  speed: number
  pace: {
    minutes: number
    seconds: number
    perKm: number
    perM: number
  }
}

export const useRunningDataStore = defineStore('runningData', () => {
  const data = ref<Data>(defaultData)

  const derivedData = computed<DerivedData>(() => {
    const hh = Math.floor(data.value.time / 3600)
    const mm = Math.floor((data.value.time - hh * 3600) / 60)
    const ss = data.value.time - hh * 3600 - mm * 60

    const paceSM = data.value.time / data.value.distance // pace s / m = time s / distance m
    const paceSperKm = paceSM * 1000 // s / km
    const paceMinutes = Math.floor(paceSperKm / 60)
    const paceSeconds = Math.floor(paceSperKm % 60)

    return {
      time: { hh, mm, ss },
      speed: data.value.distance / data.value.time,
      speedKmH: (data.value.distance / data.value.time) * 3.6,
      pace: {
        minutes: paceMinutes,
        seconds: paceSeconds,
        perKm: paceSperKm,
        perM: paceSM
      }
    }
  })

  function updateDistance(distanceInM: number) {
    console.log({ distanceInM })
    data.value = { ...data.value, distance: distanceInM }
  }

  function updateTime(timeInSec: number) {
    console.log({ timeInSec })
    data.value.time = timeInSec
  }

  function toggleLockDistance() {
    data.value.distanceLocked = !data.value.distanceLocked
  }
  function toggleLockTime() {
    data.value.timeLocked = !data.value.timeLocked
  }

  return { data, updateDistance, updateTime, toggleLockDistance, toggleLockTime, derivedData }
})
