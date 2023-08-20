<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'

import { storeToRefs } from 'pinia'
import { useRunningDataStore } from '@/stores/runningData'

type Props = {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: 'This is a warning message'
})

const { data } = storeToRefs(useRunningDataStore())

// todo: fix the state of the disabled computed property
const disabled = computed(() => {
  return (
    (data.value.distanceLocked && data.value.timeLocked) ||
    (!data.value.distanceLocked && !data.value.timeLocked)
  )
})
</script>

<template>
  <template v-if="disabled">
    <div
      class="w-full flex items-center bg-yellow-100 text-gray-900 text-sm font-bold px-4 py-3 rounded border-solid border border-amber-300"
      role="alert"
    >
      <span class="mr-2">👋️</span>
      <p>{{ props.text }}</p>
    </div>
  </template>
</template>
