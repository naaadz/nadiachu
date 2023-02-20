<template>
	<div
		class="flex flex-col h-full space-y-6 lg:space-y-reverse"
	>

        <div class="project-nav flex items-center justify-between lg:justify-start gap-2">
            <div class="flex gap-2 lg:order-2">
                <a
                    class="fill"
                    href="#"
                    @click="playNext"
                    >Next project</a
                >
                <Arrow @click="playNext" />
            </div>
            <div v-if="currentProject.liveLink" class="flex gap-2 lg:order-1">
                <a class="fill" :href="currentProject.liveLink" target="_blank">See it live</a>
                <span class="invisible lg:visible">|</span> 
            </div>
        </div>

        <div class="scaled-content">
            <!-- <img
                v-if="currentProject.mediaType === 'image'"
                class="frame"
                :src="currentProject.mediaPath"
                alt=""
            /> -->
            <Loader v-show="!data.mediaLoaded" />
            <video
                class="frame"
                v-show="data.mediaLoaded"
                @loadeddata="onLoadedData"
                :key="currentProject.id"
                loop
                muted
                autoplay
                playsinline
                controls
            >
                <source :src="currentProject.mediaPath" type="video/mp4" />
            </video>
        </div>

        <div class="project-desc space-y-4">
            <div class="space-y-4" v-html="currentProject.desc"></div>
            <div class="tags">
                <Tag v-for="tag in currentProject.tags" :key="tag" :value="tag" />
            </div>
        </div>

	</div>
</template>

<script setup>

const { currentProject, next } = useProjects()

//there's an error in this component: commenting out the source element removes the error.
//maybe upgrading nuxt will fix it?

const data = reactive({
    mediaLoaded: false
})

const playNext = () => {
    data.mediaLoaded = false
    next()
}

const onLoadedData = () => {
    data.mediaLoaded = true
}

definePageMeta({
	title: "Projects",
	heading: ["my", "projects"],
})

</script>
