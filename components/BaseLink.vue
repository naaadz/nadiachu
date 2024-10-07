<template>
  <NuxtLink v-if="isInternalLink" :to="internalPath">
    {{ linkData.text }}
  </NuxtLink>
  <a v-else-if="isExternalLink" :href="linkData.url" target="_blank" :title="linkData.text">
    {{ linkData.text }}
  </a>
</template>

<script setup>
// Props
const props = defineProps({
  linkData: {
    type: Object,
    required: true
  }
})

// Composables
const route = useRoute()

// Computed properties
const isInternalLink = computed(() => props.linkData.link_type === 'Document')
const isExternalLink = computed(() => props.linkData.link_type === 'Web' || props.linkData.link_type === 'Media')
const internalPath = computed(() => {
  if (!isInternalLink.value) return ''
  
  return `/${props.linkData.type}/`
})
</script>