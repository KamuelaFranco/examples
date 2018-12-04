/**
 * Copyright (c) 2018 Oracle and/or its affiliates. All rights reserved.
 * This file is made available under version 3 of the GNU General Public License.
 */

fs = require('fs');

// Load the R module
var modelScript = fs.readFileSync(__dirname + "/model.r", "utf8");
Polyglot.eval("application/x-r", modelScript);

// Import the function exported from the R module
plotKMeans = Polyglot.import('plotkmeans');
plotCars = Polyglot.import('plotcars');
plotWeight = Polyglot.import('plotheightweight');
predictWeight = Polyglot.import('predictweight');

// Expressjs application:
var express = require('express');
var app = express();

app.get('/kmeans', function (req, res) {
    console.log('generating kmeans graph');
    res.send(plotKMeans(req.query.xaxis, req.query.yaxis, req.query.clusters));
});

app.get('/cars', function (req, res) {
    console.log('generating cars graph');
    res.send(plotCars(req.query.xaxis, req.query.yaxis, req.query.zaxis));
});

app.get('/lm', function (req, res) {
    console.log('generating height/weight plot');
    res.send(plotWeight());
});

app.get('/lm/predict', function (req, res) {
    console.log('predicting weight');
    res.send('' + predictWeight(parseInt(req.query.height, 10)));
});

app.use(express.static(__dirname + "/public"));
var port = 12837;
var server = app.listen(port, function() {
    console.log("Server listening on http://localhost:" + port);
});

app.get('/exit', function(req, res) {
    res.status(200).send('');
    server.close();
});
