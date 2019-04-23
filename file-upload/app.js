const express = require('express');
const experssFile = require('express-fileupload');

const app = express();

// Express file my tutorial :> 
app.use(experssFile());

// Serve images from 
app.use('/images', express.static('./images/'));

app.post('/upload', (req, res) => {
	// Check if any files are there 
	if (req.files) {
		// Handle file from upload
		let file = req.files.file;

		// Allowed mimetypes of uploaded file
		const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

		// Check file
		if (allowedTypes.includes(req.files.file.mimetype)) {
			// .mv() func moves file to new directory
			file.mv(__dirname + '/images/' + req.files.file.name, err => {
				if (err) console.log(err);
				res.send('File uploaded!');
			});
		} else {
			// Handle bad files
			res.send('Uploaded file must be jpg/jpeg/png!');
		}
	} else {
		// Handle if no files was sent
		res.send('Please select file to upload!');
	}
});

// Init APP
app.listen(3000, console.log('App started on port 3000!'));
