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
            <div class="heading flex justify-center" ref="heading">
                <template v-if="route.meta.heading">
                    <span>{{ route.meta.heading[0] }}</span>
                    <span>{{ route.meta.heading[1] }}</span>
                </template>
                <template v-else>
                    <span>Page not found</span>
                </template>
            </div>
            <div class="the-page p-10 overflow-auto flex-1" ref="thepage">
                <NuxtPage class="text-default-light" />
            </div>
            <nav class="flex justify-center space-x-4" ref="nav">
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

//maybe make the refs list and the timeline assignments dynamic (in a loop)

const first = ref(null)
const second = ref(null)
const logo = ref(null)
const blurb = ref(null)
const heading = ref(null)
const nav = ref(null)
const thepage = ref(null)

let logoTL, blinkingTL

const masterTL = gsap.timeline({paused: true})
const revealFirst = gsap.timeline({paused: true})
const revealPageTL = gsap.timeline({paused: true})
const revealHeading = gsap.timeline({paused: true})
const hideLogoTL = gsap.timeline({paused: true})
const revealNav = gsap.timeline({paused: true})

const childTimelines = (payload) => {
    //when children mount, receive their timelines
    logoTL = payload[0]
    blinkingTL = payload[1]
}

const goTo = (to) => {

    const from = route.name
    //console.log('goTo: route:', from, to)

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
                masterTL.add(blinkingTL.restart().pause())
                masterTL.add(logoTL.timeScale(4).reverse())
                masterTL.add(hideLogoTL.play())
                masterTL.add(revealHeading.play())
            }

            //if route is "to" about
            if (to === 'about') {
                masterTL.add(revealHeading.reverse())
                masterTL.add(hideLogoTL.reverse())
                masterTL.add(logoTL.timeScale(1).play())
            }

            masterTL.add(revealPageTL.play())
        })
    }
}

const defineTimelines = () => {
    revealFirst
        .to(first.value, { width: '1.5rem' })
        .to(second.value, { flex: 1 })
    revealNav.to(nav.value.children, {opacity: 1, stagger:.2})
    revealPageTL.to(thepage.value, { opacity: 1 })
    revealHeading
        .to(heading.value, { opacity: 1 })
    hideLogoTL.set(logo.value, { height: 0 })
}

onMounted(() => {

    defineTimelines()

    masterTL
        .add(revealFirst.play())
        .then(() => {
            return new Promise((res) => {
                if (route.name === 'about') {
                    //if about, play the whole logo
                    logoTL.eventCallback('onComplete', () => res())
                    logoTL.timeScale(1).play()
                } else {
                    //just play the heading
                    revealHeading.eventCallback('onComplete', () => res())
                    hideLogoTL.play()
                    revealHeading.play()
                }
            })
        })
        .then(() => {
            masterTL
                .add(revealNav.play())
                .add(revealPageTL.play())
        })

    masterTL.play()

})


</script>