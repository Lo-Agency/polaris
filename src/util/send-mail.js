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
	const { email, workspaceId, workspaceName, userName, adminName } = req.body;

	mailgun()
		.messages()
		.send(
			{
				from: 'Polaris <notification@lo.agency>',
				to: `${email}`,
				subject: `polaris`,
				html: `<p>Hello, ${userName}</p><p>You have been invited to join the "${workspaceName}" by ${adminName}.  Please click the <a href='http://localhost:3000/${workspaceId}/invite'>link</a> to accept the invitation.</p><p>Thanks,</p><p>Polaris.</p>`,
			},
			(error) => {
				if (error) {
					console.log(error);
					res.status(500).send({ message: 'Error in sending email' });
				} else {
					res.send({ message: 'Email sent successfully' });
				}
			},
		);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`serve at http://localhost:${port}`);
});
