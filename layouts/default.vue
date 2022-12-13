<template>
    <Body :class="`layout-type-${data.layoutType}`">
        <div class="flex h-screen relative">
            <div class="first floral w-10 bg-red-100 flex-none" ref="first"></div>
            <div class="second bg-default-dark" ref="second"></div>
            <div class="third the-page-outer bg-dark-1 flex-1 relative flex flex-col justify-center overflow-auto">
            <!-- <div class="the-branch" :style="`transform:translateY(${data.branchPos}%)`">
                <div class="branch"></div>
                <NuxtPage class="the-page text-default-light" />
            </div> -->
                <!-- <p class="text-default-light fixed">
                    <a class="text-inherit" @click.prevent="" href="#">Toggle</a>
                </p> -->
                <div class="the-page p-10" ref="thepage">
                    <NuxtPage class="text-default-light"  />
                </div>
            </div>
            <div class="standard main fixed flex flex-col justify-between h-full">
                <div class="style-logo flex-col text-center" ref="logo">
                    <StyleLogo 
                        class="logo" 
                        :reverse="data.logoReverse" 
                        @timelines="childTimelines"
                    />
                    <p class="blurb" ref="blurb">A portfolio site by <nuxt-link>Nadia Chu</nuxt-link></p>
                </div>
                
                <nav class="flex justify-center gap-4 m-10" ref="standardnav">
                    <a href="#" @click="goTo('index')">Index</a>
                    <a href="#" @click="goTo('about')">About</a>
                    <a href="#" @click="goTo('projects')">Projects</a>
                </nav>
            </div>
            <div class="full" ref="fullnav">
                <nav>
                    <span>logo</span>
                    <span>Nadia Chu</span>
                </nav>
                <nav class="nav flex justify-center gap-4">
                    <a href="#" @click="goTo('index')">Index</a>
                    <a href="#" @click="goTo('about')">About</a>
                    <a href="#" @click="goTo('projects')">Projects</a>
                </nav>
            </div>
            
        </div>
    </Body>
 
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


let fullTL, logoTL, blinkingTL, revealPageTL


const goTo = (to) => {

    const from = route.name
    console.log('goTo: route:', route.name)

    if (from !== to) {
        console.log('goTo: from != to')

        //route changed, so remove the current page
        const routeTL = gsap.timeline({paused: true})
            .add(revealPageTL.reverse())

        if (to === 'projects') {
            routeTL.add(reverse().play())
            routeTL.add(fullTL.play())
        }

        if (from === 'projects' ) {
            routeTL.add(fullTL.reverse())
            routeTL.add(forward().play())
        }

        const path = to === 'index' ? '/' : '/' + to
        routeTL.add(() => router.push({ path: path }))
        routeTL.play()
    }

}

const childTimelines = (payload) => {
    //when children mount, receive their timelines
    logoTL = payload[0]
    blinkingTL = payload[1]
}

const setupTLs = () => {
    fullTL = gsap.timeline({
        paused: true
    })
        .to(first.value, { width: '50px', opacity: .2 })
        .to('.full nav:last-child > *', {opacity: 1, stagger: .2})
        .to('.full nav:first-child > *', {opacity: 1, stagger: .2})

    revealPageTL = gsap.timeline({
        paused: true, 
        // onComplete: () => console.log('reveal complete'),
        // onStart: () => console.log('reveal start'),
        // onReverseComplete: () => console.log('reveal reverse complete'),
    })
        .to(thepage.value, { opacity: 1 })
}

const forward = () => {
    return gsap.timeline({ paused: true })
        .to(first.value, { width: '50px' })
        .to(second.value, { width: '300px' })
        .add(logoTL.timeScale(1).play(), '>-50%')
        .addLabel('logo')
        .to(blurb.value, { opacity: 1 })
        .to(standardnav.value.children, {opacity: 1, stagger:.2})
        //.add(blinkingTL.play(), 'logo') //dont put anything after this cuz it will never complete
        
}

const reverse = () => {
    return gsap.timeline({ paused: true })
        .to(standardnav.value.children, {opacity: 0, stagger:.2})
        .to(blurb.value, { opacity: 0 })
        //.add(blinkingTL.restart().pause())
        .add(logoTL.timeScale(4).reverse())
        .to(second.value, { width: '0' })
        .to(first.value, { width: '0' })
}
    
onMounted(() => {

    setupTLs()
    console.log('mounted router:', router)
    data.fromRoute = route.name
    console.log('mounted:', data.fromRoute)

    if (['projects'].includes(route.name)) {
        data.layoutType = 'full'
        gsap.timeline()
            .add(fullTL.play())
            .add(revealPageTL.play())
    } else {
        data.layoutType = 'standard'
        gsap.timeline()
            .add(forward().play())
            .add(revealPageTL.play())
    }
})

//possibly move this to middleware

watch(() => route.name, (to, from) => {

    console.log('watch: route:', route.name)

    gsap.timeline()
        .add(revealPageTL.play())

})


</script>

<style lang="scss">

// .style-logo {
//     //opacity: 0; 
// }

.blurb {
    opacity: 0;
}

.first, .second {
    width: 0;
    //transform-origin: left center;
}

.the-page {
    opacity: 0;
}

nav  {
    > * {
        opacity: 0;
    }
}

// .layout-type-full nav {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     transform: rotate(-90deg) translateY(-45px );
//     transform-origin: bottom left;
// }

// .standard {
//     nav > * {
//         opacity: 0;
//     }
// }

.full {
    height: 100vh;
    width: 50px;
    left: 0;
    position: absolute;
    @apply flex flex-col justify-between items-center;

    // nav  {
    //     //writing-mode: vertical-rl;
    //     opacity: 0;
        
    // }

    nav {
        @apply flex;
        writing-mode: tb-rl;
        transform: rotate(180deg);
        // position: absolute;
        // left: 0;
        white-space: nowrap;
        //writing-mode: vertical-rl;
        //writing-mode: vertical-lr;
        // text-orientation: mixed;

         //text-orientation: upright;
        //text-orientation: sideways-right;
        //text-orientation: sideways;
        //text-orientation: use-glyph-orientation;

        // &:first-child {
        //     top: 0;
        //     background-color: red;
        //     // transform-origin: left bottom;
        //     // transform:rotate(90deg);
        // }

        // &:last-child {
        //     bottom: 0;
        //     background-color: blue;
        //     // transform-origin: right bottom;
        //     // transform:rotate(90deg);
        // }
    }
}


</style>
