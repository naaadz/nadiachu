<template>
	<div class="form-wrap space-y-8">
		<p>Lorem ipsum dolor sit amet, consetetur sadipscing</p>
		<form
			class="flex flex-col space-y-4"
			action=""
		>
			<input
				type="text"
				placeholder="Your name"
			/>
			<input
				type="text"
				placeholder="Your contact"
			/>
			<div class="textarea-wrap">
				<textarea
					name=""
					id=""
					placeholder="Your note"
				></textarea>
				<button
					class="send"
					@click.prevent=""
				>
					send
				</button>
			</div>
		</form>
		<div class="social flex space-x-6">
			<img
				src="@/assets/images/email.svg"
				alt=""
			/>
			<nuxt-link
				to="https://www.linkedin.com/in/nadia-chu-5ab9814/"
				:external="true"
                target="_blank"
				><img
					src="@/assets/images/linkedin.svg"
					alt=""
			/></nuxt-link>
			<nuxt-link
				to="https://github.com/naaadz/"
				:external="true"
                target="_blank"
				><img
					src="@/assets/images/github.svg"
					alt=""
			/></nuxt-link>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	title: "Contact",
	heading: ["contact", "me"],
})
</script>
