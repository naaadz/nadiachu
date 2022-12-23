<template>
	<div
		class="flex flex-col h-full space-y-6"
	>
		<div class="w-1/2 space-y-4">
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
			<div class="tags">
				<span>vanilla js</span>
				<span>native javascript animation</span>
				<span>scss</span>
			</div>
		</div>

		<div class="scaled-content">
			<img
				v-if="currentProject.mediaType === 'image'"
				class="frame"
				:src="currentProject.mediaPath"
				alt=""
			/>
			<video
				v-if="currentProject.mediaType === 'video'"
				loop
				muted
				autoplay
				playsinline
				class="frame"
			>
				<source :src="currentProject.mediaPath" type="video/mp4" />
			</video>
		</div>
		<div class="flex space-x-4">
			<a
				class="under active"
				href="#"
				>See this project</a
			>
			<Arrow @click="next()" />
			<!-- <a class="under active" href="#">Next project</a>
            <Arrow /> -->
			<!-- <div class="flex gap-4">
               <Arrow direction="prev" />
               <Arrow />
            </div> -->
		</div>
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
