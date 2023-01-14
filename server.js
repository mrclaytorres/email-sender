// Mailer server
const express = require('express');
var cors = require('cors')
const app = express();

var whitelist = ['http://localhost:4000', 'http://127.0.0.1:4000', 'https://www.example.com']; //white list consumers

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json())

app.options('*', cors())

app.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.send('Hello Finance Strategists. This is your mail server app!!')
});

app.post('/', cors(corsOptionsDelegate), (req, res) => {
  console.log(req.body)

  const transporter = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
      user: '<YOUR EMAIL>',
      pass: '<PASSWORD>'
    },
  });

  // If you want to use a custom email provider instead of Gmail
  // Uncomment the lines below and comment the Gmail part
  // const transporter = nodemailer.createTransport({
  //   host: 'smtp.<your-host>',
  //   port: 587,
  //   auth: {
  //     user: '<YOUR EMAIL>',
  //     pass: '<PASSWORD>'
  //   },
  // });

  const mailOptions = {
    from: req.body.email,
    to: '<RECIPIENT>',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  })

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});