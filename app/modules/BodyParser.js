

function ParseBody(req, body, mode=0)
{
    if(req.headers.hasOwnProperty("content-type"))
    {
        switch(req.headers["content-type"])
        {
            case "application/json": {
                let stringBody = Buffer.concat(body).toString();
                try {
                    return JSON.parse(stringBody);
                }
                catch (e) {
                    console.error("JSON Data could not be parsed");
                    return null;
                }
            }
            default: {
                return null;
            }
        }
    }
    return null;
}

exports.ParseBody = ParseBody;