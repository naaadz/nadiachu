<template>
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
    </Head>
    <Body :class="`layout-${ shouldMobileRender ? 'mobile' : 'screen'} page-${route.name}`">
        <LayoutMobile v-if="shouldMobileRender" />
        <LayoutScreen v-else />
    </Body>
</template>

<script setup>
    const { size, isMobile } = useScreensize()
    const route = useRoute()

    const shouldMobileRender = computed(() => {
        //nuxt bug? template wasn't waiting for composable before trying to render
        //so it was moutning layoutScreen for example, in mobile view.
        console.log('shouldRender:', isMobile.value)
        //return isMobile.value
        return false
    })

    onMounted(() => {
        console.log('parent mounted:', size.value, isMobile.value)
    })
</script>