<template>
  <div :class="`layout-${route.name === 'projects' ? 'full' : 'standard'}`">
    <div class="bg flex w-screen h-screen fixed overflow-hidden">
      <div class="first floral flex-none" ref="first"></div>
      <div class="second bg-default-dark" ref="second"></div>
      <div class="third" ref="third"></div>
    </div>

    <div
      class="bar-standard fixed h-screen flex flex-col justify-between top-0 overflow-hidden"
      ref="standard"
    >
      <div class="flex-col text-center">
        <STCLogo class="logo" @logoTL="onlogoTL" />
        <p class="blurb" ref="blurb">
          A portfolio site by <nuxt-link to="/contact" class="under active">Nadia Chu</nuxt-link>
        </p>
      </div>

      <nav class="flex justify-center gap-4 m-10" ref="standardnav">
        <nuxt-link
          v-for="page in pages"
          :key="page.name"
          :class="{active: route.name === page.name}"
          :to="page.route"
          >{{ page.label }}
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
          v-for="page in pages"
          :key="page.name"
          class="fill"
          :class="{active: route.name === page.name}"
          :to="page.route"
          >{{ page.label }}
        </nuxt-link>
      </nav>
    </div>

    <div class="page-wrap" ref="pageWrap">
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
import gsap from 'gsap';

const route = useRoute();
const router = useRouter();

const pages = inject('pages')

const first = ref(null);
const second = ref(null);
const third = ref(null);
const blurb = ref(null);
const thepage = ref(null);
const standard = ref(null);
const standardnav = ref(null);
const fullnav = ref(null);
const heading = ref(null);
const branch = ref(null);
const pageWrap = ref(null);

let logoTL, flowerTL;

const masterTL = gsap.timeline({paused: true});
const fullTL = gsap.timeline({paused: true});
const revealPageTL = gsap.timeline({paused: true});
const revealHeading = gsap.timeline({paused: true});
const revealFirst = gsap.timeline({paused: true});
const revealBlurb = gsap.timeline({paused: true});
const revealNav = gsap.timeline({paused: true});

const onFlowerTL = (payload) => {
  flowerTL = payload;
};

const onlogoTL = (payload) => {
  logoTL = payload;
};

const defineTimelines = () => {
  fullTL
    .to('.bar-full nav:last-child > *', {opacity: 1, stagger: 0.1})
    .to('.bar-full nav:first-child > *', {opacity: 1, stagger: 0.1}, '>-50%')
    .add(flowerTL.play(), '>-50%');

  revealPageTL.to(thepage.value, {opacity: 1});

  revealHeading
    .to(branch.value, {width: '400px', ease: 'power4.in'})
    .to(heading.value, {opacity: 1});

  revealFirst
    .from(first.value, {x: '-100%'})
    .from(second.value, {y: '-100%', ease: 'power4.in'}, '<-70%')
    .from(third.value, {y: '100%', ease: 'power4.in'}, '<');

  revealBlurb.to(blurb.value, {duration: 1, opacity: 1});

  revealNav.to(standardnav.value.children, {opacity: 1, stagger: 0.05});
};

const afterGuard = router.afterEach(() => {
  pageWrap.value.scrollTo({top: 0});
});

const beforeGuard = router.beforeEach((to, from, next) => {
  if (from.name !== to.name) {
    masterTL.clear();

    masterTL.add(revealHeading.timeScale(2).reverse(), '<').add(revealPageTL.reverse(), '<');

    masterTL.add(() => {
      return new Promise((res) => {
        next();
        res();
      });
    });

    masterTL.then(() => {
      if (to.name === 'projects') {
        //reverse the standard view
        masterTL
          .add(logoTL.timeScale(5).reverse())
          .add(revealFirst.reverse(), '<')
          .add(revealBlurb.reverse(), '<-50%')
          .add(revealNav.reverse(), '<')
          .add(fullTL.timeScale(1).play(), '<')
          .add(revealHeading.timeScale(1).play(), '>-80%')
          .add(revealPageTL.play(), '>');
      } else if (from.name === 'projects') {
        masterTL
          .add(fullTL.timeScale(3).reverse())
          .add(revealFirst.play(), '<')
          .add(() => {
            logoTL.progress(1).pause();
          }, '>-50%')
          .add(revealNav.play(), '<')
          .add(revealBlurb.play(), '<')
          .add(revealHeading.timeScale(1).play(), '>-80%')
          .add(revealPageTL.play(), '>');
      } else {
        masterTL.add(revealHeading.timeScale(1).play(), '>-50%').add(revealPageTL.play(), '>-50%');
      }
    });
  }
});

onMounted(() => {
  defineTimelines();

  if (route.name === 'projects') {
    masterTL.add(fullTL.play()).add(revealHeading.play(), '>-80%').add(revealPageTL.play(), '>');
  } else {
    masterTL
      .add(revealFirst.play())
      .add(logoTL.timeScale(1).play(), '<')
      .add(revealHeading.play(), '>-30%')
      .add(revealPageTL.play(), '>')
      .add(revealBlurb.play(), '>')
      .add(revealNav.play(), '<');
  }

  masterTL.play();
});

onUnmounted(() => {
  beforeGuard();
  afterGuard();
});
</script>
