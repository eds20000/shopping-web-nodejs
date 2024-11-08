import modelCourse from '../models/course'
import models from '../models/admin/adminPage.model'
import modelReview from '../models/review.model'


let getCategoryPage = async (req, res) => {
    const items = await models.getItems()
    let myCart = []

    const category = req.params.category
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
        res.render('category', { items, user: req.session.user, myCart: fullCartItems, category });
    } else {
        req.session.loginBack = req.originalUrl;
        res.render('category', { items, user: null, myCart: myCart, category });
    }

}

module.exports = {
    getCategoryPage
}