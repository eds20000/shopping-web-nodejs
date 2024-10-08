import models from '../models/admin/adminPage.model'
import modelCourse from '../models/course'

let addToFavorites = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.session.user.user_id;

    try {
        await modelCourse.addToFavorites(userId, itemId);

        if (req.session.user) {
            req.session.user.favorItems = await modelCourse.getFavoriteItems(userId);
            const favorCount = req.session.user.favorItems.length;
            req.session.save();
            return res.json({ success: true, favorCount });
        }
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

let getHomepage = async (req, res) => {
    const items = await models.getItems();

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

        res.render('index', { items, user: req.session.user, cartItems: fullCartItems });
    } else {
        res.render('index', { items, user: null, cartItems: [] });
    }
}
let signupPage = async (req, res) => {
    return res.render('signup.ejs')
}
let productPage = async (req, res) => {
    const items = await models.getItems();
    const itemId = req.params.id;
    let item;
    if (itemId) {
        item = (await models.getItemById(itemId))[0]
    }
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
        res.render('product.ejs', { items, item, user: req.session.user, cartItems: fullCartItems, itemId });
    } else {
        res.render('product.ejs', { items, item, user: null, cartItems: null, itemId });
    }
}



module.exports = {
    getHomepage, signupPage, productPage, addToFavorites
}