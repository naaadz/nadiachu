<template>
    <div class="test flex flex-col">
        <div class="w-1/2 space-y-4">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
        <div class="tags">
            <span>vanilla js</span>
            <span>native javascript animation</span>
            <span>scss</span>
        </div>
        </div>


      
        <div class="image-test">
            <!-- <img class="" src="@/assets/images/sample.png" alt=""> -->
            <video loop muted autoplay playsinline >
                <source src="@/assets/video/solutions-marker.mp4" type="video/mp4">
            </video>
        </div>
       

        <a href="#">Some link here</a>
    </div>
</template>

<script setup>

definePageMeta({
  title: 'Projects',
  heading: ['my', 'projects']
})

</script>

<style lang="scss">

    .test {
        height: 100vh;
        gap: 40px;
        padding: 5%;
        padding-top: 200px;
    }

    .heading-wrap {
        display: none;
    }

    .image-test {
        //background: gray;
        flex: 1 1 0;
        min-height: 0; //keep this here for shrink to work
    
        img {
           height: 100%; 
           width: auto;
        }

        video {
            height: 100%; 
            width: auto;
        }
    }



</style>
