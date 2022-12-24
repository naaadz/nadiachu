<template>
    <div :class="{ loaded: data.loaded }">
        <div class="bg flex h-screen relative">
            <div class="first floral flex-none" ref="first"></div>
            <div class="second bg-default-dark flex flex-col justify-between" ref="second"></div>
        </div>
        <div class="page-wrap flex flex-col items-center fixed-stretch">
            <div class="heading-wrap fixed-stretch">
                <div class="flex-col text-center" ref="logoWrap">
                    <STCLogo
                        class="logo" 
                        @logoTL="onlogoTL"
                    />
                    <p class="blurb" ref="blurb">A portfolio site by <a href="#" class="under active">Nadia Chu</a></p>
                </div>
                <div class="heading flex" ref="heading">
                    <template v-if="route.meta.heading">
                        <span>{{ route.meta.heading[0] }}</span>
                        <span>{{ route.meta.heading[1] }}_</span>
                    </template>
                </div>
            </div>

            <div class="the-page" ref="thepage">
                <NuxtPage class="text-default-light" />
            </div>
            <nav class="fixed-stretch flex justify-center space-x-4" ref="nav">
                <nuxt-link 
                    v-for="page in usePages()" 
                    class="under"
                    :class="{ active : route.name === page.name}"
                    :to="page.name">{{ page.name }}
                </nuxt-link>
            </nav>
        </div>
    </div>
</template>

<script setup>

import gsap from 'gsap'

const route = useRoute()
const router = useRouter()

const data = reactive({
    loaded: false
})

//maybe make the refs list and the timeline assignments dynamic (in a loop)

const first = ref(null)
const second = ref(null)
const logoWrap = ref(null)
const blurb = ref(null)
const heading = ref(null)
const nav = ref(null)
const thepage = ref(null)

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

router.beforeEach((to, from, next) => {

    //console.log('beforeEach', from.name, to.name)

    if (from.name !== to.name) {
        masterTL.clear()
        masterTL.add(revealPageTL.reverse())

        masterTL.add(() => {
            return new Promise ((res) => {
                next()
                res()
            })
        })

        masterTL.then(() => {
            if (from.name === 'about') {
                masterTL
                    .add(logoTL.timeScale(4).reverse())
                    .add(revealBlurb.reverse(), '>-50%')
                    .add(hideLogoTL.play())
                    .add(revealHeading.play())
                    .add(revealPageTL.play(), '>-50%')
            } 

            else if (to.name === 'about') {
                masterTL
                    .add(revealHeading.reverse())
                    .add(hideLogoTL.reverse())
                    .add(logoTL.timeScale(1).play())
                    .add(revealBlurb.play(), '>-20%')
                    .add(revealPageTL.play(), '>-20%')
            } else {
                masterTL.add(revealPageTL.play())
            }
        })
    }
})

const defineTimelines = () => {
    revealFirst
        .to(first.value, { width: '1.5rem' })
        .to(second.value, { flex: 1 })
    revealNav.to(nav.value.children, {opacity: 1, stagger:.2})
    revealPageTL.to(thepage.value, { opacity: 1 })
    revealHeading
        .to(heading.value, { opacity: 1 })
    hideLogoTL.set(logoWrap.value, { height: 0 })
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