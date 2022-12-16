<template>
    <Body :class="`layout-${ isMobile ? 'mobile' : 'screen'}`">
        <LayoutMobile v-if="shouldRender" />
        <LayoutScreen v-else />
    </Body>
</template>

<script setup>
    const { size, isMobile } = useScreensize()

    const shouldRender = computed(() => {
        //nuxt bug? template wasn't waiting for composable before trying to render
        //so it was moutning layoutScreen for example, in mobile view.
        return isMobile.value
    })

    onMounted(() => {
        console.log('parent mounted:', size.value, isMobile.value)
    })
</script>