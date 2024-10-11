import modelOrder from '../models/order.model'

let takeOrder = async (req, res) => {
    const { data, myCart, orderNumber } = req.body;
    const userId = req.session.user.user_id;
    const result = await modelOrder.takeOrder(data, myCart, orderNumber, userId);
    console.log(result);
}

export default { takeOrder }
