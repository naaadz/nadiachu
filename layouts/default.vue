<template>
    <div class="flex h-screen relative">
        <Transition name="width" @after-enter="firstAfterEnter">
            <div class="first floral w-10 bg-red-100 flex-none" v-show="data.els[0].value"></div>
        </Transition>
        
        <Transition name="width">
            <div class="second bg-default-dark" v-show="data.els[1].value"></div>
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
                <a class="text-inherit" @click.prevent="data.els[1].value = !data.els[1].value" href="#">Toggle</a>
            </p>
            <!-- <div class="the-page p-10">
                
                <NuxtPage ref="thepage" class="text-default-light bg-yellow-200" />
            </div> -->
            
        </div>
        <div class="main fixed flex flex-col justify-between h-full">
            <div class="style-logo flex-col text-center">
                <Transition name="fade">
                    <StyleLogo :reverse="data.logoReverse" @animationFinished="onLogoAnimated" v-show="data.els[2].value" />
                </Transition>
                <Transition name="fade">
                    <p v-show="data.els[3].value">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
                </Transition>
            </div>
            <nav class="flex justify-center gap-4 m-10" v-show="data.els[4].value">
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
    // firstShow: false,
    // secondShow: false,
    // logoShow: false,
    logoReverse: false,
    // blurbShow: false,
    // navShow: false,
    els: [
        { id: 0, value: false },
        { id: 1, value: false },
        { id: 2, value: false },
        { id: 3, value: false },
        { id: 4, value: false },
    ],
    // mainOpen: false,
    // branchOpen: false,
     branchPos: 50,

})




//on initial load of site




/* <div class="container mx-auto">
        <NuxtLink to="/">Index</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/projects">Projects</NuxtLink>
        <NuxtPage />
    </div> */

    const firstAfterEnter = (el) => {
        //data.branchOpen = true
        //console.log('i fired')
        //data.secondShow = true
    }

    const mainAfterLeave = (el) => {
        //data.branchOpen = false
    }
    
    onMounted(() => {
        //console.log('mounted')
        //data.firstShow = true
        //data.secondShow = true

        //console.log('route', route)
        const totalTime = 5000
        const totalEls = data.els.length
        let i = 0

        

        // setTimeout(() => {
        //     //console.log(data)

        // for (const key of Object.keys(data)) {
        //     console.log(key, data[key])
        // }

        // }, totalTime)

        const animate = () => {
            if (i < totalEls) {
                //console.log(data.els[i])
                data.els[i].value = true
                console.log(data.els[i])
                i++
            } else {
                clearInterval(intervalId)
            }
        }

        const intervalId = setInterval(animate, totalTime / totalEls)
        
    })

    // watch(
    //   () => route.name.value,
    //    newId => {
    //     console.log(newId)
    //   }
    // )

    const onLogoAnimated = (payload) => {
        //console.log('parent: logo done animating', payload)
        //data.blurbShow = true
    }

   watch(() => route.name, (theroute) => {
        if (theroute === 'index') {
            // data.branchPos = 70
            // data.logoReverse = false
            // data.secondShow = true
        } else if (theroute === 'about') {
            // data.branchPos = 30
            // data.logoReverse = false
            // data.secondShow = true
        } else if (theroute === 'projects') {
            // data.branchPos = 50,
            // data.logoReverse = true
            // data.secondShow = false
        }
   })

 

</script>
