<template>
    <div>
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
            <nav class="fixed-stretch flex justify-center space-x-4" ref="nav">
                <nuxt-link
                    v-for="page in pageLinks"
                    :key="page.name"
                    :class="{active: route.name === page.name}"
                    :to="page.route"
                    >{{ page.label }}
                </nuxt-link>
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

const pageLinks = inject('pageLinks')

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

const masterTL = gsap.timeline({paused: true})
const revealFirst = gsap.timeline({paused: true})
const revealPageTL = gsap.timeline({paused: true})
const revealHeading = gsap.timeline({paused: true})
const hideLogoTL = gsap.timeline({paused: true})
const revealNav = gsap.timeline({paused: true})
const revealBlurb = gsap.timeline({paused: true})

const onlogoTL = (payload) => {
    logoTL = payload
}

const mobileGuard = router.beforeEach((to, from, next) => {

    if (from.name !== to.name) {

        masterTL
            .clear()
            .add(revealPageTL.reverse())
            .add(revealHeading.timeScale(6).reverse())

        if (from.name === 'about') {

            masterTL
                .add(hideLogoTL.play(), .5)
                .add(revealBlurb.reverse(), '<')
        }

        else if (to.name === 'about') {
            masterTL
                .add(() => {
                    pageWrap.value.scrollTo({ top: 0 })
                })
                .add(hideLogoTL.reverse(), 1)
                .add(logoTL.progress(1).pause(), 1)
                .add(revealBlurb.play(), 1)
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
                masterTL.add(revealHeading.timeScale(1).play())
            }
            
            masterTL.add(revealPageTL.play(), '>-50%')
        })
    }
})

const defineTimelines = () => {
    revealFirst
        .from(first.value, { x: '-100%' })
        .from(second.value, { y: '100%', ease: "power4.in" }, '<')

    revealNav
        .to(nav.value, { opacity: 1 })
        .to(nav.value.children, {opacity: 1, stagger:.05})

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

            if (['contact', 'projects', 'resume'].includes(route.name)) {
                masterTL
                    .add(hideLogoTL.play())
                    .add(revealHeading.play())
            } else {
                masterTL
                    .add(logoTL.timeScale(2).play())
                    .add(revealBlurb.play())
            }

        masterTL
            .add(revealPageTL.play())
            .add(revealNav.play())

        masterTL.play()
})

onUnmounted(() => {
    //remove router hook
    mobileGuard()
})

</script>