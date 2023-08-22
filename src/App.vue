<script setup lang="ts">
import Panel from './components/Panel/index.vue'
import Warning from '@/components/Warning.vue'
import Distance from '@/components/Distance.vue'
import Time from '@/components/Time.vue'
import Speed from '@/components/Speed.vue'
import Pace from '@/components/Pace.vue'
import ToggleBar from '@/components/ToggleBar.vue'
import { useRunningDataStore } from '@/stores/runningData'
import { storeToRefs } from 'pinia'

const store = useRunningDataStore()
const { setTargetField } = store
const { data } = storeToRefs(store)

const options = [
  {
    label: 'Distance',
    value: 'distance'
  },
  {
    label: 'Time',
    value: 'time'
  },
  {
    label: 'Pace',
    value: 'pace'
  }
]

const selected = data.value.targetField

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  const { value } = target
  setTargetField(value)
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl mb-6 mt-2">Running pace calculator</h1>

    <ToggleBar
      :options="options"
      :selected="selected"
      :onChange="onChange"
      name="targetField"
      verboseName="Calculate:"
    />

    <form class="w-full">
      <div class="md:flex md:items-center mb-6 flex-col">
        <Panel>
          <template v-slot:title>Distance</template>
          <template v-slot:content><Distance /></template>
        </Panel>

        <Panel>
          <template v-slot:title>Time</template>
          <template v-slot:content><Time /></template>
        </Panel>

        <Panel>
          <template v-slot:title>Speed</template>
          <template v-slot:content><Speed /></template>
        </Panel>

        <Panel>
          <template v-slot:title>Pace</template>
          <template v-slot:content><Pace /></template>
        </Panel>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
