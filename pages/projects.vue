<template>
	<div
		class="flex flex-col h-full space-y-6"
	>
		<div class="project-content space-y-4">
            <div class="space-y-4" v-html="currentProject.desc"></div>
			<div class="tags">
                <span v-for="tag in currentProject.tags" :key="tag">{{ tag }}</span>
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
        <div class="flex gap-2">
            <a
                class="under active"
                href="#"
                @click="playNext"
                >Next project</a
            >
            <Arrow @click="playNext" />
        </div>
		<!-- <div class="flex space-x-4 justify-between">
			<a
				class="under active"
				href="#"
                @click="next()"
				>See this project</a
			>
            <div class="flex gap-2">
                <a
                    class="under active"
                    href="#"
                    @click="next()"
                    >Next project</a
                >
                <Arrow @click="next()" />
            </div>

		</div> -->
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
