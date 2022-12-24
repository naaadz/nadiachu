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
			<img
				v-if="currentProject.mediaType === 'image'"
				class="frame"
				:src="currentProject.mediaPath"
				alt=""
			/>
            <Transition name="fade" mode="out-in">
                <video
                    v-if="currentProject.mediaType === 'video'"
                    :key="currentProject.id"
                    loop
                    muted
                    autoplay
                    playsinline
                    controls
                    class="frame"
                >
                    <source :src="currentProject.mediaPath" type="video/mp4" />
			    </video>
            </Transition>

		</div>
        <div class="flex gap-2">
            <a
                class="under active"
                href="#"
                @click="next()"
                >Next project</a
            >
            <Arrow @click="next()" />
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


definePageMeta({
	title: "Projects",
	heading: ["my", "projects"],
})

</script>
