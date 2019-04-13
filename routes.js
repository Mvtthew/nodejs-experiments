const Item = require('./models/Item');

exports.allItems = (req, res) => {
    Item.find()
        .then(items => res.json(items))
};

exports.addItem = (req, res) => {
    const item = new Item({
        name: req.query.name
    });

    item.save();

    res.json({'message': 'Item created!'});
};