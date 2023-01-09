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
    //console.log(body)

    try {
        // await setDoc(doc(db, "forms", "6f8Rm6Un4oB47uwz3Sck"), body)
        // console.log('db updated')

        //const currentTime = Date.now().toString()
        const y = await addDoc(collection(db, 'forms'), body)
        //console.log('db updated', y)
        //don't return y tho.. it exposes config
        return y

    } catch(e) {
        console.log('e', e)
        return e
    }

})