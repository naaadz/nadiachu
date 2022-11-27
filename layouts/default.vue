<template>
    <div class="flex h-screen relative">
        <div class="first floral w-10 bg-red-100 flex-none"></div>
        <Transition name="main" @enter="mainAfterEnter" @leave="mainAfterLeave">
            <div class="second bg-default-dark" v-show="data.secondShow"></div>
        </Transition>
        <div class="third the-page-outer bg-dark-1 flex-1 relative flex flex-col justify-center overflow-auto">
            <!-- <Transition name="branch">
                <div class="branch" v-show="data.branchOpen"></div>
            </Transition> -->
            <div class="the-branch" :style="`transform:translateY(${data.branchPos}%)`">
                <div class="branch"></div>
                <NuxtPage class="the-page text-default-light" />
            </div>
            
            
            <p class="text-default-light fixed">
                <a class="text-inherit" @click.prevent="data.secondShow = !data.secondShow" href="#">Toggle</a>
            </p>
            <!-- <div class="the-page p-10">
                
                <NuxtPage ref="thepage" class="text-default-light bg-yellow-200" />
            </div> -->
            
        </div>
        <div class="main fixed flex flex-col justify-between h-full">
            <div class="style-logo flex-col text-center">
                <StyleLogo :reverse="data.logoReverse" @animationFinished="onLogoAnimated" />
                <Transition name="fade">
                    <p v-show="data.blurbShow">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
                </Transition>
            </div>
            <nav class="flex justify-center gap-4 m-10" v-show="data.secondShow">
                <NuxtLink to="/">Index</NuxtLink>
                <NuxtLink to="/about">About</NuxtLink>
                <NuxtLink to="/projects">Projects</NuxtLink>
            </nav>
        </div>
    </div>
</template>

<script setup>

const route = useRoute()

const data = reactive({
    firstShow: false,
    secondShow: false,
    logoShow: false,
    logoReverse: false,
    blurbShow: false,
    navShow: false,
    // mainOpen: false,
    // branchOpen: false,
    // branchPos: 50,

})




//on initial load of site




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
        data.secondShow = true

        //console.log('route', route)
        
    })

    // watch(
    //   () => route.name.value,
    //    newId => {
    //     console.log(newId)
    //   }
    // )

    const onLogoAnimated = (payload) => {
        console.log('parent: logo done animating', payload)
        data.blurbShow = true
    }

   watch(() => route.name, (theroute) => {
        if (theroute === 'index') {
            data.branchPos = 70
            data.logoReverse = false
            data.secondShow = true
        } else if (theroute === 'about') {
            data.branchPos = 30
            data.logoReverse = false
            data.secondShow = true
        } else if (theroute === 'projects') {
            data.branchPos = 50,
            data.logoReverse = true
            data.secondShow = false
        }
   })

 

</script>
