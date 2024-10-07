<template>
    <div class="space-y-8">
        <prismic-rich-text class="prismic-rich-text" :field="aboutPage.data.about_me_blurb" :serializer="serializer"/>
        <div class="tags">
            <Tag v-for="(tag, index) in aboutPage.data.about_me_tags" :key="index" :value="tag.tag_link.text" >
                <BaseLink v-if="hasLink(tag)" :linkData="tag.tag_link" />
            </Tag>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'About',
    heading: ['about', 'me']
})

// Injectables
const aboutPage = inject('aboutPage')

// Composables
const { serializer } = usePrismicSerializer()

// Methods
const hasLink = (tag) => tag.tag_link.link_type === 'Web' || tag.tag_link.link_type === 'Document'

</script>