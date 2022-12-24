<template>
    <Body :class="`layout-${ isMobile ? 'mobile' : 'screen'} page-${route.name} project-${currentProject.name}`">
        <LayoutMobile v-if="isMobile" />
        <LayoutScreen v-else />
    </Body>
</template>

<script setup>
    const { size, isMobile } = useScreensize()
    const route = useRoute()
    const { currentProject } = useProjects()


    onMounted(() => {
        usePreloadVideos()
    })
</script>