const express = require('express')
const fs = require('fs')
const zlib = require('zlib')
const status = require('express-status-monitor')

const app = express()
const PORT = 3000

app.use(status())

// 400MB File -> 400MB (ZIP) -> 400MB Write 

// Stream Read (sample.txt) --> Zipper --> fs Write Sample.txt
// fs.createReadStream('./sample.txt').pipe(
//     zlib.createGzip().pipe(fs.createWriteStream('./sample.txt')
// ))

app.get('/', (req,res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8').pipe(
        zlib.createGzip().pipe(fs.createWriteStream('./sample.txt')
    ))
    stream.on('data', (chunk) => {
        return res.write(chunk)
    })
    stream.on('end', () => {
        return res.end()
    })
})

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`)
})