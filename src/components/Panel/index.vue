<script setup lang="ts">

</script>

<template>
  <div class="w-full bg-green-50 px-6 pb-2 mt-2 mb-4">
    <div class="w-full">
      <h3 class="text-2xl mb-1 mt-4">
        <slot name="title" >Title</slot>
      </h3>

      <div>
        <slot name="content">Content</slot>
      </div>
    </div>
  </div>

</template>