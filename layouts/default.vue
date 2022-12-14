<template>
    <Body :class="`layout-${ isMobile ? 'mobile' : 'screen'}`">
        <LayoutMobile v-if="isMobile" />
        <LayoutScreen v-else />
    </Body>
</template>

<script setup>
    const { size, isMobile } = useScreensize()

    const data = reactive({
        layoutType: 'standard',
    })

    onMounted(() => {
        console.log('parent mounted:', size.value, isMobile.value)
    })
</script>