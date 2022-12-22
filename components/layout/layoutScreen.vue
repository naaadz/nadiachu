<template>
    <div :class="`layout-${route.name === 'projects' ? 'full' : 'standard'}`">
        <div class="bg flex h-screen fixed overflow-hidden">
            <div class="first floral flex-none" ref="first"></div>
            <div class="second bg-default-dark" ref="second"></div>
            <div class="third bg-dark-1 flex-1"></div>
        </div>

        <div class="bar-standard fixed h-screen flex flex-col justify-between top-0 overflow-hidden" ref="standard">
            <div class="logo-wrap flex-col text-center" ref="logo">
                <STCLogo
                    class="logo" 
                    @logoTL="onlogoTL"
                />
                <p class="blurb" ref="blurb">A portfolio site by <a href="#" class="under active" @click="goTo('about')">Nadia Chu</a></p>
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

        <div class="bar-full" ref="fullnav">
            <nav>
                <span class="flower">
                    <STCFlower @flowerTL="onFlowerTL" />
                </span>
                <span class="nadia">Nadia Chu</span>
            </nav>
            <nav class="nav flex justify-center gap-4">
                <a 
                    v-for="page in usePages()" 
                    :class="{ active : route.name === page.name}"
                    class="fill"
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
const standard = ref(null)
const standardnav = ref(null)
const fullnav = ref(null)
const heading = ref(null)
const branch = ref(null)

let logoTL, flowerTL

const masterTL = gsap.timeline({ paused: true })
const fullTL = gsap.timeline({ paused: true })
const revealPageTL = gsap.timeline({ paused: true })
const revealHeading = gsap.timeline({ paused: true })
const revealFirst = gsap.timeline({paused: true})
const revealBlurb = gsap.timeline({paused: true})
const revealNav = gsap.timeline({paused: true})
const hideLogoTL = gsap.timeline({paused: true})

const goTo = (to) => {
    const from = route.name
    //console.log('goTo: route:', from, to)

    if (from !== to) {
        masterTL.clear()
        
        if (![from, to].includes('projects')) {
            //dim the standard nav while the other pages are appearing
            masterTL.add(gsap.to(standard.value, { opacity: .5}))
        }

        masterTL
            .add(revealHeading.reverse(), '<')
            .add(revealPageTL.reverse())
            
        //now change the route early, so that there's less chance the route will be the same
        //if you click on the same link during an animation
        masterTL.add(() => {
            router.push({ path: to })
        })

        masterTL.then(() => {

            if (to === 'projects') {
                //reverse the standard view
                masterTL
                .add(logoTL.timeScale(5).reverse())
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
            }

            else {
                masterTL
                    .add(revealHeading.play(), '>-50%')
                    .add(revealPageTL.play(), '>-50%')
                    .add(gsap.to(standard.value, { opacity: 1}))
            }
        })
    }
}

const onFlowerTL = (payload) => {
    flowerTL = payload
}

const onlogoTL = (payload) => {
    logoTL = payload
}

const defineTimelines = () => {
    fullTL
        .to(first.value, { width: '2.5rem', opacity: .2 })
        .to('.bar-full nav:last-child > *', {opacity: 1, stagger: .1})
        .to('.bar-full nav:first-child > *', {opacity: 1, stagger: .1})
        .add(flowerTL.play())

    revealPageTL.to(thepage.value, { opacity: 1 })

    revealHeading
        .to(branch.value, { width: '300px', ease: "expo.out" })
        .to(heading.value, { opacity: 1 })

    revealFirst
        .to(first.value, { width: '2.5rem' })
        .to(second.value, { width: '20rem' })
    
    revealBlurb.to(blurb.value, { opacity: 1 })

    revealNav.to(standardnav.value.children, {opacity: 1, stagger:.2})

    hideLogoTL.set(logo.value, { height: 0, autoAlpha: 0 })

}
    
onMounted(() => {
    console.log('screen mounted')

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
