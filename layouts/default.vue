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
                    :reverse="data.logoReverse" 
                    @timeline="childTimeline"
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

const route = useRoute()

const data = reactive({
    logoShow: false,
    logoReverse: false,
    childTimeline: null
})


const masterTL = gsap.timeline({ 
    paused: true,
    onStart: () => {
        console.log('master started') 
    },
    onComplete: () => { 
        console.log('master complete') 
    }, 
    
})
const playTL = gsap.timeline({ onComplete: () => { console.log('play complete') }, paused: true})
let logoTL
const afterTL = gsap.timeline({ onComplete: () => { console.log('TL complete') }, paused: true})


const childTimeline = (payload) => {
    logoTL = payload
}

const forward = () => {
    afterTL.to(blurb.value, { opacity: 1 })
    afterTL.to(nav.value, { opacity: 1 })

    playTL.to(first.value, { width: '50px' })
    playTL.to(second.value, { width: '300px' })

    masterTL
        .add(playTL.play())
        .add(logoTL.play())
        .add(afterTL.play())

}

const play = () => {
    //masterTL.invalidate()
    masterTL.timeScale(1).play()
}

const reverse = () => {
    masterTL.timeScale(4).reverse()
}
    
onMounted(() => {
    console.log('data', data.childTimeline)
    forward()
 
})

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

.style-logo {
    //opacity: 0; 
}

.blurb, .nav {
    opacity: 0;
}

.first, .second {
    width: 0;
    //transform-origin: left center;
}


</style>
