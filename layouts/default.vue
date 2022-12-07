<template>
    <div class="flex h-screen relative">
        <div class="first floral w-10 bg-red-100 flex-none" ref="first"></div>
        <div class="second bg-default-dark" ref="second"></div>
        <div class="third the-page-outer bg-dark-1 flex-1 relative flex flex-col justify-center overflow-auto">
        <!-- <div class="the-branch" :style="`transform:translateY(${data.branchPos}%)`">
            <div class="branch"></div>
            <NuxtPage class="the-page text-default-light" />
        </div> -->
            
            <p class="text-default-light fixed">
                <a class="text-inherit" @click.prevent="" href="#">Toggle</a>
            </p>
            <!-- <div class="the-page p-10">
                <NuxtPage ref="thepage" class="text-default-light bg-yellow-200" />
            </div> -->
            
        </div>
        <div class="main fixed flex flex-col justify-between h-full">
            <div class="style-logo flex-col text-center" ref="logo">
                <StyleLogo 
                    class="logo" 
                    v-if="data.logoShow" 
                    :reverse="data.logoReverse" 
                    @animation-finished="onLogoAnimated" 
                />
                <p class="blurb" ref="blurb">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
            </div>
            <nav class="nav flex justify-center gap-4 m-10" ref="nav">
                <NuxtLink to="/">Index</NuxtLink>
                <NuxtLink to="/about">About</NuxtLink>
                <NuxtLink to="/projects">Projects</NuxtLink>
            </nav>
        </div>
    </div>
</template>

<script setup>

import gsap from 'gsap'

const first = ref(null)
const second = ref(null)
const logo = ref(null)
const blurb = ref(null)
const nav = ref(null)

const toggleWidthsTL = gsap.timeline({
    onComplete:() => {
        data.logoShow = true
    }
})
const toggleElsTL = gsap.timeline({paused: true})

const masterTL = gsap.timeline().pause().add(toggleWidthsTL)

//resolve promise and return timeline? will it work backwards?
//https://codepen.io/osublake/pen/MWYpmgq/4c1ea85a70347ba60cee3d9e8e55905b?editors=1010

const prepareTimelines = () => {

    masterTL.to(first.value, { width: '50px' })
    masterTL.to(second.value, { width: '300px' })
    masterTL.to(logo.value, { opacity: 1 })
    masterTL.add(() => { 
        data.logoShow = true
    })
    masterTL.to(blurb.value, { opacity: 1 })
    masterTL.to(nav.value, { opacity: 1 })

}

const route = useRoute()

const data = reactive({
    // firstShow: false,
    // secondShow: false,
    logoShow: false,
    logoReverse: false,
    // blurbShow: false,
    // navShow: false,
    // els: [
    //     { id: 0, value: false },
    //     { id: 1, value: false },
    //     { id: 2, value: false },
    //     { id: 3, value: false },
    //     { id: 4, value: false },
    // ],
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

    // const firstAfterEnter = (el) => {
    //     //data.branchOpen = true
    //     //console.log('i fired')
    //     //data.secondShow = true
    // }

    // const mainAfterLeave = (el) => {
    //     //data.branchOpen = false
    // }
    
    onMounted(() => {

        setTimeout(() => {
            prepareTimelines()
            masterTL.play()
        }, 500)





        //console.log('mounted')
        //data.firstShow = true
        //data.secondShow = true

        //console.log('route', route)
        // const totalTime = 5000
        // const totalEls = data.els.length
        // let i = 0

        

        // setTimeout(() => {
        //     //console.log(data)

        // for (const key of Object.keys(data)) {
        //     console.log(key, data[key])
        // }

        // }, totalTime)

        // const animate = () => {
        //     if (i < totalEls) {
        //         //console.log(data.els[i])
        //         data.els[i].value = true
        //         console.log(data.els[i])
        //         i++
        //     } else {
        //         clearInterval(intervalId)
        //     }
        // }

      //  const intervalId = setInterval(animate, totalTime / totalEls)
        
    })

    // watch(
    //   () => route.name.value,
    //    newId => {
    //     console.log(newId)
    //   }
    // )

    const onLogoAnimated = (payload) => {
        console.log('parent: logo done animating', payload)
        //data.blurbShow = true
    }

   watch(() => route.name, (theroute) => {
        if (theroute === 'index') {
            // data.branchPos = 70
             data.logoReverse = false
            // data.secondShow = true
        } else if (theroute === 'about') {
            // data.branchPos = 30
            data.logoReverse = false
            // data.secondShow = true
        } else if (theroute === 'projects') {
            console.log('route changed to projects')
            // data.branchPos = 50,
            data.logoReverse = true
            // data.secondShow = false
        }
   })

 

</script>

<style lang="scss">

.style-logo, .blurb, .nav {
    opacity: 0;
}

.first, .second {
    width: 0;
    //transform-origin: left center;
}


</style>
