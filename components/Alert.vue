<template>
    <div class="alert relative" :class="`type-${type}`">
        <div class="flex items-center gap-2">
            <Icon :name="getIcon()" />
            <div class="message">
                <slot>
                    {{ content }}
                </slot>
            </div>
        </div>
        <div class="flowers">
            <Icon name="flowers" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
	content: {
		type: String,
	},
    type: {
        type: String,
        default: 'info'
    },
    icon: {
        type: String
    }
})

const getIcon = () => {
    if (props.type === 'danger') {
        return 'danger'
    }

    else if (props.type === 'success') {
        return 'success'
    }

    else {
        return props.icon
    }
}

</script>