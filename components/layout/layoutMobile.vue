<template>
    <div>
        <div class="bg flex h-screen relative">
            <div class="first floral flex-none" ref="first"></div>
            <div class="second bg-default-dark flex flex-col justify-between" ref="second"></div>
        </div>

        <div class="content fixed top-0 z-10 h-screen flex flex-col">
            <div class="style-logo flex-col text-center" ref="logo">
                <StyleLogo 
                    class="logo" 
                    @timelines="childTimelines"
                />
                <p class="blurb" ref="blurb">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
            </div>
            <div class="the-page p-10 overflow-auto flex-1" ref="thepage">
                <NuxtPage class="text-default-light" />
            </div>
            <nav class="flex justify-center fixed bottom-0 space-x-4" ref="nav">
                <a href="#" @click="goTo('about')">About</a>
                <a href="#" @click="goTo('resume')">Resume</a>
                <a href="#" @click="goTo('projects')">Projects</a>
                <a href="#" @click="goTo('contact')">Contact</a>
            </nav>
        </div>

       
    </div>
</template>

<script setup>

import gsap from 'gsap'

const route = useRoute()
const router = useRouter()

const first = ref(null)
const second = ref(null)
const logo = ref(null)
const blurb = ref(null)
const nav = ref(null)
const thepage = ref(null)

let masterTL, logoTL, blinkingTL

const revealPageTL = gsap.timeline({paused: true})

const childTimelines = (payload) => {
    //when children mount, receive their timelines
    logoTL = payload[0]
    blinkingTL = payload[1]
}


const forward = () => {
    return gsap.timeline({ paused: true })
        .to(first.value, { width: '1.5rem' })
        .to(second.value, { flex: 1 })
        .add(logoTL.timeScale(1).play(), '>-50%')
        .to(blurb.value, { opacity: 1 })
        .to(nav.value.children, {opacity: 1, stagger:.2})
        
}

const reverse = () => {
    return gsap.timeline({ paused: true })
        .to(nav.value.children, {opacity: 0, stagger:.2})
        .to(blurb.value, { opacity: 0 })
        .add(logoTL.timeScale(4).reverse())
        .to(second.value, { flex: 0 })
        .to(first.value, { width: '0' })
}

const goTo = (to) => {

    const from = route.name
    console.log('goTo: route:', from, to)

    if (from !== to) {
        masterTL.clear()

        //first hide the page
        masterTL.add(revealPageTL.reverse())

        //now change the route early, so that there's less chance the route will be the same
        //if you click on the same link during an animation
        masterTL.add(() => {
            router.push({ path: to })
        })

        masterTL.then(() => {
            //if route is "from" about
            if (from === 'about') {
                masterTL.add(logoTL.timeScale(4).reverse())
            }

            //if route is "to" about
            if (to === 'about') {
                masterTL.add(logoTL.timeScale(1).play())
            }

            masterTL.add(revealPageTL.play())
        })
    }
}

onMounted(() => {
    //console.log('mobile mounted')

    revealPageTL.to(thepage.value, { opacity: 1 })

    masterTL = gsap.timeline()
        .add(forward().play())
        .add(revealPageTL.play())
})


</script>