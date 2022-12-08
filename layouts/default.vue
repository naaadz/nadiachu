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
        <div class="absolute right-0 top-0">
            <button @click="play()">Play</button>
            <button @click="reverse()">Reverse</button>
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

let promiseResolve, promiseReject

let waitForChildAnimation = new Promise((resolve, reject) => {
    console.log('wait')
  promiseResolve = resolve
  promiseReject = reject
})

// const toggleWidthsTL = gsap.timeline({
//     onComplete:() => {
//         data.logoShow = true
//     }
// })
//const toggleElsTL = gsap.timeline({paused: true})

const playTL = gsap.timeline().pause()
const reverseTL = gsap.timeline().pause()

//resolve promise and return timeline? will it work backwards?
//https://codepen.io/osublake/pen/MWYpmgq/4c1ea85a70347ba60cee3d9e8e55905b?editors=1010

// const prepareTimelines = () => {

//     masterTL.to(first.value, { width: '50px' })
//     masterTL.to(second.value, { width: '300px' })
//     masterTL.to(logo.value, { opacity: 1 })
//     masterTL.add(() => { 
//         let reversing = masterTL.reversed()

//         if (reversing) {
//             data.logoReverse = true
           
//         } else {
//             data.logoReverse = false
//             data.logoShow = true
//         }
//     })
//     .then((x) => {
//         console.log('x', x)
//         return waitForChildAnimation
//     }).then((y) => {
//          console.log('y',y)
//         masterTL.to(blurb.value, { opacity: 1 })
//         masterTL.to(nav.value, { opacity: 1 })
//     } )
// }


const forward = () => {
    playTL.to(first.value, { width: '50px' })
    playTL.to(second.value, { width: '300px' })
    playTL.to(logo.value, { opacity: 1 })
    playTL.add(() => { 
        data.logoReverse = false
        data.logoShow = true
    })
    .then((x) => {
        console.log('x', x)
        return waitForChildAnimation
    }).then((y) => {
         console.log('y',y)
         playTL.to(blurb.value, { opacity: 1 })
         playTL.to(nav.value, { opacity: 1 })
    } )
}

const backward = () => {

    reverseTL.to(nav.value, { opacity: 0 })
    reverseTL.to(nav.value, { opacity: 0 })
    reverseTL.add(() => { 
        data.logoReverse = true
    })
    .then((x) => {
        console.log('x', x)
        return waitForChildAnimation
    })
    .then((y) => {
         console.log('y',y)
         //data.logoShow = false
         reverseTL.to(nav.value, { opacity: 0 })
         reverseTL.to(blurb.value, { opacity: 0 })
    } )
}



const route = useRoute()

const data = reactive({
    logoShow: false,
    logoReverse: false,

})

const play = () => {
    forward()
    playTL.play()
}

const reverse = () => {
    backward()
    reverseTL.play()
}

    
    onMounted(() => {

        // setTimeout(() => {
        //     prepareTimelines()
        //     masterTL.play()
        // }, 500)

        //prepareTimelines()
        //masterTL.play()
        
    })

    const onLogoAnimated = (payload) => {
        console.log('parent: logo done animating', payload)
        promiseResolve(payload)

          // setTimeout(() => {
        //     prepareTimelines()
        //     masterTL.play()
        // }, 500)
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
