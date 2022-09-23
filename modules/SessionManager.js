class SessionManager {
    constructor(startSessionData=null, writeCallBack=null) {

        if(startSessionData==null)
            this.SessionData = {};
        else
            this.SessionData = startSessionData;
    }
    //Each session is an object added to session data with the key being the sessionId cookie
    //additional cookies that we need to keep track of will be stored underneath the sessionId in a cookies array
    //TODO: determine if we can't just have more objects (Downside would probably be space complexity)
    StartSession({sessionId=null, userData={ cookies : []}, timeout=null}) {
        if(sessionId === null)
            sessionId = GenerateSessionCookie(this.SessionData)
        this.SessionData[sessionId] = {
            ...userData,
            timeout: timeout
        };
        return sessionId;
    }

    AddCookie(sessionId, cookie, timeout=null) {
        if(!this.SessionData.hasOwnProperty(sessionId))
        {
            console.error("Server or Session not found when attempting to store cookie");
            return false;
        }
        this.SessionData[sessionId].cookies.push(cookie);
        //TODO timeout add timeout to individual cookies
        return true;
    }

    IsSession(sessionId) {
        let today = new Date().getTime();
        if(this.SessionData.hasOwnProperty(sessionId))
        {
            if(this.SessionData[sessionId].timeout - today > 0)
            {
                return true;
            }
            else
            {
                delete this.SessionData[sessionId];
            }
        }
        return false;
    }

    AreSessions(sessionIds) {
        let value = true;
        sessionIds.forEach(sessionId => {
            if(this.IsSession(sessionId))
                value = false;
        });
        return value;
    }
}



const validChars = "!#$%&'*+-.^_`|~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function GenerateSessionCookie(sessionCookies) {
    var randomCookieVal = "";
    for (let index = 0; index < 32; index++) {
        let randomChar = Math.floor(Math.random() * validChars.length)
        randomCookieVal += validChars[randomChar];
    }
    if(sessionCookies.hasOwnProperty(randomCookieVal))
    {
        return GenerateSessionCookie(sessionCookies);
    }
    return randomCookieVal;
}

exports.SessionManager = SessionManager;