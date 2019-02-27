const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.setHeader('Content-Type', 'text/html')
        res.write('<html><body><h1> HOME </h1><form action="/message" method="POST"><input type="text" name="message" /><button >Submit </button></form></body></html>')
        return res.end()
    }
    if(req.url === '/message' && req.method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk)
        })
        req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('message.txt',message)
        })
        res.writeHead(302,'Location','/')
        return res.end()
    }
})

server.listen(3000);