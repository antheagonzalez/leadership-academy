const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

mongoose.connect('mongodb://team:team@lacluster-shard-00-00-tevma.mongodb.net:27017,lacluster-shard-00-01-tevma.mongodb.net:27017,lacluster-shard-00-02-tevma.mongodb.net:27017/test?ssl=true&replicaSet=LACluster-shard-0&authSource=admin&retryWrites=true');

const laconnection = mongoose.model('mainData', {}, 'mainData');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(53000, () => console.log('Example app listening on port 53000!'));
