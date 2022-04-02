const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');

dotenv.config();

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/email', (req, res) => {
    console.log(req.body);
  const { email, workspaceId} = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: 'helia <heliahnik77@gmail.com>',
        to: `${email}`,
        subject: `polaris`,
        text: `invited to ${workspaceId}`,
      },
      (error, body) => {
        if (error) {
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});