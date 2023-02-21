<template>
	<div
		class="flex flex-col h-full space-y-6 lg:space-y-reverse"
	>

        <div class="project-nav flex items-center justify-between lg:justify-start gap-2">
            <div class="flex items-center gap-2 lg:order-2">
                <a
                    class="fill"
                    href="#"
                    @click="playNext"
                    >Next project</a
                >
                <Icon @click="playNext" name="next" />
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

        <div class="project-desc space-y-6">
            <Transition>
                <div class="space-y-4" :class="{ truncate : shouldTruncate }" v-html="currentProject.desc"></div>
            </Transition>
            <p v-if="isMobile" class="flex items-center gap-2" @click="data.descExpanded = !data.descExpanded">
                <a href="#" class="fill">Read {{ data.descExpanded ? 'less' : 'more' }} </a>
                <Icon @click="playNext" :name="data.descExpanded ? 'less' : 'more'" />
            </p>
            <div class="tags">
                <Tag v-for="tag in currentProject.tags" :key="tag" :value="tag" />
            </div>
        </div>
	</div>
</template>

<script setup>

const { currentProject, next } = useProjects()
const { isMobile } = useScreensize()

//there's an error in this component: commenting out the source element removes the error.
//maybe upgrading nuxt will fix it?

const data = reactive({
    mediaLoaded: false,
    descExpanded: false
})

const playNext = () => {
    data.mediaLoaded = false
    next()
}

const onLoadedData = () => {
    data.mediaLoaded = true
}

const shouldTruncate = computed(() => {
    return !data.descExpanded && isMobile.value
})

definePageMeta({
	title: "Projects",
	heading: ["my", "projects"],
})

</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
