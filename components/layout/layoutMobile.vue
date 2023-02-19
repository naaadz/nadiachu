<template>
    <div :class="{ loaded: data.loaded }">
        <div class="bg flex h-screen relative overflow-hidden">
            <div class="first floral flex-none" ref="first"></div>
            <div class="second bg-default-dark flex flex-col justify-between" ref="second"></div>
        </div>
        <div class="page-wrap flex flex-col items-center fixed-stretch" ref="pageWrap">
            <div class="flex-col text-center" ref="logoWrap">
                <STCLogo
                    class="logo" 
                    @logoTL="onlogoTL"
                />
                <p class="blurb" ref="blurb">A portfolio site by <nuxt-link to="/about" class="under active">Nadia Chu</nuxt-link></p>
                
            </div>

            <div class="the-page" ref="thepage">
                <NuxtPage class="text-default-light" />
            </div>
            <nav class="fixed-stretch" ref="nav">
                <div class="inner flex justify-center space-x-4" :class="{ disabled: data.animating }">
                    <nuxt-link 
                        v-for="page in usePages()" 
                        class="under"
                        :class="{ active : route.name === page.name }"
                        :to="page.name">{{ page.name }}
                    </nuxt-link>
                </div>
            </nav>
        </div>
        <div class="heading-wrap flex justify-start items-center fixed-stretch" ref="headingWrap">
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

const data = reactive({
    loaded: false,
    animating: false
})

//maybe make the refs list and the timeline assignments dynamic (in a loop)
const first = ref(null)
const second = ref(null)
const logoWrap = ref(null)
const blurb = ref(null)
const heading = ref(null)
const headingWrap = ref(null)
const nav = ref(null)
const thepage = ref(null)
const branch = ref(null)
const pageWrap = ref(null)

let logoTL

const masterTL = gsap.timeline({
    paused: true,
    onStart: () => {
        console.log('masterTL started')
        data.animating = true
    },
    onComplete: () => {
            console.log('masterTL complete')
            data.animating = false
    }
})

const revealFirst = gsap.timeline({paused: true})
const revealPageTL = gsap.timeline({paused: true})
const revealHeading = gsap.timeline({paused: true})
const hideLogoTL = gsap.timeline({paused: true})
const revealNav = gsap.timeline({paused: true})
const revealBlurb = gsap.timeline({paused: true})

const onlogoTL = (payload) => {
    logoTL = payload
}

router.beforeEach((to, from, next) => {

    if (from.name !== to.name) {

        masterTL
            .clear()
            .add(revealPageTL.reverse())
            .add(revealHeading.reverse())

        if (from.name === 'about') {

            masterTL
                .add(logoTL.timeScale(4).reverse())
                .add(hideLogoTL.play(), '>')
                .add(revealBlurb.reverse(), '>-50%')
        }

        else if (to.name === 'about') {
            masterTL
                .add(() => {
                    pageWrap.value.scrollTo({ top: 0 })
                })
                .add(hideLogoTL.reverse())
                .add(logoTL.timeScale(1).play())
                .add(revealBlurb.play(), '>-20%')
        }

        masterTL.add(() => {
            return new Promise ((res) => {
                pageWrap.value.scrollTo({ top: 0 })
                next()
                res()
            })
        })

        masterTL.then(() => {
            if (to.name !== 'about') {
                masterTL.add(revealHeading.play())
            }
            
            masterTL.add(revealPageTL.play())
        })
    }
})

const defineTimelines = () => {
    revealFirst
        .from(first.value, { x: '-100%' })
        .from(second.value, { y: '100%', ease: "power2.in" })
    revealNav.to('nav a', {opacity: 1, stagger:.2})

    revealPageTL
        .to(thepage.value, { opacity: 1 })

    revealHeading
        .set(headingWrap.value, { opacity: 1 })
        .to(branch.value, { flex: '1 1 0', ease: "expo.out" })
        .to(heading.value, { opacity: 1 })

    hideLogoTL
        .to(logoWrap.value, { opacity: 0 })
        .set(logoWrap.value, { height: 0 })

    revealBlurb.to(blurb.value, { opacity: 1 })
}

onMounted(() => {
    defineTimelines()

        masterTL
            .add(revealFirst.play())
            .add(() => data.loaded = true )

            if (['contact', 'projects', 'resume'].includes(route.name)) {
                masterTL
                    .add(hideLogoTL.play())
                    .add(revealHeading.play())
            } else {
                masterTL
                    .add(logoTL.play())
                    .add(revealBlurb.play())
            }

        masterTL
            .add(revealPageTL.play())
            .add(revealNav.play())

        masterTL.play()
})

</script>