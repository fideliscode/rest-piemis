const http = require('http');
const app = require('./app');
const dotenv =require('dotenv');
dotenv.config();
//bad practice figure way for env variable in a server production mode!
const port = process.env.PORT || 3000;

// console.log(port);
const server = http.createServer(app);
server.listen(port);
