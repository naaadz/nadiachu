<template>
  <div class="flex flex-col h-full space-y-6 lg:space-y-reverse">
    <div class="project-nav flex items-center justify-between lg:justify-start gap-2">
      <div class="flex items-center gap-2 lg:order-2">
        <button class="fill" @click="playNext">Next project</button>
        <Icon @click="playNext" name="next" />
      </div>
      <div v-if="currentProject.project_url.url" class="flex gap-2 lg:order-1">
        <a class="fill" :href="currentProject.project_url.url" target="_blank">See it live</a>
        <span class="invisible lg:visible">|</span>
      </div>
    </div>

    <div class="scaled-content">
      <Loader v-show="!data.mediaLoaded" />
      <video
        class="frame"
        v-show="data.mediaLoaded"
        @loadeddata="onLoadedData"
        :key="currentProject.project_slug"
        loop
        muted
        autoplay
        playsinline
        controls
      >
        <source :src="currentProject.project_media.url" type="video/mp4" />
      </video>
    </div>

    <div class="project-desc space-y-6">
      <Transition>
        <prismic-rich-text
          class="prismic-rich-text space-y-4"
          :class="{truncate: shouldTruncate}"
          :field="currentProject.project_desc"
          :serializer="serializer"
        />
      </Transition>
      <p
        v-if="isMobile"
        class="flex items-center gap-2"
        @click="data.descExpanded = !data.descExpanded"
      >
        <a href="#" class="fill">Read {{ data.descExpanded ? 'less' : 'more' }} </a>
        <Icon @click="playNext" :name="data.descExpanded ? 'less' : 'more'" />
      </p>
      <div class="tags">
        <Tag v-for="tag in projectTags" :key="tag" :value="tag" />
      </div>
    </div>
  </div>
</template>

<script setup>
// Injectables
const projectsPage = inject('projectsPage');

// Composables
const {isMobile} = useScreensize();
const {serializer} = usePrismicSerializer();

// Local state
const data = reactive({
  mediaLoaded: false,
  descExpanded: false,
  currentProjectIndex: 0
});

// Computed properties
const currentProject = computed(() => projectsPage.data.project[data.currentProjectIndex]);
const projectTags = computed(() => currentProject.value.project_tags?.split(', '));

// Methods
const playNext = () => {
  data.mediaLoaded = false;
  if (data.currentProjectIndex < projectsPage.data.project.length - 1) {
    data.currentProjectIndex++;
  } else {
    data.currentProjectIndex = 0;
  }
};

const onLoadedData = () => {
  data.mediaLoaded = true;
};

const shouldTruncate = computed(() => {
  return !data.descExpanded && isMobile.value;
});

definePageMeta({
  title: 'Projects',
  heading: ['my', 'projects']
});

useHead({
  bodyAttrs: {
    class: computed(() => `project-${currentProject.value.project_slug}`)
  }
});

</script>
