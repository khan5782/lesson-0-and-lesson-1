const http = require("http")
const url = require("url")
const fs = require("fs")
const hostName = "127.0.0.1"
const PORT = 8000

const app = http.createServer(handleRequest)

function handleRequest(req, res){
let URL = url.parse(req.url)
let params = url.parse(req.url, true).query

  if(URL.pathname === "/"){
    renderHTML(res, {
        "name": "world",
        ...params
    })
    console.log(URL)
  } else if(URL.pathname === "/dogs"){
    renderHTML(res, {
        "name": "dogs"
    })
  } else {
    renderText('Not Found', res, 404)
  }
}

function renderText(text, response, statusCode=200){
    response.statusCode = statusCode
    response.write(text)
    response.end()
}

function renderHTML(res, queryObj){
    
    fs.readFile("./index.html", 'utf8', (err, data) => {
      if(!err){
        //in data, replace {{firstName}} with queryObj.firstName
        Object.keys(queryObj).forEach(queryParam => {
        data = data.replace(`{{${queryParam}}}`, queryObj[queryParam])
        })
        renderText(data, res)
      } else {
        console.log("error reading file")
      }
    })
  }

app.listen(PORT, hostName, () => {
    console.log(`Server running at http://${hostName}:${PORT}/`)
  })
