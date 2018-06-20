import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const express = require('express')
      package_json = require('../package.json');
      controller = require('./controller.js');
      cors = require('cors');
      bootstrap = require('bootstrap');

      app = express();
      
      app.use(cors());

app.listen(3006, () => console.log('App listening on port 3006!'));