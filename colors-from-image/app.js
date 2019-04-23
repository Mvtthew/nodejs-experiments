const express = require('express');
const expressFile = require('express-fileupload');
const getColors = require('get-image-colors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(expressFile());

app.post('/upload', (req, res) => {
	const image = req.files.image;

	image.mv(path.join(__dirname, '/images/', image.name), err => {
		if (err) console.error('File mv error!', err);

		getColors(path.join(__dirname, '/images/', image.name)).then(colors => {
			const cMap = colors.map(color => color.hex());
			console.log(cMap);

			// Unlink file
			fs.unlink(path.join(__dirname, '/images/', image.name), err => {
				if (err) console.log(err);
			});

			res.send('OK!');
		});
	});
});

app.listen(3000, console.log('App listening on port: 3000!'));
