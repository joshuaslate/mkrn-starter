const Koa = require('koa');
const mongoose = require('mongoose');
const logger = require('koa-logger');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
const routes = require('./routes');
const config = require('./config');
const IO = require('koa-socket');

// Make mongoose use native ES6 promises
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(config.database.url, config.database.opts);


const app = new Koa()
  .use(cors())
  .use(logger())
  .use(bodyParser())
  .use(routes.routes())
  .use(routes.allowedMethods());

//const io = new IO();

// io.attach(app);
//
//
// function sendTime() {
//   io.emit('time', { time: new Date().toJSON() });
// }

// Send current time every 10 secs
//setInterval(sendTime, 10000);

// Emit welcome message on connection
// io.on('connection', (socket) => {
//   // Use socket to communicate with this particular client only, sending it it's own id
//   socket.emit('welcome', { message: 'Welcome!', id: socket.id });
//
//   socket.on('i am client', console.log);
// });

const server = app.listen(config.server.port);

module.exports = server;
