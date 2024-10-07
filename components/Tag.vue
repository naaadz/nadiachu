<template>
    <span class="tag">
        <slot>
            <span>{{ value }}</span>
        </slot>
    </span>
</template>

<script setup>
const props = defineProps({
    value: {
        type: String
    }
})
</script>

