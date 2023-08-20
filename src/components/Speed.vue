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
  // depending on the updated field, update the time
  const parsed = Number(value)

  let speed

  switch (name) {
    case 'speed':
      // Already m/s
      speed = parsed
      break
    case 'speedKM':
      // convert to m/s
      speed = parsed / 3.6
      break
  }

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
    <div class="w-24 pr-2">
      <Input
        :disabled="disabled"
        label="M/S"
        id="speed"
        name="speed"
        :value="derivedData.speed"
        :onInput="updateValues"
      />
    </div>
    <div class="w-24 pr-2">
      <Input
        :disabled="disabled"
        label="KM/H"
        id="speedKM"
        name="speedKM"
        :value="derivedData.speedKmH"
        :onInput="updateValues"
      />
    </div>
  </div>
</template>
