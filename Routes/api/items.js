const express = require('express')
const router = express.Router();
const auth = require('../../Middleware/auth')

//Item Model
const Item = require('../../Models/Items')
console.log(Item)

// @route Get api/items
router.get('/', async (req, res) => {
    const result = await Item.find()
        .sort({ date: -1 })
    res.json(result)
})

// @route POST  api/items
// Private
router.post('/', auth, (req, res) => {
    const newItem = new Item(req.body);
    newItem.save()
    res.json(newItem)
})

// @route delete  api/items
// Private
router.delete('/:id', auth, (req, res) => {
    console.log(req.params.id)
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;

