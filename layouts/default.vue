<template>
  <Body
    :class="`layout-${isMobile ? 'mobile' : 'screen'} page-${route.name} project-${currentProject.name}`"
  >
    <LayoutMobile v-if="isMobile" />
    <LayoutScreen v-else />
  </Body>
</template>

<script setup>
const {size, isMobile} = useScreensize();
const route = useRoute();
const {currentProject} = useProjects();

const pages = [
  {name: 'about', label: 'About', route: '/about'},
  {name: 'resume', label: 'Resume', route: '/resume'},
  {name: 'projects', label: 'Projects', route: '/projects'},
  {name: 'contact', label: 'Contact', route: '/contact'}
];

provide('pages', pages)

onMounted(() => {
  usePreloadVideos();
});
</script>
