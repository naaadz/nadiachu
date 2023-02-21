<template>
    <div class="space-y-8">
        
        <p>I'm <nuxt-link to="/contact" class="under">Nadia Chu</nuxt-link>, a front-end developer with a focus on creative and clean user experiences. I enjoy collaborating on design and layout concepts and building them even better.  <nuxt-link to="/contact" class="under">Contact</nuxt-link> me or check out some of my <nuxt-link to="/projects" class="under">projects</nuxt-link>. </p> 
        <div class="tags">
            <Tag value="VueJS" link="https://vuejs.org" />
            <Tag value="SVG animation" />
            <Tag value="Drum & bass" link="https://music.youtube.com/playlist?list=PLwQn_6xJ7nMc_X6YvFPm_BqwbuhYjPrk1&feature=share" title="Currently listening" />
            <Tag value="ENFJ" link="https://www.16personalities.com/enfj-personality" />
            <Tag value="Clean, semantic html" />
            <Tag value="Racquet sports" />
            <Tag value="UX design" link="https://dribbble.com/naaadz/likes" title="Liked shots" />
            <Tag value="Cold brew" />
            <Tag value="Nuxt 3" link="https://nuxt.com/" />
            <Tag value="Let's talk <3" link="/contact" />
            <Tag value="Food related travel" />
            <Tag value="Creative writing" />
            <Tag value="AI robots" link="https://www.midjourney.com/showcase/recent/" />
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'About',
    heading: ['about', 'me']
})

</script>