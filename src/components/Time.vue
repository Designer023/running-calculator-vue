<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import Input from '@/components/Input.vue'
import { useRunningDataStore } from '@/stores/runningData'
import { hhmmssToSec } from '@/utils/hhmmssToSec'

const store = useRunningDataStore()
const { updateTime } = store
const { data, derivedData } = storeToRefs(store)

const updateValues = (event) => {
  const { name, value } = event.target

  // depending on the updated field, update the time
  const parsed = Number(value)

  let timeHours = derivedData.value.time.hh
  let timeMinutes = derivedData.value.time.mm
  let timeSeconds = derivedData.value.time.ss

  switch (name) {
    case 'timeHours':
      timeHours = parsed
      break
    case 'timeMinutes':
      timeMinutes = parsed
      break
    case 'timeSeconds':
      timeSeconds = parsed
      break
  }
  // convert time back into seconds
  const secondTime = hhmmssToSec(timeHours, timeMinutes, timeSeconds)
  updateTime(secondTime)
}
</script>

<template>
  <div class="w-full flex flex-row flex-wrap justify-start items-end">
    <div class="w-1/3 md:w-24 pr-2">
      <Input
        :disabled="data.timeLocked"
        label="HH:"
        id="timeHours"
        name="timeHours"
        :value="derivedData.time.hh"
        :onInput="updateValues"
      />
    </div>
    <div class="w-1/3 md:w-24 pr-2">
      <Input
        :disabled="data.timeLocked"
        label="MM:"
        id="timeMinutes"
        name="timeMinutes"
        :value="derivedData.time.mm"
        :onInput="updateValues"
      />
    </div>
    <div class="w-1/3 md:w-24">
      <Input
        :disabled="data.timeLocked"
        label="SS:"
        id="timeSeconds"
        name="timeSeconds"
        :value="derivedData.time.ss"
        :onInput="updateValues"
      />
    </div>
  </div>
</template>
