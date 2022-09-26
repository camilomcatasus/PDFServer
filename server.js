//SET UP
const http = require('http');
const fs = require('fs');
const {ServerThing} = require( "./modules/ServerThing.js");
const {SessionManager} = require("./modules/SessionManager.js");
const {ParseBody} = require("./modules/BodyParser.js");
const config = require("./config.json");
let pdfServer = new ServerThing();
let pdfSessionManager = new SessionManager();
let adminUser = config.username;
let adminPass = config.password;
let fileNames = [];
let dirNames = [];
const pdfCors = {
    "Access-Control-Allow-Credentials": "true"
};

//
// LOAD DATA
//
function loadData()
{
    dirNames = fs.readdirSync("./data");
    for(let i = 0; i < dirNames.length; i++)
    {
        let tempFiles = fs.readdirSync("./data/" + dirNames[i] + "/files");
        fileNames.push(tempFiles);
    }
}
loadData();
//
// ROUTES
//
pdfServer.addRoute("GET", "/static/.+", (req,res,body)=>{
    console.log(req.url);
    serveFile(req, res, "./build");
});

pdfServer.addRoute("GET", "/data/.+", (req, res, body)=>{
    if(req.headers.hasOwnProperty("cookie") && req.headers.cookie.includes("sessionId"))
    {
        //TODO: properly parse this (Multiple cookies)
        let sessionId = req.headers.cookie.substring(10);
        if(pdfSessionManager.IsSession(sessionId))
        {
            serveFile(req,res,".");
        }
        else
        {
            res.writeHead(403);
            res.end();
        }
    }
});

pdfServer.addRoute("GET", "/data", (req,res,body)=>{
    if(req.headers.hasOwnProperty("cookie") && req.headers.cookie.includes("sessionId"))
    {
        //TODO: properly parse this (Multiple cookies)
        let sessionId = req.headers.cookie.substring(10);
        if(pdfSessionManager.IsSession(sessionId))
        {
            res.writeHead(200, {
                "Content-Type" : "application/json"
            });
            res.end(JSON.stringify({
                fileNames: fileNames,
                categories: dirNames
            }));
        }
        else
        {
            res.writeHead(403);
            res.end();
        }
    }
});

pdfServer.addRoute("POST", "/login", (req,res,body)=>{
    if(body != null
    && body.hasOwnProperty("username")
    && body.hasOwnProperty("password")){
        if(adminPass === body["password"]
        && adminUser === body["username"])
        {
            const hour = 3600000;
            let expiry = new Date(Date.now() + hour * config.expiryHours);
            //initiate session
            cookieValue = pdfSessionManager.StartSession({timeout:expiry});
            res.writeHead(202, {
                "Set-Cookie": `sessionId=${cookieValue}; Expires=${expiry.toGMTString()}; Secure`,
                "Content-Type": `text/html`,
                ...pdfCors
            });
            res.end();
        }
        else
        {
            res.writeHead(402);
            res.end();
        }
    }
    else
    {
        res.writeHead(400);
        res.end();
    }
});

pdfServer.addRoute("POST", "/update", (req, res, body)=>{
    if(req.headers.hasOwnProperty("cookie") && req.headers.cookie.includes("sessionId"))
    {
        //TODO: properly parse this (Multiple cookies)
        let sessionId = req.headers.cookie.substring(10);
        if(pdfSessionManager.IsSession(sessionId))
        {
            loadData();
        }
        else
        {
            res.writeHead(403);
            res.end();
        }
    }
});

pdfServer.setDefault(
    (req,res) => {
        var fileStream = fs.createReadStream("./build/index.html", "utf-8");
        res.writeHead(200, {"Content-Type" : "text/html"});
        fileStream.pipe(res);
    }
);
const server = http.createServer( (req, res) => {
    let data = [];
    req.on("data", (chunk) => {
        data.push(chunk);
    });
    req.on("end", ()=>{
        data = ParseBody(req, data);
        pdfServer.useRoute(req,res, data);
    });

});

server.listen(5000);






//Function used to serve static files, does basic input sanitization for path attacks
function serveFile(req, res, path) {
    var parsed = null;
    //TODO: improve input sanitization
    let sanitizor = /([\w]+\/)*[\w. ]+\.\w{2,4}/;
    let replaced = req.url.replace(/%20/g, " ");
    if(replaced.includes("..") || !sanitizor.test(replaced))
    {
        res.writeHead(404);
        res.end();
    }
    else
    {
        parsed = req.url.split('.');
        parsed = parsed[parsed.length-1].toLowerCase();
        const fileThings = {
            "css": "text/css",
            "jpg": "image/jpg",
            "jpeg": "image/jpeg",
            "png": "image/png",
            "js": "text/js",
            "json": "text/json",
            "ico": "image/ico",
            "svg": "image/svg+xml",
            "map": "application/json",
            "pdf": "application/pdf"
        }
        if(fileThings.hasOwnProperty(parsed) && fs.existsSync(path + replaced))
        {
            var fileStream = fs.createReadStream(path+replaced);
            res.writeHead(200, {"Content-Type" : fileThings[parsed]});
            fileStream.pipe(res);
        }
        else
        {
            res.writeHead(404);
            res.end();
        }
    }
}