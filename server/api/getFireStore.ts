import {
    doc,
    setDoc
  } from "@firebase/firestore"
  import { firestoreDb } from "../lib/firebase"
  import schedule from 'node-schedule'

  const config = useRuntimeConfig()

  const getSportsStuff = async () => {
    const schedule = await fetch(`https://api.sportradar.us/nhl/trial/v7/en/games/2022/REG/schedule.json?api_key=${config.sportRadarAPIkey}`)
    return await schedule.json()
 }

 //TODO: change the name of this file to something more descriptive

schedule.scheduleJob('37 1 * * *', async () => { 
    //sec (opt), min, hr, day, month, yr

    // run everyday at 1:37am
    console.log('i ran at 1:37am')
    //get the latest sportsAPI
    await getSportsStuff().then((data) => {
        //filter the response to just Tampa bay home games
        const homeGames = data.games.filter(game => game.home.id === '4417d3cb-0f24-11e2-8525-18a905767e44')
        //put it into my database, serve that database data via my api
        setDoc(doc(firestoreDb, "games", "xmDwj8xMZ29yw0qt8Q5R"), { ...homeGames })
    }) 
})

export default defineEventHandler(async (event) => {
    //put my front-end api here that just gets the database stuff
})