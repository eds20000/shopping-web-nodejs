import modelCourse from '../models/course'

let addToCart = async (req, res) => {
    const userId = req.params.id;
    const { itemId, colorName, size } = req.body;
    console.log(userId, itemId, colorName, size);
    try {
        await modelCourse.addToCart(userId, itemId, colorName, size);
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

module.exports = {
    addToCart
}

