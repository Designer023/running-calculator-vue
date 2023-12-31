import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { calculateSpeed, mpsToKph } from '@/utils/speed'
import { secToHHMMSS } from '@/utils/time'
import { calculatePace, paceElements, pacetoSperKm } from '@/utils/pace'

type Data = {
  distance: number // distance in metres
  time: number // time in seconds
  distanceLocked: boolean
  timeLocked: boolean
  targetField: 'pace' | 'speed' | 'time' | 'distance'
}

const defaultData: Data = {
  distance: 10000,
  time: 3600,
  distanceLocked: false,
  timeLocked: false,
  targetField: 'pace'
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
    const { hh, mm, ss } = secToHHMMSS(data.value.time)

    const paceSM = calculatePace(data.value.distance, data.value.time) // pace s / m = time s / distance m
    const paceSperKm = pacetoSperKm(paceSM) // s / km
    const { minutes, seconds } = paceElements(paceSperKm)

    const speed = calculateSpeed(data.value.distance, data.value.time)
    return {
      time: { hh, mm, ss },
      speed,
      speedKmH: mpsToKph(speed),
      pace: {
        minutes: minutes,
        seconds: seconds,
        perKm: paceSperKm,
        perM: paceSM
      }
    }
  })

  function setTargetField(targetField: 'pace' | 'speed' | 'time' | 'distance') {
    data.value.targetField = targetField

    if (targetField === 'pace') {
      data.value.timeLocked = false
      data.value.distanceLocked = false
    } else if (targetField === 'distance') {
      data.value.timeLocked = false
      data.value.distanceLocked = true
    } else if (targetField === 'time') {
      data.value.timeLocked = true
      data.value.distanceLocked = false
    }
  }

  function updateDistance(distanceInM: number) {
    if (data.value.targetField === 'time') {
      // update time

      data.value = {
        ...data.value,
        distance: distanceInM,
        time: distanceInM / derivedData.value.speed
      }
    } else {
      data.value = { ...data.value, distance: distanceInM }
    }
  }

  function updateTime(timeInSec: number) {
    if (data.value.targetField === 'distance') {
      console.log()
      data.value = {
        ...data.value,
        distance: Math.round(timeInSec * derivedData.value.speed),
        time: timeInSec
      }
    } else {
      // update time and the rest (speed/pace) will auto update
      data.value = { ...data.value, time: timeInSec }
    }
  }

  function updateSpeed(speedInMPerSec: number) {
    if (data.value.targetField === 'time') {
      // update time
      updateTime(Math.round(data.value.distance / speedInMPerSec)) // round to the nearest second
    } else if (data.value.targetField === 'distance') {
      // update distance
      updateDistance(Math.round(speedInMPerSec * data.value.time)) // round to the nearest meter
    }
  }

  return {
    data,
    setTargetField,
    updateDistance,
    updateTime,
    updateSpeed,
    derivedData
  }
})
