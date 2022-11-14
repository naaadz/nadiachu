<template>
    <div class="flex h-screen bg-red-300 overflow-hidden relative">
        <nav class="w-10 bg-red-100">Nav</nav>
        <div class="flex-0">
            <NuxtLink to="/">Index</NuxtLink>
            <NuxtLink to="/about">About</NuxtLink>
            <NuxtLink to="/projects">Projects</NuxtLink>
        </div>
        <NuxtPage class="test bg-red-500" />
    </div>
</template>

<script setup>

const data = reactive({
    y: null
})

/* <div class="container mx-auto">
        <NuxtLink to="/">Index</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtPage />
    </div> */


 

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: transform 2s;
  /* transform:scaleX(100%); */
  /* flex-grow: 1; */
  
  transform:translateX(0%);
  
  
}
.page-enter-from,
.page-leave-to {
    /* transform:scaleX(0%); */
    /* flex-grow: 1; */
    /* flex-grow: 0; */
    /* flex-grow: 0; */
    transform:translateX(200%);
    
}

.test {
    /* position: absolute;
    top: 0;
    right: 0;
    bottom: 0; */
    /* width: 75%; */
    flex-grow: 1;
    /* transform:translateX(200%); */
    
    /* transform-origin: right; */
}

</style>
