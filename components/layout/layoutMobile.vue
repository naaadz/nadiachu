<template>
    <div>
        <div class="flex h-screen relative">
            <div class="first floral flex-none" ref="first"></div>
            <div class="second bg-default-dark flex flex-col justify-between" ref="second"></div>
        </div>

        <div class="fixed flex flex-col justify-between top-0 z-10 h-screen w-full">
            <div class="style-logo flex-col text-center" ref="logo">
                <StyleLogo 
                    class="logo" 
                    @timelines="childTimelines"
                />
                <p class="blurb" ref="blurb">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
            </div>
            <div class="the-page p-10 overflow-hidden" ref="thepage">
                <NuxtPage class="text-default-light"  />
            </div>
            <nav class="flex justify-center gap-4 m-10" ref="standardnav">
                <a href="#" @click="goTo('index')">Index</a>
                <a href="#" @click="goTo('about')">About</a>
                <a href="#" @click="goTo('projects')">Projects</a>
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
const standardnav = ref(null)
const thepage = ref(null)

let logoTL, blinkingTL

const revealPageTL = gsap.timeline({paused: true})

const childTimelines = (payload) => {
    //when children mount, receive their timelines
    logoTL = payload[0]
    blinkingTL = payload[1]
}


const forward = () => {
    return gsap.timeline({ paused: true })
        .to(first.value, { width: '20px' })
        .to(second.value, { flex: 1 })
        .add(logoTL.timeScale(1).play(), '>-50%')
        .to(blurb.value, { opacity: 1 })
        .to(standardnav.value.children, {opacity: 1, stagger:.2})
        
}

const reverse = () => {
    return gsap.timeline({ paused: true })
        .to(standardnav.value.children, {opacity: 0, stagger:.2})
        .to(blurb.value, { opacity: 0 })
        .add(logoTL.timeScale(4).reverse())
        .to(second.value, { flex: 0 })
        .to(first.value, { width: '0' })
}

const goTo = (to) => {

const from = route.name
console.log('goTo: route:', route.name)

if (from !== to) {
    console.log('goTo: from != to')

    //route changed, so remove the current page
    const routeTL = gsap.timeline({paused: true})
        .add(revealPageTL.reverse())

    const path = to === 'index' ? '/' : '/' + to
    routeTL.add(() => router.push({ path: path }))
    routeTL.play()
}

}

onMounted(() => {
    console.log('mobile mounted')

    revealPageTL.to(thepage.value, { opacity: 1 })

    gsap.timeline()
        .add(forward().play())
        .add(revealPageTL.play())
})

watch(() => route.name, (to, from) => {

    gsap.timeline()
        .add(revealPageTL.play())
    })

</script>