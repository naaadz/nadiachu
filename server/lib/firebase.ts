// Import the functions you need from the SDKs you need
import { initializeApp } from '@firebase/app'
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const config = useRuntimeConfig()

const configKeys = {
    "apiKey": "",
    "authDomain": "",
    "projectId": "",
    "storageBucket": "",
    "messagingSenderId": "",
    "appId": ""
  }

const configValues = config.firebaseInfo.split(',')

//conceal the config details for repo
Object.keys(configKeys).forEach((key,i) => {
    configKeys[key] = configValues[i]
})

// Initialize Firebase
const app = initializeApp(configKeys)
export const firestoreDb = getFirestore(app)
