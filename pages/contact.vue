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

        <Alert v-if="validation.isValid !== undefined" :type="`${validation.isValid ? 'success' : 'danger'}`">
            {{ validation.isValid ? validation.message.success : validation.message.error }}
        </Alert>

		<div class="social flex space-x-6 items-center">
            <nuxt-link
                v-for="item in socials"
				:to="item.link"
                :title="item.title"
				:external="true"
                target="_blank"
				>
                <Icon :name="item.name" />
            </nuxt-link>
		</div>
	</div>
</template>

<script setup>

definePageMeta({
	title: "Contact",
	heading: ["contact", "me"],
})

const socials = [
    { name: 'email', link: 'mailto:naaadz@gmail.com', title: 'Email' },
    { name: 'linkedin', link: 'https://www.linkedin.com/in/nadia-chu-5ab9814/', title: 'Linkedin' },
    { name: 'codepen', link: 'https://codepen.io/collection/jbMZxB', title: 'CodePen' },
    { name: 'github', link: 'https://github.com/naaadz/', title: 'GitHub' },
    { name: 'dribbble', link: 'https://dribbble.com/naaadz', title: 'Dribbble' }  
]

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
    formData.time = Date.now()
    await $fetch('/api/updateForm', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;'
        },
        body: formData
    }).then((x) => {
        validation.isValid = true
        console.log('sent to db', x)
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
