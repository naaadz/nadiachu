<template>
    <div class="space-y-4">
        <p v-for="i in 2" :key="i">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco </p>
    </div>
</template>

<script setup>

definePageMeta({
  title: 'About',
  heading: ['about', 'me']
})

</script>