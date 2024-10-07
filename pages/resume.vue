<template>
    <div class="space-y-20">
        <div v-for="employer in employers" class="employer space-y-8">
            <div class="title flex gap-3 items-center">
                <h2 class="text-2xl">{{ employer.employerName }}</h2>
                <span v-if="!isMobile" class="desc text-cornflower/50">// {{ employer.desc }}</span>
            </div>
            
            <div v-for="position in employer.position" class="job space-y-6">
                <div class="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
                    <h3 class="text-cornflower text-xl">{{ position.title }}</h3>
                    <span class="text-light-pink italic">{{ position.dates }}</span>
                </div>
                <prismic-rich-text class="prismic-rich-text space-y-4" :field="position.blurb" :serializer="serializer"/>
                <div class="tags">
                    <Tag v-for="tag in position.tags" :key="tag" :value="tag" />
                </div>
            </div>
        </div>
        <Alert icon="download">
            <BaseLink :linkData="resumePage.data.resume_download_link" class="active under">Download my resume</BaseLink>
        </Alert>
    </div>
</template>

<script setup>
const {isMobile} = useScreensize();
const { serializer } = usePrismicSerializer()

// Injectables
const resumePage = inject('resumePage')

const employers = resumePage.data.slices.map(employer => {
    return {
        employerName: employer.primary.employer_name,
        desc: employer.primary.employer_about,
        position: employer.primary.position.map(position => {
            return {
                title: position.position_name,
                dates: position.position_dates,
                blurb: position.position_blurb,
                tags: position.position_tags.split(',').map(tag => tag.trim()),
            }
        })
    }
})

definePageMeta({
	title: "Resume",
	heading: ["my", "resume"],
})
</script>
