const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

const baseName = path.basename(module.filename);

fs
  .readdirSync(path.join(__dirname))
  .filter(file => (file.indexOf('.') !== 0) && (file !== baseName) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const route = require(path.join(__dirname, file));
    router.use(route.routes(), route.allowedMethods());
  });

module.exports = router;
