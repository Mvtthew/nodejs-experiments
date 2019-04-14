const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Kocham Cie!',
        from: req.query.from,
    });
});

app.listen(9000);