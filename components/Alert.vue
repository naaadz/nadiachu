<template>
    <div class="alert" :class="`type-${type}`">
        <div class="flex items-center gap-4">
            <Icon :name="getIcon()" />
            <div>
                <slot>
                    {{ content }}
                </slot>
            </div>
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