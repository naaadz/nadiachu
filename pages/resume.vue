<template>
    <div class="space-y-20">
        <div v-for="employer in employers" class="employer space-y-8">
            <div class="title flex gap-3 items-center">
                <h2 class="text-2xl">{{ employer.employerName }}</h2>
                <span class="desc text-cornflower/50">// {{ employer.desc }}</span>
            </div>
            
            <div v-for="position in employer.position" class="job space-y-6">
                <div class="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
                    <h3 class="text-cornflower text-xl">{{ position.title }}</h3>
                    <span class="text-light-pink italic">{{ position.date }}</span>
                </div>
                <p>{{ position.blurb }}</p>
                <ul class="list-disc px-4 space-y-2">
                    <li v-for="item in position.list">{{ item }}</li>
                </ul>
                <div class="tags">
                    <span v-for="tag in position.tags">{{ tag }}</span>
                </div>
            </div>
        </div>
        <Alert icon="download">
            <a href="#" class="active under">Download my resume</a>
        </Alert>
    </div>
</template>

<script setup>
import employers from '@/assets/json/resume.json'

definePageMeta({
	title: "Resume",
	heading: ["my", "resume"],
})
</script>
