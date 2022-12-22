<template>
    <div class="flex flex-col h-full space-y-6" :class="`project-${getProject(0).name}`">

        <!-- 
            :set="(shape = getShape(0,setId,ssStore.selectedSites[0].id))"
            :set="(project = getProject(0))"
         -->

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
            <!-- <img class="" src="@/assets/images/sample.png" alt=""> -->
            <video loop muted autoplay playsinline class="frame">
                <!-- <source src="@/video/solutions-marker.mp4" type="video/mp4"> -->
                <source :src="getProject(0).mediaPath" type="video/mp4">
            </video>
        </div>

        <a class="under active" href="#">See this project live</a>
    </div>
</template>

<script setup>

const projects = useProjects()

definePageMeta({
  title: 'Projects',
  heading: ['my', 'projects']
})

const getProject = (id) => {
    return projects.find(project => project.id === id)
}

</script>
