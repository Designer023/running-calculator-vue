<script setup lang="ts">
import { storeToRefs } from 'pinia'

import Input from '@/components/Input.vue'
import { useRunningDataStore } from '@/stores/runningData'

const store = useRunningDataStore()
const { updateDistance, toggleLockDistance } = store
const { data } = storeToRefs(store)

const presetOptions = [
  { value: undefined, label: 'Select a preset' },
  { value: 5000, label: '5km' },
  { value: 10000, label: '10km' },
  { value: 21097, label: 'Half marathon' },
  { value: 42195, label: 'Marathon' },
  { value: 50000, label: '50km' }
]

const updateValues = (event) => {
  updateDistance(Number(event.target.value))
}
</script>

<template>
  <div class="w-full flex flex-row flex-wrap justify-start items-end">
    <div class="w-1/2 md:w-48">
      <label for="presetOptions" class="block text-gray-700 text-sm font-bold mr-2">
        Preset distances

        <select
          id="presetOptions"
          :disabled="data.distanceLocked"
          @input="updateDistance(Number($event.target.value))"
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-500 aria-disabled:border-gray-200"
        >
          <option
            :disabled="option.value === undefined"
            :selected="data.distance === option.value"
            v-bind:value="option.value"
            v-for="option in presetOptions"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
    </div>
    <div class="w-1/2 md:w-48">
      <Input
        :disabled="data.distanceLocked"
        label="Distance M:"
        id="distance"
        name="distance"
        :value="data.distance"
        :onInput="updateValues"
        :step="1000"
      />
    </div>

    <div class="ml-auto mt-3 md:mt-0">
      <button
        :disabled="data.distanceLocked"
        :aria-disabled="data.distanceLocked"
        v-on:click="toggleLockDistance"
        class="w-32 bg-red-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded aria-disabled:bg-blue-100"
      >
        Lock
      </button>
      <button
        :disabled="!data.distanceLocked"
        :aria-disabled="!data.distanceLocked"
        v-on:click="toggleLockDistance"
        class="w-32 bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded aria-disabled:bg-blue-100"
      >
        Unlock
      </button>
    </div>
  </div>
</template>

<style scoped></style>
