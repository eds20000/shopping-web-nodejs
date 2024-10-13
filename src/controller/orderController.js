import modelOrder from '../models/order.model'

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

export default { takeOrder, deleteOrder }
