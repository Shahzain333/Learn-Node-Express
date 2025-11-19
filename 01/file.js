const fs = require('fs');
const os = require('os');

// ------------------ Write In the File ------------------

// Synchronously write "Hello World!" to a file named "test.txt"

//fs.writeFileSync('./test.txt', 'Hello World!')
//fs.writeFileSync('./test.txt', 'Hello World!!!!!')

// Asynchronously read the contents of "test.txt" and log it to the console

// fs.writeFile('./test.txt', 'Hello World!', (err) => {
//     if(err){
//         console.error('Error writing file:', err);
//     }
// });

// fs.writeFile('./test.txt', 'Hello World Async!', (err) => {
//     if(err){
//         console.error('Error writing file:', err);
//     }
// });

// ------------------ Read From the File ------------------

// Synchronously read the contents of "test.txt" and log it to the console

// const result = fs.readFileSync('./contact.txt', 'utf-8')
// console.log(result);

// Asynchronously read the contents of "test.txt" and log it to the console

// fs.readFile('./test.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.error('Error reading file:', err);   
//     } else {
//         console.log(data);
//     }
// });

// ------------------ Append In the File ------------------

// Synchronously append " This is appended text." to "test.txt"

//fs.appendFileSync('./test.txt', `${Date.now()} Shahzain khan \n`)
//fs.appendFileSync('./test.txt', new Date().getDate().toLocaleString())

// Asynchronously append " This is asynchronously appended text." to "test.txt"

// fs.appendFile('./test.txt', 'Shahzain khan \n', (err) => {
//     if(err){
//         console.error('Error appending file:', err);
//     }           
// });


// --------------- Copy the File ------------------

// Synchronously copy "test.txt" to "test_copy.txt"\

//fs.cpSync('./contact.txt', './copy.txt')

// ------------------ Delete the File ------------------

// Synchronously delete "test_copy.txt"

// fs.unlinkSync('./copy.txt')

// -------------- Status of the file ------------------

// Synchronously get the status of "test.txt" and log it to the console

//const result = fs.statSync('./test.txt')
// const result = fs.statSync('./test.txt').isFile()

// console.log(result)

// ------------- make Directory ------------------

// Synchronously create a directory named "new_folder"
//fs.mkdirSync('./new_folder')

// fs.mkdirSync('new_folder2/a/b', { recursive: true })


// ---------------- Blocking and Non-Blocking ------------------

// Blocking ------------------------------
// In this Thread Pool Size is byDefault is 4
// Max? - 8core cpu - 8 thread pool size depend on cpu size 

//console.log(os.cpus().length); // Give Cpu size

// console.log('Start Blocking');
// const result = fs .readFileSync('./contact.txt', 'utf-8')
// console.log(result);
// console.log('End Blocking');

// Non-Blocking ------------------------------

// console.log('Start Non-Blocking');
// fs.readFile('./contact.txt', 'utf-8', (err, data) => {
//     if(err){    
//         console.error('Error reading file:', err);
//     } else {
//         console.log(data);
//     }
// });
// console.log('End Non-Blocking');


