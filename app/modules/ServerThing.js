class ServerThing {
    constructor() {
        this.routes = {
            "GET"     :[],
            "POST"    :[],
            "PUT"     :[],
            "DELETE"  :[],
            "TRACE"   :[],
            "OPTIONS" :[]
        };
        this.default = null;
    }

    setDefault(callBack)
    {
        this.default = callBack;
    }

    addRoute(method, path, callBack) {
        if(this.routes.hasOwnProperty(method))
        {
            this.routes[method].push({
                path: path,
                callBack: callBack
            });
        }
    }

    useRoute(req,res, body) {
        let routesObject = this.routes[req.method];
        for(let i = 0; i < routesObject.length; i++)
        {
            if(new RegExp(routesObject[i].path).test(req.url))
            {
                routesObject[i].callBack(req,res,body);
                return;
            }
        }
        if(req.method === "GET")
        {
            this.default(req,res);
        }
        else
        {
            res.writeHead(404);
            res.end();
        }
    }
}

exports.ServerThing = ServerThing;

