<script setup lang="ts">
import { useRunningDataStore } from '@/stores/runningData'
import { storeToRefs } from 'pinia'
import Input from '@/components/Input.vue'
import { computed } from 'vue'

const store = useRunningDataStore()
const { updateTime, updateDistance } = store
const { data, derivedData } = storeToRefs(store)

const disabled = computed(() => {
  return (
    (data.value.distanceLocked && data.value.timeLocked) ||
    (!data.value.distanceLocked && !data.value.timeLocked)
  )
})

const updateValues = (event) => {
  const { name, value } = event.target
  const parsed = Number(value)

  let paceSM = derivedData.value.pace.perM
  let paceMinutes = derivedData.value.pace.minutes
  let paceSeconds = derivedData.value.pace.seconds

  switch (name) {
    case 'pacesecpermeter':
      paceSM = parsed
      break
    case 'paceMinutes':
      paceMinutes = parsed // minutes per 1000m
      paceSM = (paceMinutes * 60 + paceSeconds) / 1000
      break
    case 'paceSeconds':
      paceSeconds = parsed // seconds per 1000m
      paceSM = (paceMinutes * 60 + paceSeconds) / 1000
      break
  }

  const speed = 1 / paceSM

  if (data.value.distanceLocked) {
    // update time
    updateTime(Math.round(data.value.distance / speed)) // round to the nearest second
  } else if (data.value.timeLocked) {
    // update distance
    updateDistance(Math.round(speed * data.value.time)) // round to the nearest meter
  }
}
</script>

<template>
  <div class="w-full md:flex flex-row md:justify-start">
    <div class="w-24">
      <Input
        :disabled="disabled"
        label="sec/M"
        :step="0.01"
        id="pace"
        name="pacesecpermeter"
        :value="derivedData.pace.perM"
        :onInput="updateValues"
      />
    </div>
  </div>

  <div class="w-full md:flex flex-row md:justify-start">
    <div class="w-24 pr-2">
      <Input
        :disabled="disabled"
        label="MM"
        id="paceMinutes"
        name="paceMinutes"
        :value="derivedData.pace.minutes"
        :onInput="updateValues"
      />
    </div>
    <div class="w-24 pr-2">
      <Input
        :disabled="disabled"
        label="SS"
        id="paceSeconds"
        name="paceSeconds"
        :value="derivedData.pace.seconds"
        :onInput="updateValues"
      />
    </div>
  </div>
</template>
