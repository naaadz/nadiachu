<template>
    <div class="flex h-screen relative">
        <div class="first floral flex-none" ref="first"></div>
        <div class="second bg-default-dark" ref="second"></div>
        <div class="third the-page-outer bg-dark-1 flex-1 relative flex flex-col justify-center overflow-auto">
            <div class="the-page p-10" ref="thepage">
                <NuxtPage class="text-default-light"  />
            </div>
        </div>
        <div class="standard fixed flex flex-col justify-between h-full">
            <div class="style-logo flex-col text-center" ref="logo">
                <StyleLogo 
                    class="logo" 
                    @timelines="childTimelines"
                />
                <p class="blurb" ref="blurb">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
            </div>
            
            <nav class="flex justify-center gap-4 m-10" ref="standardnav">
                <a href="#" @click="goTo('about')">About</a>
                <a href="#" @click="goTo('resume')">Resume</a>
                <a href="#" @click="goTo('projects')">Projects</a>
                <a href="#" @click="goTo('contact')">Contact</a>
            </nav>
        </div>
        <div class="full" ref="fullnav">
            <nav>
                <span>logo</span>
                <span>Nadia Chu</span>
            </nav>
            <nav class="nav flex justify-center gap-4">
                <a href="#" @click="goTo('about')">About</a>
                <a href="#" @click="goTo('resume')">Resume</a>
                <a href="#" @click="goTo('projects')">Projects</a>
                <a href="#" @click="goTo('contact')">Contact</a>
            </nav>
        </div>
        <!-- <button @click="blinkingTL.play()">play</button>
        <button @click="blinkingTL.pause()">pause</button> -->
    </div>
</template>


<script setup>

import gsap from 'gsap'

const first = ref(null)
const second = ref(null)
const logo = ref(null)
const blurb = ref(null)
const thepage = ref(null)

const standardnav = ref(null)
const fullnav = ref(null)

const route = useRoute()
const router = useRouter()

const data = reactive({
    layoutType: 'standard',

})

let masterTL
let fullTL, logoTL, blinkingTL, revealPageTL

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
            if (to === 'projects') {
                masterTL.add(standardBackTL().play())
                masterTL.add(fullTL.play())
            }

            if (from === 'projects' ) {
                masterTL.add(fullTL.reverse())
                masterTL.add(standardForwardTL().play())
            }

            masterTL.add(revealPageTL.play())
        })
    }

}

const childTimelines = (payload) => {
    //when children mount, receive their timelines
    logoTL = payload[0]
    blinkingTL = payload[1]
}

const setupTLs = () => {

    masterTL = gsap.timeline()

    fullTL = gsap.timeline({
        paused: true
    })
        .to(first.value, { width: '50px', opacity: .2 })
        .to('.full nav:last-child > *', {opacity: 1, stagger: .2})
        .to('.full nav:first-child > *', {opacity: 1, stagger: .2})

    revealPageTL = gsap.timeline({
        paused: true
    })
        .to(thepage.value, { opacity: 1 })
}

const standardForwardTL = () => {
    return gsap.timeline({ paused: true })
        .to(first.value, { width: '50px' })
        .to(second.value, { width: '300px' })
        .add(logoTL.timeScale(1).restart().play(), '>-50%')
        .to(blurb.value, { opacity: 1 })
        .to(standardnav.value.children, {opacity: 1, stagger:.2})
}

const standardBackTL = () => {
    return gsap.timeline({ paused: true })
        .to(standardnav.value.children, {opacity: 0, stagger:.2})
        .to(blurb.value, { opacity: 0 })
        .add(blinkingTL.restart().pause())
        .add(logoTL.timeScale(4).reverse())
        .to(second.value, { width: '0' })
        .to(first.value, { width: '0' })
}
    
onMounted(() => {
    console.log('screen mounted')
    setupTLs()

    if (['projects'].includes(route.name)) {
        masterTL
            .add(fullTL.play())
            .add(revealPageTL.play())
    } else {
        masterTL
            .add(standardForwardTL().play())
            .add(revealPageTL.play())
    }
})

// watch(() => route.name, (to, from) => {
//     gsap.timeline()
//         .add(revealPageTL.play())
// })


</script>