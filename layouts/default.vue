<template>
    <Body :class="`layout-${ shouldMobileRender ? 'mobile' : 'screen'} page-${route.name} project-${currentProject.name}`">
        <LayoutMobile v-if="shouldMobileRender" />
        <LayoutScreen v-else />
    </Body>
</template>

<script setup>
    const { size, isMobile } = useScreensize()
    const route = useRoute()
    const { currentProject } = useProjects()

    const shouldMobileRender = computed(() => {
        //nuxt bug? template wasn't waiting for composable before trying to render
        //so it was moutning layoutScreen for example, in mobile view.
        return isMobile.value
        //return false
    })

    onMounted(() => {
        usePreloadVideos()
    })
</script>