import { initializeApp } from 'firebase/app'
import { getFirestore, doc, collection, setDoc, addDoc } from 'firebase/firestore/lite'

const config = useRuntimeConfig()

const configKeys = {
    "apiKey": "",
    "authDomain": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": "",
    "measurementId": ""
}

const configValues = config.firebaseInfo.split(',')

Object.keys(configKeys).forEach((key,i) => {
    configKeys[key] = configValues[i]
})

const app = initializeApp(configKeys)
const db = getFirestore(app)

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    try {
        let result = await addDoc(collection(db, 'forms'), body)
        return result.id 

    } catch(e) {
        //i can't figure out how to test this error.
        //console.log('e', e)
        return e
    }

})