const fs = require('fs');
const path = require('path');
const combineRouters = require('koa-combine-routers');

const baseName = path.basename(module.filename);

const routes = fs
  .readdirSync(path.join(__dirname))
  .filter(file => (file.indexOf('.') !== 0) && (file !== baseName) && (file.slice(-3) === '.js'))
  .map(file => require(path.join(__dirname, file)));

const rootRouter = combineRouters(routes);

module.exports = rootRouter;
