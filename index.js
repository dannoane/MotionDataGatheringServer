const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/motion', (req, res) => {

  console.log('[+] Request for motion data!');

  res.sendFile('./motionData.csv', { root: __dirname });
});

app.post('/motion', (req, res) => {

  console.log('[+] Received motion data!');

  let data = req.body;
  let parsedData = '';

  for (let m of data) {
    let {id, accelerometer, gyroscope, magnetometer, position, activity} = m;

    parsedData += `${accelerometer.x},${accelerometer.y},${accelerometer.z},${gyroscope.x},${gyroscope.y},${gyroscope.z},${magnetometer.x},${magnetometer.y},${magnetometer.z},${position.heading},${position.speed},${activity}\n`;
  }

  fs.appendFile('motionData.csv', parsedData, (err) => {
    if (err) {
      console.log('[-] Error when writing to file!');
    }
  });

  res.status(200).end();
});

app.listen(3000, () => console.log('[*] Started listening on port 3000!'));