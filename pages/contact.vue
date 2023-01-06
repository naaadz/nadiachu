<template>
	<div class="form-wrap space-y-8">
		<p>Lorem ipsum dolor sit amet, consetetur sadipscing</p>
		<form
			class="flex flex-col space-y-4"
			@submit="onSubmit"
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
        <p v-if="validation.submittedBefore" :class="validation.isValid ? 'success' : 'error'">
           {{ validation.isValid ? validation.message.success : validation.message.error }}
        </p>
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

const formData = reactive({
    name: '',
    email: '',
    note: ''
})

const validation = reactive({
    submittedBefore: false,
    isValid: false,
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

const onSubmit = (e) => {
    //do validation with form data
    e.preventDefault()
    validation.submittedBefore = true

    if (isFormValid()) {
        validation.isValid = true
        console.log('valid!', formData)
        //save the data
        //reset form
        resetForm()
    } else {
        validation.isValid = false
        console.log('not valid!', formData)
    }

    
}

</script>
