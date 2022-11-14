export default  defineEventHandler(async (event) => {
    //retire this because we dont want to serve this to the front end.
    // const config = useRuntimeConfig()
    // const schedule = await fetch(`https://api.sportradar.us/nhl/trial/v7/en/games/2022/REG/schedule.json?api_key=${config.sportRadarAPIkey}`)
    // const data = await schedule.json()
    // const boltsGamesAtHome = data.games.filter(game => game.home.id === '4417d3cb-0f24-11e2-8525-18a905767e44')

    // return boltsGamesAtHome

})