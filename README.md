# email-sender

## Overview

This application uses [Express.js](https://expressjs.com/) and [Nodemailer](https://nodemailer.com/about/)

## Install dependencies
`npm install`

Install Nodemon for development server  
`npm install -D nodemon`

## CORS config

Include the referrer in the whitelist array variable. These are the allowed address to use the API endpoint.
```
var whitelist = ['http://localhost:4000', 'http://127.0.0.1:4000', 'https://www.example.com']; //white list consumers
```

## Email Config

Look for these lines in the `server.js` file:  

**Gmail**  

`service` - The SMTP service you will use.  
`user` - Your email account address.  
`pass` - Your email account password.

```
service: 'gmail.com',
auth: {
	user: '<YOUR EMAIL>',
	pass: '<PASSWORD>'
}
```

**Custom Email Hosting**  

`host` - Your hosting's SMTP  
`port` - Default SMTP port

```
host: 'smtp.<your-host>',
port: 587,
auth: {
	user: '<YOUR EMAIL>',
	pass: '<PASSWORD>'
}
```

**Change the Recipient / Receiver**

```
to: '<RECIPIENT>'
```

## Run the server

Development:  
`npm run dev`

Production:  
`npm run start`