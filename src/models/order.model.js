import pool from '../configs/connectDB';

let takeOrder = async (data, myCart, orderNumber, userId) => {
    let shipAddress = '〒' + data['adress-zip-code'] + '  ' + data['adress-prefecture'] + data['adress-city'] + data['adress-add'] + data['adress-building']
    let userName = data['adress-name']
    let userPhone = data['adress-phone']
    let paymentMethod = data['payment']
    let totalPrice = myCart.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
    try {
        const [rows] = await pool.execute(`
            INSERT INTO orders (
            user_id, order_username, order_userphone, order_date, status, total_amount,shipping_address,payment_method,payment_status,shipping_fee,order_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `, [userId, userName, userPhone, new Date(), 'pending', totalPrice, shipAddress, paymentMethod, 'paid', 0, orderNumber])
        for (let i = 0; i < myCart.length; i++) {
            await pool.query(`
                INSERT INTO order_details (
                order_id, item_id,item_name, quantity, price,size, color, colorId, brand, category, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `, [rows.insertId, myCart[i].id, myCart[i].name, myCart[i].quantity, myCart[i].price, myCart[i].size, myCart[i].color, myCart[i].colorId, myCart[i].brand, myCart[i].category, JSON.stringify(myCart[i].img)])
        }
        await pool.query(`
            DELETE FROM cart 
            WHERE user_id = ?`,
            [userId])
    }
    catch (error) {
        console.log(error);
    }
}
// let takeOrder = async (data, myCart, orderNumber, userId) => {
//     let shipAddress = '〒' + data['adress-zip-code'] + '  ' + data['adress-prefecture'] + data['adress-city'] + data['adress-add'] + data['adress-building'];
//     let userName = data['adress-name'];
//     let userPhone = data['adress-phone'];
//     let paymentMethod = data['payment'];
//     let totalPrice = myCart.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity, 0);
    
//     try {
//         const [rows] = await pool.execute(`
//             INSERT INTO orders (
//                 user_id, order_username, order_userphone, order_date, status, total_amount, shipping_address, payment_method, payment_status, shipping_fee, order_number
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//         `, [userId, userName, userPhone, new Date(), 'pending', totalPrice, shipAddress, paymentMethod, 'paid', 0, orderNumber]);
        
//         const orderDetailsValues = myCart.map(item => [
//             rows.insertId,
//             item.id,
//             item.name || 'Unknown',
//             item.quantity || 1,
//             item.price || 0,
//             item.size || 'Unknown',
//             item.color || 'Unknown',
//             item.colorId || 0,
//             item.brand || 'Unknown',
//             item.category || 'Miscellaneous',
//             JSON.stringify(item.img || {}),
//         ]);
        
//         await pool.query(`
//             INSERT INTO order_details (
//                 order_id, item_id, item_name, quantity, price, size, color, colorId, brand, category, img
//             ) VALUES ?;
//         `, [orderDetailsValues]);
        
//         await pool.query(`DELETE FROM cart WHERE user_id = ?`, [userId]);
//     } catch (error) {
//         console.error("Error processing order:", error.message);
//         console.error("Error details:", error.stack);
//     }
// };


let deleteOrder = async (orderId) => {
    try {
        await pool.query(`DELETE FROM orders WHERE order_id = ?`, [orderId])
    } catch (error) {
        console.log(error);
    }
}

let editOrder = async (orderId, shipping_method, delivery_time, status) => {
    try {
        await pool.query(`UPDATE orders SET shipping_method = ?, delivery_time = ?, status = ? WHERE order_id = ?`, [shipping_method, delivery_time, status, orderId])
    } catch (error) {
        console.log(error);
    }
}

module.exports = { takeOrder, deleteOrder, editOrder }

