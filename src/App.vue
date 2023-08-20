<script setup lang="ts">
import Panel from './components/Panel/index.vue'
import Warning from '@/components/Warning.vue'
import Distance from '@/components/Distance.vue'
import Time from '@/components/Time.vue'
import Speed from '@/components/Speed.vue'
import Pace from '@/components/Pace.vue'
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-4xl mb-6 mt-2">Running pace calculator</h1>

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

        <Warning text="Either distance or time must be locked to edit pace or speed." />

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
