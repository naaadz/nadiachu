<template>
	<div class="space-y-16">
        <div class="space-y-10">
            <h2 class="default-light text-2xl">skills</h2>
            <div class="space-y-6">
                <h3 class="text-cornflower text-xl">front-end developer</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                <ul class="list-disc list-inside">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>sed do eiusmod tempor</li>
                </ul>
                <div class="tags">
                    <span>vanilla javascript</span>
                    <span>vue js</span>
                    <span>nuxt</span>
                    <span>jamstack</span>
                    <span>web animations api</span>
                    <span>gsap</span>
                    <span>css</span>
                    <span>scss</span>
                </div>
                <ul class="list-disc list-inside">
                    <li>Legacy ipsum dolor sit amet</li>
                    <li>sed do eiusmod tempor</li>
                </ul>
                <div class="tags">
                    <span>php</span>
                    <span>lamp</span>
                    <span>wordpress</span>
                    <span>jquery</span>
                    <span>knockout js</span>
                </div>
            </div>
            <div class="space-y-6">
                <h3 class="text-cornflower text-xl">user experience designer</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                <ul class="list-disc list-inside">
                    <li>Legacy ipsum dolor sit amet</li>
                    <li>sed do eiusmod tempor</li>
                    <li>Legacy ipsum dolor sit amet</li>
                    <li>sed do eiusmod tempor</li>
                </ul>
                    <div class="tags">
                    <span>adobe XD</span>
                    <span>adobe Illustrator</span>
                    <span>UX</span>
                    <span>UI</span>
                    <span>web design</span>
                        <span>product design</span>
                </div>
            </div>
        </div>
        <div class="space-y-10">
            <h2 class="default-light text-2xl">employment</h2>
            <div class="space-y-6" v-for="i in 5" :key="i">
                <div class="flex justify-between">
                    <h3 class="text-cornflower text-xl">SomeWhere</h3>
                    <span class="text-light-pink italic">2018 - present</span>
                </div>
                <ul class="list-disc list-inside">
                    <li>Legacy ipsum dolor sit amet ipsum dolor sit amet adipiscing elit, sed</li>
                    <li>sed do eiusmod tempor ipsum dolor sit amet adipiscing elit, sed</li>
                    <li>Legacy ipsum dolor sit amet ipsum dolor amet ipsum dolor sit</li>
                    <li>sed do eiusmod tempor eiusmod tempor ipsum ipsum dolor sit amet ipsum</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
	title: "Resume",
	heading: ["my", "resume"],
})
</script>
