const app = require('./app'); // importing app.js

const http = require("http");


// testing server
app.get('/', (req, res) => {
    res.send("hello, express is running successfully.")
})


// assigning port
const port = process.env.PORT || 3000;
const server = http.createServer(app);
//const port = 3000;
server.listen(port, () => {
    console.log("server started at :",port);
})