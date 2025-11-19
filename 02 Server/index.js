const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req,res) => {

    //console.log(`New Request Received`);
    //console.log(req)
    //console.log(req.headers)
    // res.end('Hello from my server Again!');

    if(req.url === '/favicon.ico'){
        res.end();
        return;
    }
    
    // ---------------- Create Log =-----------------
    
    // const logData = `${Date.now()} : ${req.url} New Request Received \n`
    const logData = `${Date.now()} : ${req.method} : ${req.url} New Request Received \n`

    // fs.appendFile('log.txt', logData, (err,data) => {
    //     if(err) console.log(err);
    //     res.end('Hello from my server Again!');
    // })

    // const myUrl = url.parse(req.url);
    const myUrl = url.parse(req.url, true);
    
    //console.log(myUrl);

    fs.appendFile('log.txt', logData, (err,data) => {
        
        // switch(req.url){
        //     case '/':
        //         res.end('Hello from my server Home Page!');
        //         break;
        //     case '/about':
        //         res.end('Hello from my server About Page!');
        //         break;
        //     default:
        //         res.end('Hello from my server 404 Page!');
        //         break;
        // }

        // switch(myUrl.pathname){
        //     case '/':
        //         res.end('Hello from my server Home Page!');
        //         break;
        //     case '/about':
        //         const userName = myUrl.query.myname;
        //         res.end(`Hi ${userName} from my server About Page!`);
        //         //res.end('Hello from my server About Page!');
        //         break;
        //     case '/search':
        //         const searchTerm = myUrl.query.search_query;
        //         res.end(`You searched for ${searchTerm}`);
        //         break;  
        //     default:
        //         res.end('Hello from my server 404 Page!');
        //         break;
        // }

        switch(myUrl.pathname){
            case '/':
                if(req.method === 'GET') res.end('Hello from my server Home Page - GET!');
                break;
            case '/about':
                const userName = myUrl.query.myname;
                res.end(`Hi ${userName} from my server About Page!`);
                //res.end('Hello from my server About Page!');
                break;
            case '/search':
                const searchTerm = myUrl.query.search_query;
                res.end(`You searched for ${searchTerm}`);
                break;  
            case '/signup':
                if(req.method === 'GET') res.end('This is Signup Form - GET');
                else if(req.method === 'POST') {
                    // DB Query to save the form data
                    res.end('Form Submitted Successfully - POST');
                }
                break;
            default:
                res.end('Hello from my server 404 Page!');
                break;
        }

    })

});

myServer.listen(8000, () => console.log('Server Started!'))











