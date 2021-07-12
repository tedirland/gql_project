const express = require('express');

const dotenv = require('dotenv').config();

//express server
const app = express();

//rest endpoint
app.get('/rest', function (req, res) {
  res.json({
    data: 'you hit rest endpoint',
  });
});

//port

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
