const express = require('express')
const cluster = require('cluster')
const os = require('os')

const totalCpus = os.cpus().length
//const totalCpus = os.availableParallelism()

//console.log(totalCpus)
//console.log(cluster.isPrimary)

if(cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for(let i = 0; i < totalCpus; i++){
        cluster.fork()
    }

} else {

    const app = express()
    const PORT = 3000

    app.get('/', (req,res) => {
        return res.json({ message: `Hello from Express Server ${process.pid}` })
    })

    app.listen(PORT, () => {
        console.log(`Server is Running on http://localhost:${PORT}`)
    })

}


