<template>
	<div class="form-wrap space-y-8">
		<p>Lorem ipsum dolor sit amet, consetetur sadipscing</p>
        <form class="flex flex-col space-y-4" action="">
            <input type="text" placeholder="Your name">
            <input type="text" placeholder="Your contact">
            <div class="textarea-wrap">
                <textarea name="" id="" placeholder="Your note"></textarea>
                <button class="send" @click.prevent="">send</button>
            </div>
        </form>
        <div class="social flex space-x-6">
            <img src="@/assets/images/email.svg" alt="">
            <img src="@/assets/images/linkedin.svg" alt="">
            <img src="@/assets/images/github.svg" alt="">
        </div>
	</div>
</template>

<script setup>

definePageMeta({
  title: 'Contact',
  heading: [
    'contact', 'me'
  ]
})

</script>
