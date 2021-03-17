const http = require("http")

const hostName = "127.0.0.1"

const PORT = 8000


const app = http.createServer(handleRequest)


function handleRequest(req, res){
    res.statusCode = 200
    // console.log(req.query)
    res.write("Hello World")
    res.end()
}


app.listen(PORT, hostName, () => {
    console.log(`Server running at http://${hostName}:${PORT}/`)
  })

