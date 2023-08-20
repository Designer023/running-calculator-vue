<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

type Props = {
  label?: string
  id?: string
  name?: string
  value: number
  disabled?: boolean
  onInput?: (event: Event) => void
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  step: 1
})
</script>

<template>
  <label for="{id}" class="block text-gray-700 text-sm font-bold"
    >{{ label }}
    <input
      :disabled="props.disabled"
      :aria-disabled="props.disabled"
      :value="props.value"
      :name="props.name"
      type="number"
      :step="props.step"
      @input="props.onInput"
      :id="props.id"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-500 aria-disabled:border-gray-200"
    />
  </label>
</template>
