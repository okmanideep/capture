# Capture

A web server to capture HTML that is posted to it.

### Install
`$ npm i`

### Start the server
`$ npm start`

Starts the server in port - 8282

### Usage
Use postman or similar tool to post HTML, CSS in body and provide selector as query parameter
```
POST http://localhost:8282/capture?selector=%23outer-container
...
```
