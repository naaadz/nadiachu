<template>
  <Body
    :class="`layout-${isMobile ? 'mobile' : 'screen'} page-${route.name}`"
  >
    <LayoutMobile v-if="isMobile" />
    <LayoutScreen v-else />
  </Body>
</template>

<script setup>
const {size, isMobile} = useScreensize();
const route = useRoute();

const pageLinks = [
  {name: 'about', label: 'About', route: '/about'},
  {name: 'resume', label: 'Resume', route: '/resume'},
  {name: 'projects', label: 'Projects', route: '/projects'},
  {name: 'contact', label: 'Contact', route: '/contact'}
];

// Fetch all Prismic documents concurrently using Promise.all
const {client} = usePrismic();

const [about, contact, projects, resume] = await Promise.all([
  useAsyncData('about', () => client.getSingle('about')),
  useAsyncData('contact', () => client.getSingle('contact')),
  useAsyncData('projects', () => client.getSingle('projects')),
  useAsyncData('resume', () => client.getSingle('resume'))
])

// Provide the pagesData to all components
provide('aboutPage', about?.data?.value)
provide('contactPage', contact?.data?.value)
provide('projectsPage', projects?.data?.value)
provide('resumePage', resume?.data?.value)
provide('pageLinks', pageLinks)

</script>
