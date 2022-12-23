import projects from "@/assets/json/projects.json"

const state = reactive({
	currentProject: projects[0]
})

export const useProjects = () => {

    const currentProject = computed(() => {
        return state.currentProject
    }) 
        
    const next = () => {

        let nextId = state.currentProject.id + 1

        if ((projects.length - 1) < nextId) {
            nextId = 0
        }

        console.log('nextId', nextId)

        state.currentProject = projects[nextId]

        console.log(state.currentProject.id)
    }

    return { currentProject, next }
}