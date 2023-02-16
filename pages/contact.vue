<template>
	<div class="form-wrap space-y-8">
		<p>Lorem ipsum dolor sit amet, consetetur sadipscing</p>
		<form
			class="flex flex-col space-y-4"
            @submit.prevent="onSubmit"
		>
			<input
				type="text"
				placeholder="Your name"
                v-model="formData.name"
			/>
			<input
				type="text"
				placeholder="Your email"
                v-model="formData.email"
			/>
			<div class="textarea-wrap">
				<textarea
					name=""
					id=""
					placeholder="Your note"
                    v-model="formData.note"
				></textarea>
				<button
                    type="submit"
					class="send"
				>
					send
				</button>
			</div>
		</form>
        <p v-if="validation.isValid !== undefined" :class="validation.isValid ? 'success' : 'error'">
           {{ validation.isValid ? validation.message.success : validation.message.error }}
        </p>
		<div class="social flex space-x-6 items-center">
            <nuxt-link
				to="mailto:naaadz@gmail.com"
                title="Email"
				:external="true"
                target="_blank"
				><img
				src="@/assets/images/email.svg"
				alt=""
			/></nuxt-link>
			<nuxt-link
				to="https://www.linkedin.com/in/nadia-chu-5ab9814/"
                title="Linkedin"
				:external="true"
                target="_blank"
				><img
					src="@/assets/images/linkedin.svg"
					alt=""
			/></nuxt-link>

            <nuxt-link
				to="https://codepen.io/collection/jbMZxB"
                title="CodePen"
				:external="true"
                target="_blank"
				><img
					src="@/assets/images/codepen.svg"
					alt=""
			/></nuxt-link>

            <nuxt-link
				to="https://github.com/naaadz/"
                title="GitHub"
				:external="true"
                target="_blank"
				><img
					src="@/assets/images/github.svg"
					alt=""
			/></nuxt-link>

            <nuxt-link
				to="https://dribbble.com/naaadz"
                title="Dribbble"
				:external="true"
                target="_blank"
				><img
					src="@/assets/images/dribbble.svg"
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

const formData = reactive({
    name: '',
    email: '',
    note: '',
    time: null
})

const validation = reactive({
    isValid: undefined,
    message: {
        success: `It worked! Thanks :)`,
        error: `It didn't work :( Check the fields and try again.`
    }
})

const isEmailValid = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}

const resetForm = () => {
    for (const field in formData) {
        formData[field] = ''
    }
}

const isFormValid = () => {
    return Object.values(formData).every(field => field !== '') && isEmailValid(formData.email)
}

const storeData = async() => {
    //add a timeout here  to test the case where this takes a bit, to handle the bug of it showing invalid befor its showing valid
    formData.time = Date.now()
    await $fetch('/api/updateForm', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;'
        },
        body: formData
    }).then((x) => {
        validation.isValid = true
        console.log('success or failure', x)
    })




}

const onSubmit = (e) => {
    

    if (isFormValid()) {
        storeData()
    } else {
        validation.isValid = false
    }
}


</script>
