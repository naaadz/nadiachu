<template>
    <div class="flex h-screen overflow-hidden relative">
        <div class="floral w-10 bg-red-100 flex-none"></div>
        <Transition name="main" @enter="mainAfterEnter" @leave="mainAfterLeave">
            <main class="flex flex-col justify-end bg-default-dark" v-show="data.mainOpen">
                <nav class="flex justify-center gap-4 m-10" v-show="data.mainOpen">
                    <NuxtLink to="/">Index</NuxtLink>
                    <NuxtLink to="/about">About</NuxtLink>
                    <NuxtLink to="/projects">Projects</NuxtLink>
                </nav>
            </main>
        </Transition>

        <div class="the-page-outer bg-dark-1 flex-1 relative flex flex-col justify-center">
            <!-- <Transition name="branch">
                <div class="branch" v-show="data.branchOpen"></div>
            </Transition> -->
            
            <p class="text-default-light">
                <a class="text-inherit" @click.prevent="data.mainOpen = !data.mainOpen" href="#">Toggle</a>
            </p>
            <div class="the-page p-10">
                <div class="branch" v-show="data.branchOpen"></div>
                <NuxtPage ref="thepage" class="text-default-light bg-yellow-200" />
            </div>
            
        </div>
    </div>
</template>

<script setup>

const data = reactive({
    mainOpen: false,
    branchOpen: false
})

/* <div class="container mx-auto">
        <NuxtLink to="/">Index</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtPage />
    </div> */

    const mainAfterEnter = (el) => {
        data.branchOpen = true
    }

    const mainAfterLeave = (el) => {
        data.branchOpen = false
    }
    
    onMounted(() => {
        //console.log('mounted')
        data.mainOpen = true
        
    })

 

</script>

<style lang="scss">

// .the-page {
//     > * {
//         position: absolute;
//     }
// }

.page-enter-active,
.page-leave-active {
    // opacity: 1;
    transition: all .5s;
    transform: translateY(0)
}

.page-enter-from,
.page-leave-to {
    // opacity: 0;
    transform: translateY(10px)
}

main {
    @apply w-80;

    &.main-enter-active,
    &.main-leave-active {
        transition: width 2s;
        @apply w-80; 
    
    }
    &.main-enter-from,
    &.main-leave-to {
        @apply w-0; 
        
    }
}

.branch {
    // position: absolute;
    position: relative;
    // top: 300px;
     left: -80px;
    border-bottom: 2px solid theme('colors.muted-blue'); 
    width: 400px;

    &:after {
        content: url("/_nuxt/assets/images/flower-tip.svg");
        width: 20px;
        height: 20px;
        position: absolute;
        right: -14px;
        top: -2px;
        bottom: 0;
        margin: auto;
    }

    &.branch-enter-active,
    &.branch-leave-active {
        transition: width 2s;
        width: 400px;
    
    }
    &.branch-enter-from,
    &.branch-leave-to {
        width: 0;
        
    }
}



</style>
