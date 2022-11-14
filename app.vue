<template>
	<div class="main-bg">
        <div class="container mx-auto flex">
            <div class="bolts basis-1/2 p-10 text-default-light space-y-10">
                <h2 class="text-5xl">...Bolts win at home</h2>
                <table>
                    <thead>
                        <tr>
                            <!-- <th></th> -->
                            <th>Tampa Bay VS</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Home points</th>
                            <th>Away points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data.y" :key="row.id">
                            <!-- <td>{{ index }}</td> -->
                            <td>{{ row.away.name }}</td>
                            <td>{{ row.scheduled }}</td>
                            <td>{{ row.status }}</td>
                            <td>{{ row.home_points }}</td>
                            <td>{{ row.away_points }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="cfa basis-1/2 p-10 text-primary-red space-y-10">
                <h2 class="text-5xl">Get a free sando!</h2>
            </div>
        </div>
	</div>
</template>

<script setup>

const data = reactive({
    y: null
})

//swap this with my database call api here when its ready

//     await useFetch('/api/getBoltsSchedule').then((x) => {
//     x.data.value.forEach(game => {
//         //format the date
//         let thedate = new Date(game.scheduled)
//         game.scheduled = thedate.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
//     })
//     data.y = x.data
// })


</script>
