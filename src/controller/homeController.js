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
    const items = await models.getItems()
    let myCart = []
    if (req.cookies && req.cookies.myCart) {
        myCart = req.cookies.myCart
    }
    if (req.session.user) {
        if (req.cookies && req.cookies.myCart) {
            myCart.forEach(async item => {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size)
            })
            res.clearCookie('myCart')
        }
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
        req.session.logoutBack = req.originalUrl;
        res.render('index', { items, user: req.session.user, myCart: fullCartItems });
    } else {
        req.session.loginBack = req.originalUrl;
        res.render('index', { items, user: null, myCart: myCart });
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
        item = (await models.getItemById(itemId))[0];
    }

    let myCart = [];
    if (req.cookies && req.cookies.myCart) {
        myCart = req.cookies.myCart;
    }

    if (req.session.user) {
        if (req.cookies && req.cookies.myCart) {
            // Sử dụng for...of với await để đảm bảo thực thi tuần tự
            for (const item of myCart) {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size);
            }
            res.clearCookie('myCart');
        }

        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;

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

        req.session.logoutBack = req.originalUrl;
        res.render('product.ejs', { items, item, user: req.session.user, myCart: fullCartItems, itemId });
    } else {
        req.session.loginBack = req.originalUrl;
        res.render('product.ejs', { items, item, user: null, myCart: myCart, itemId });
    }
};


module.exports = {
    getHomepage, signupPage, productPage, addToFavorites
}