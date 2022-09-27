# PDF SERVING SITE

This is a project created for the purpose of giving my friends and I the ability to access shared pdfs. It was inteded to be used with a private server.

## Code

This code was developed with the intention of utilizing very few dependencies. It uses vanilla React and vanilla nodeJS. In the future I hope to cut out React and never have to deal with node_modules ever again.

The server keeps track of sessions and deletes them after they have expired. The expiry date is specified in the config file.

## Set Up

A config file must be set up named config.json in the working directory. The file dictates the username and password used to create sessions on the server. As well as how long the server will keep the session active.

The server expects the build to be in a directory named build in the working directory.

Below demonstrates the how the server expects the files to be stored. It checks for subdirectories in the data folder. Each subdirectory is its own category, it will then check the files folder in each category. All of this data (file and directory names) is sent to the client, the client then uses this to ask for specific files. The files in the thumbnails folder must have the same name as its corresponding pdf to be displayed as a thumbnail to the client.
```
.
|-- data
|-- |-- research papers
|-- |-- |-- files
|-- |-- |-- |-- researchPaper.pdf
|-- |-- |-- thumbnails
|-- |-- |-- |-- researchPaper.jpg
|-- |-- music
|-- |-- |-- files
|-- |-- |-- |-- odetojoy.pdf
|-- |-- |-- thumbnails
|-- |-- |-- |-- odetojoy.jpg
```

## Build and Run

To build install the node modules for react (sigh).
In the console run `npm install` then run `npm run build`.
To start the server run `node Server.js` in the root directory.

## Demo
https://pdfviwer-363715.uc.r.appspot.com

empty username and password
