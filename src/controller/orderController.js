import modelOrder from '../models/order.model'
import models from '../models/admin/adminPage.model'
import modelCourse from '../models/course'

let takeOrder = async (req, res) => {
    const { data, myCart, orderNumber } = req.body;
    const userId = req.session.user.user_id;
    const result = await modelOrder.takeOrder(data, myCart, orderNumber, userId);
    console.log(result);
}

let deleteOrder = async (req, res) => {
    const orderId = req.body.order_id;
    const result = await modelOrder.deleteOrder(orderId);
    return res.redirect(req.session.logoutBack);
}

let orderTracking = async (req, res) => {
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
        const orders = await modelCourse.getOrdersById(req.session.user.user_id);
        console.log(orders)
        const orderTracking = orders.find(order => order.order_id == req.params.orderId)
        req.session.logoutBack = req.originalUrl;
        if (!orderTracking) {
            return res.redirect('/user-order')
        }
        return res.render('user/order-tracking.ejs', { user: req.session.user, myCart: fullCartItems, orderTracking })
    }

    else {
        req.session.loginBack = req.originalUrl;
        return res.redirect('/login')
    }
}

export default { takeOrder, deleteOrder, orderTracking }
