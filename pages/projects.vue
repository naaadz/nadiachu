<template>
    <div class="flex flex-col h-full space-y-6">
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
            <video loop muted autoplay playsinline>
                <source src="@/assets/video/solutions-marker.mp4" type="video/mp4">
            </video>
        </div>

        <a class="under active" href="#">See this project live</a>
    </div>
</template>

<script setup>

definePageMeta({
  title: 'Projects',
  heading: ['my', 'projects']
})

</script>
