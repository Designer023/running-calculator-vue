<script setup lang="ts">
type Option = {
  label: string
  value: string
}

type Props = {
  name: string
  verboseName?: string
  options: Option[]
  selected?: string
  onChange: (event: Event) => void
}

const props = withDefaults(defineProps<Props>(), {
  selected: ''
})
</script>

<template>
  <div class="flex justify-center rounded bg-gray-200 py-2">
    <span class="text-lg font-semibold">{{ props.verboseName || props.name }}</span>
    <div v-for="option in props.options" :key="option.value" class="mx-3">
      <input
        type="radio"
        name="name"
        :id="option.value"
        :value="option.value"
        :checked="option.value === props.selected"
        @change="props.onChange"
      />
      <label class="pl-1 hover:cursor-pointer text-lg" :for="option.value" @change="changeValue">{{
        option.label
      }}</label>
    </div>
  </div>
</template>
