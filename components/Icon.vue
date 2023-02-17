<template>
    <div class="icon" v-html="getIcon(name)"></div>
</template>

<script setup>
import icons from '@/assets/json/icons.json'

const props = defineProps({
	name: {
		type: String,
        default: 'success'
	}
})

const getIcon = () => {
    const iconObj = icons.find(icon => icon.name === props.name)
    return iconObj.svg || false
}

</script>