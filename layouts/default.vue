<template>
    <div class="flex h-screen relative">
        <div class="floral w-10 bg-red-100 flex-none"></div>
        <!-- <Transition name="main" @enter="mainAfterEnter" @leave="mainAfterLeave"> -->
            <main class="flex flex-col justify-between bg-default-dark" v-show="data.mainOpen">
                <div class="logo">
                    <StyleLogo />
                </div>
                <nav class="flex justify-center gap-4 m-10" v-show="data.mainOpen">
                    <NuxtLink to="/">Index</NuxtLink>
                    <NuxtLink to="/about">About</NuxtLink>
                    <NuxtLink to="/projects">Projects</NuxtLink>
                </nav>
            </main>
        <!-- </Transition> -->

        <div class="the-page-outer bg-dark-1 flex-1 relative flex flex-col justify-center overflow-auto">
            <!-- <Transition name="branch">
                <div class="branch" v-show="data.branchOpen"></div>
            </Transition> -->
            <div class="the-branch" :style="`transform:translateY(${data.branchPos}%)`">
                <div class="branch"></div>
                <NuxtPage class="the-page text-default-light" />
            </div>
            
            
            <p class="text-default-light fixed">
                <a class="text-inherit" @click.prevent="data.mainOpen = !data.mainOpen" href="#">Toggle</a>
            </p>
            <!-- <div class="the-page p-10">
                
                <NuxtPage ref="thepage" class="text-default-light bg-yellow-200" />
            </div> -->
            
        </div>
    </div>
</template>

<script setup>

const route = useRoute()

const data = reactive({
    mainOpen: false,
    branchOpen: false,
    branchPos: 50,
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

        //console.log('route', route)
        
    })

    // watch(
    //   () => route.name.value,
    //    newId => {
    //     console.log(newId)
    //   }
    // )

   watch(() => route.name, (theroute) => {
        if (theroute === 'index') {
            data.branchPos = 70
        } else if (theroute === 'about') {
            data.branchPos = 30
        } else if (theroute === 'projects') {
            data.branchPos = 50
        }
   })

 

</script>
