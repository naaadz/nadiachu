<template>
    <div :class="`layout-${route.name === 'projects' ? 'full' : 'standard'}`">
        <div class="bg flex h-screen fixed overflow-hidden">
            <div class="first floral flex-none" ref="first"></div>
            <div class="second bg-default-dark" ref="second"></div>
            <div class="third bg-dark-1 flex-1"></div>
        </div>

        <div class="bar-standard fixed h-screen flex flex-col justify-between top-0 overflow-hidden" ref="standard">
            <div class="flex-col text-center">
                <STCLogo
                    class="logo" 
                    @logoTL="onlogoTL"
                />
                <p class="blurb" ref="blurb">A portfolio site by <nuxt-link to="/contact" class="under active">Nadia Chu</nuxt-link></p>
                
            </div>
            
            <nav class="flex justify-center gap-4 m-10" ref="standardnav">
                <nuxt-link 
                    v-for="page in usePages()" 
                    class="under"
                    :class="{ active : route.name === page.name}"
                    :to="page.name">{{ page.name }}
                </nuxt-link>
            </nav>
        </div>

        <div class="bar-full" ref="fullnav">
            <nav>
                <span class="flower">
                    <nuxt-link to="/about"><STCFlower :key="1" @flowerTL="onFlowerTL" /></nuxt-link>
                </span>
                <span class="nadia">Nadia Chu</span>
            </nav>
            <nav class="nav flex justify-center gap-4">
                <nuxt-link 
                    v-for="page in usePages()" 
                    class="fill"
                    :class="{ active : route.name === page.name}"
                    :to="page.name">{{ page.name }}
                </nuxt-link>
            </nav>
        </div>

        <div class="page-wrap">
            <div class="page-content">
                <div class="the-page" ref="thepage">
                    <NuxtPage class="" />
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
const { currentProject } = useProjects()

const first = ref(null)
const second = ref(null)
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

const onFlowerTL = (payload) => {
    flowerTL = payload
}

const onlogoTL = (payload) => {
    logoTL = payload
}

const defineTimelines = () => {
    fullTL
        .to(first.value, { width: '2.5rem', opacity: 0 })
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
}

router.beforeEach((to, from, next) => {

    // console.log('from:', from)
    // console.log('to:', to)

    if (from.name !== to.name) {
        masterTL.clear()
        
        if (![from.name, to.name].includes('projects')) {
            //dim the standard nav while the other pages are appearing
            masterTL.add(gsap.to(standard.value, { opacity: .5}))
        }

        masterTL
            .add(revealHeading.reverse(), '<')
            .add(revealPageTL.reverse())
            
        masterTL.add(() => {
            return new Promise ((res) => {
                next()
                res()
            })
        })

        masterTL.then(() => {

            if (to.name === 'projects') {
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

            else if (from.name === 'projects' ) {
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
})
    
onMounted(() => {

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
