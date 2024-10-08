import modelCourse from '../models/course'
import models from '../models/admin/adminPage.model'

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

let getCartPage = async (req, res) => {
    const items = await models.getItems();
    const myCart = JSON.parse(req.body.myCart);
    if (req.session.user) {
        // Fetch favorItems for the user
        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;


        // Find the full item details for each cart item
        const fullCartItems = cartItems.map(cartItem => {
            const fullItem = items.find(item => item.id === cartItem.item_id);
            if (fullItem) {
                return {
                    id: fullItem.id,
                    name: fullItem.name,
                    brand: fullItem.brand,
                    category: fullItem.category,
                    price: fullItem.price,
                    color: fullItem.color_img.find(color => color.id === cartItem.color_id)?.color_name || '',
                    colorId: fullItem.color_img.find(color => color.id === cartItem.color_id)?.id || '',
                    size: cartItem.size,
                    img: fullItem.color_img.find(color => color.id === cartItem.color_id)?.img || '',
                    quantity: cartItem.quantity
                };
            }
            return null;
        }).filter(item => item !== null);
        res.render('cart.ejs', { items, user: req.session.user, cartItems: fullCartItems, myCart: myCart });
    } else {
        res.render('cart.ejs', { items, user: null, cartItems: [], myCart: myCart });
    }
}

let removeFromCart = async (req, res) => {
    const { userId, itemId, colorId, size } = req.body;
    try {
        await modelCourse.removeFromCart(userId, itemId, colorId, size);
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

let decreaseQuantityItemCart = async (req, res) => {
    const { userId, itemId, colorId, size } = req.body;
    try {
        await modelCourse.decreaseQuantityItemCart(userId, itemId, colorId, size);
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

let increaseQuantityItemCart = async (req, res) => {
    const { userId, itemId, colorId, size } = req.body;
    try {
        await modelCourse.increaseQuantityItemCart(userId, itemId, colorId, size);
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

module.exports = {
    addToCart,
    getCartPage,
    removeFromCart,
    decreaseQuantityItemCart,
    increaseQuantityItemCart
}

