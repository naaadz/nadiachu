<template>
    <span class="tag">
        <a v-if="link" :href="link" target="_blank" :title="title">{{ value }}</a>
        <span v-else>{{ value }}</span>
    </span>
</template>

<script setup>
const props = defineProps({
    value: {
        type: String
    },
	link: {
		type: String
	},
    title: {
        type: String
    }
})
</script>

