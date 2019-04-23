const express = require('express');
const expressFile = require('express-fileupload');
const getColors = require('get-image-colors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(expressFile());

app.post('/upload', (req, res) => {
	const image = req.files.image;

	image.mv(path.join(__dirname, image.name), err => {
		if (err) console.error('File mv error!', err);

		getColors(path.join(__dirname, image.name)).then(colors => {
			// Map colors in them HEX values
			const cMap = colors.map(color => color.hex());

			// Send mapped colors
			res.send(cMap);

			// Unlink file, we dont need it anymore
			fs.unlink(path.join(__dirname, image.name), err => {
				if (err) console.log(err);
			});
		});
	});
});

app.listen(3000, console.log('App listening on port: 3000!'));
