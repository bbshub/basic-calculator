//import { express } from 'express';
// const express = require('express');
// const path = require('path');

import express from 'express';
import path from 'path';

const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/public', express.static('./public'));

app.listen(3000);
console.log('Listening on http://localhost:3000');