<template>
    <div>
        <div class="bg flex h-screen fixed overflow-hidden">
            <div class="first floral flex-none" ref="first"></div>
            <div class="second bg-default-dark" ref="second"></div>
            <div class="third bg-dark-1 flex-1"></div>
        </div>

        <div class="standard fixed h-screen flex flex-col justify-between top-0 overflow-hidden">
            <div class="style-logo flex-col text-center" ref="logo">
                <StyleLogo 
                    class="logo" 
                    @timelines="childTimelines"
                />
                <p class="blurb" ref="blurb">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
            </div>
            
            <nav class="flex justify-center gap-4 m-10" ref="standardnav">
                <a 
                    v-for="page in usePages()" 
                    class="under"
                    :class="{ active : route.name === page.name}"
                    href="#" 
                    @click="goTo(page.name)">{{ page.name }}
                </a>
            </nav>
        </div>

        <div class="full" ref="fullnav">
            <nav>
                <span>logo</span>
                <span>Nadia Chu</span>
            </nav>
            <nav class="nav flex justify-center gap-4">
                <a 
                    v-for="page in usePages()" 
                    :class="{ active : route.name === page.name}"
                    href="#" 
                    @click="goTo(page.name)">{{ page.name }}
                </a>
            </nav>
        </div>

        <div class="page-wrap">
            <div class="page-content">
                <div class="the-page" ref="thepage">
                    <NuxtPage class="text-default-light" />
                </div>
            </div>
        </div>
        <div class="heading-wrap flex items-center fixed">
            <div class="branch" ref="branch"></div>
            <div class="heading flex" ref="heading">
                <template v-if="route.meta.heading">
                    <span>{{ route.meta.heading[0] }}</span>
                    <span>{{ route.meta.heading[1] }}_</span>
                </template>
                <template v-else>
                    <span>Page not found</span>
                </template>
            </div>
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
const thepage = ref(null)
const standardnav = ref(null)
const fullnav = ref(null)
const heading = ref(null)
const branch = ref(null)

let logoTL, blinkingTL

const masterTL = gsap.timeline({ paused: true })
const fullTL = gsap.timeline({ paused: true })
const revealPageTL = gsap.timeline({ paused: true })
const revealHeading = gsap.timeline({ paused: true })

const revealFirst = gsap.timeline({paused: true})
const revealBlurb = gsap.timeline({paused: true})
const revealNav = gsap.timeline({paused: true})






const goTo = (to) => {
    const from = route.name
    //console.log('goTo: route:', from, to)

    if (from !== to) {
        masterTL.clear()
        //first hide the page
        masterTL.add(revealHeading.reverse())
        masterTL.add(revealPageTL.reverse())
        //now change the route early, so that there's less chance the route will be the same
        //if you click on the same link during an animation
        masterTL.add(() => {
            router.push({ path: to })
        })

        masterTL.then(() => {

            if (to === 'projects') {
                //reverse the standard view
                masterTL
                .add(blinkingTL.restart().pause())
                .add(logoTL.timeScale(4).reverse())
                .add(revealNav.reverse(), '<')
                .add(revealBlurb.reverse(), '<')
                .add(revealFirst.reverse(), '<')
                .add(fullTL.timeScale(1).play())
                .add(revealHeading.play(), '>-50%')
                .add(revealPageTL.play(), '>-50%')
            }

            else if (from === 'projects' ) {
                masterTL
                    .add(fullTL.timeScale(3).reverse())
                    .add(revealFirst.play())
                    .add(logoTL.timeScale(1).play(), '>-50%')
                    .add(revealHeading.play(), '>-50%')
                    .add(revealPageTL.play(), '>')
                    .add(revealNav.play(), '>')
                    .add(revealBlurb.play(), '>')
                // masterTL.add(fullTL.timeScale(3).reverse())
                // masterTL.add(standardForwardTL().timeScale(1).play())
            }

            else {
                masterTL
                    .add(revealHeading.play(), '>-50%')
                    .add(revealPageTL.play(), '>-50%')
            }

            
        })
    }
}

const childTimelines = (payload) => {
    logoTL = payload[0]
    blinkingTL = payload[1]
}

const defineTimelines = () => {
    fullTL
        .to(first.value, { width: '50px', opacity: .2 })
        .to('.full nav:last-child > *', {opacity: 1, stagger: .1})
        .to('.full nav:first-child > *', {opacity: 1, stagger: .1})

    revealPageTL.to(thepage.value, { opacity: 1 })

    revealHeading
        .to(branch.value, { width: '300px', ease: "expo.out" })
        .to(heading.value, { opacity: 1 })

    revealFirst
        .to(first.value, { width: '2.5rem' })
        .to(second.value, { width: '20rem' })
    
    revealBlurb.to(blurb.value, { opacity: 1 })

    revealNav.to(standardnav.value.children, {opacity: 1, stagger:.2})

}







// const standardForwardTL = () => {
//     return gsap.timeline({ paused: true })
//         // .to(first.value, { width: '50px' })
//         // .to(second.value, { width: '300px' })
//         .add(logoTL.timeScale(1).restart().play(), '>-80%')
//         .to(blurb.value, { opacity: 1 })
//         .to(standardnav.value.children, {opacity: 1, stagger:.2})
// }

// const standardBackTL = () => {
//     return gsap.timeline({ paused: true })
//         // .to(standardnav.value.children, {opacity: 0, stagger:.2})
//         // .to(blurb.value, { opacity: 0 })
//         .add(blinkingTL.restart().pause())
//         .add(logoTL.timeScale(4).reverse())
//         // .to(second.value, { width: '0' },'>-20%')
//         // .to(first.value, { width: '0' })
// }
    
onMounted(() => {
    console.log('screen mounted')
    // console.log('route', route)
    // console.log('router', router.getRoutes())

    defineTimelines()

    if (route.name === 'projects') {
        masterTL
            .add(fullTL.play())
            .add(revealHeading.play(), '>-50%')
            .add(revealPageTL.play())
    } else {
        masterTL
            .add(revealFirst.play())
            .add(logoTL.timeScale(1).play(), '>-50%')
            .add(revealHeading.play(), '>-50%')
            .add(revealPageTL.play(), '>')
            .add(revealNav.play(), '>')
            .add(revealBlurb.play(), '>')
    }

    masterTL.play()
})


</script>
