import pool from '../configs/connectDB';

let resetUserSession = async (req) => {
    try {
        if (!req.session.user) {
            console.log('User session not found');
        }

        const userId = req.session.user.user_id;
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE user_id = ?',
            [userId]
        );
        if (rows.length > 0) {
            let user = rows[0];
            req.session.user = user;
            const favorItems = await modelCourse.getFavoriteItems(user.user_id);
            req.session.user.favorItems = favorItems;
        }
    } catch (error) {
        console.error('Error in resetUserSession:', error);
    }
};

let getFavoriteItems = async (itemId) => {
    try {
        const [rows] = await pool.query(`
            SELECT * FROM favorite_items WHERE user_id = ? 
            `, [itemId])
        return rows
    }
    catch (error) {
        return []
    }
}
let getFavoriteItemList = async (userId) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM items WHERE id = SOME(SELECT item_id FROM favorite_items WHERE user_id = ? )`, [userId])
        return rows
    } catch (error) {
        return []
    }
}

let addToFavorites = async (userId, itemId) => {
    try {
        const [existingFavorite] = await pool.query('SELECT * FROM favorite_items WHERE user_id = ? AND item_id = ?', [userId, itemId]);

        if (existingFavorite.length === 0) {
            await pool.query('INSERT INTO favorite_items (user_id, item_id) VALUES (?, ?)', [userId, itemId]);
            return { added: true };
        } else {
            await pool.query('DELETE FROM favorite_items WHERE user_id = ? AND item_id = ?', [userId, itemId]);
            return { added: false };
        }
    } catch (error) {
        console.error('Error in addToFavorites:', error);
        throw error;
    }
}
let getFavoriteItemIds = async (userId) => {
    try {
        const [rows] = await pool.query(`SELECT item_id FROM favorite_items WHERE user_id = ?`, [userId]);
        // Extract the item_id from rows and return it as an array
        return rows.map(row => row.item_id);
    } catch (error) {
        console.error('Error fetching favorite items:', error);
        return [];
    }
};
let removeFromFavorites = async (userId, itemId) => {
    try {
        await pool.query('DELETE FROM favorite_items WHERE user_id = ? AND item_id = ?', [userId, itemId]);
    } catch (error) {
        console.error('Error removing from favorites:', error);
        throw error;
    }
};

let addToCart = async (userId, itemId, colorId, size) => {
    try {
        const [cartItemExist] = await pool.query('SELECT * FROM cart WHERE user_id = ? AND item_id = ? AND color_id = ? AND size = ?', [userId, itemId, colorId, size]);

        if (cartItemExist.length > 0) {
            await pool.query('UPDATE cart SET quantity = quantity + 1, add_time= NOW()  WHERE user_id = ? AND item_id = ? AND color_id = ? AND size = ?', [userId, itemId, colorId, size]);
        } else {
            await pool.query('INSERT INTO cart (user_id, item_id, color_id, size, quantity) VALUES (?, ?, ?, ?, 1)', [userId, itemId, colorId, size]);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

let getCartItems = async (userId) => {
    try {
        const [rows] = await pool.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
        return rows;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
}
let removeFromCart = async (userId, itemId, colorId, size) => {
    try {
        await pool.query('DELETE FROM cart WHERE user_id = ? AND item_id = ? AND color_id = ? AND size = ?', [userId, itemId, colorId, size]);
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
};

let decreaseQuantityItemCart = async (userId, itemId, colorId, size) => {
    try {
        await pool.query('UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND item_id = ? AND color_id = ? AND size = ?', [userId, itemId, colorId, size]);
    } catch (error) {
        console.error('Error decreasing quantity item cart:', error);
        throw error;
    }
};

let increaseQuantityItemCart = async (userId, itemId, colorId, size) => {
    try {
        await pool.query(`
            UPDATE cart 
            SET quantity = quantity + 1 
            WHERE user_id = ? 
            AND item_id = ? 
            AND color_id = ? 
            AND size = ?`,
            [userId, itemId, colorId, size]);
    } catch (error) {
        console.error('Error increasing quantity item cart:', error);
        throw error;
    }
};

//Order
let getOrders = async () => {
    const [rows] = await pool.query(
        `SELECT * FROM orders
        LEFT JOIN order_details ON orders.order_id = order_details.order_id`);

    let orders = {};

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Format the order_date
        const date = new Date(row.order_date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

        // Nếu đơn hàng chưa tồn tại trong đối tượng orders, thêm nó
        if (!orders[row.order_id]) {
            orders[row.order_id] = {
                order_id: row.order_id,
                user_id: row.user_id,
                order_username: row.order_username,
                order_userphone: row.order_userphone,
                order_date: formattedDate,
                status: row.status,
                total_amount: row.total_amount,
                shipping_address: row.shipping_address,
                shipping_method: row.shipping_method,
                payment_method: row.payment_method,
                payment_status: row.payment_status,
                shipping_fee: row.shipping_fee,
                created_at: row.created_at,
                updated_at: row.updated_at,
                delivery_time: row.delivery_time,
                order_number: row.order_number,
                order_details: [] // Tạo mảng để chứa order_details
            };
        }

        // Thêm chi tiết đơn hàng vào mảng order_details
        orders[row.order_id].order_details.push({
            order_detail_id: row.order_detail_id,
            item_id: row.item_id,
            item_name: row.item_name,
            quantity: row.quantity,
            price: row.price,
            size: row.size,
            color: row.color,
            colorId: row.colorId,
            brand: row.brand,
            category: row.category,
            img: JSON.parse(row.img), // Giả sử img là chuỗi JSON, cần parse thành mảng
            subtotal: row.subtotal
        });
    }

    // Trả về mảng các đơn hàng (chỉ lấy các giá trị từ đối tượng orders)
    return Object.values(orders);
};

let getOrderDetails = async (orderIds) => {
    const [rows] = await pool.query('SELECT * FROM order_details WHERE order_id IN (?)', [orderIds]);
    return rows;
}

let getOrdersById = async (userId) => {
    const [rows] = await pool.query(
        `SELECT * FROM orders
        LEFT JOIN order_details ON orders.order_id = order_details.order_id
        WHERE user_id = ?`, [userId]);

    let orders = {};

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Format the order_date
        const date = new Date(row.order_date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

        // Nếu đơn hàng chưa tồn tại trong đối tượng orders, thêm nó
        if (!orders[row.order_id]) {
            orders[row.order_id] = {
                order_id: row.order_id,
                user_id: row.user_id,
                order_username: row.order_username,
                order_userphone: row.order_userphone,
                order_date: formattedDate,
                status: row.status,
                total_amount: row.total_amount,
                shipping_address: row.shipping_address,
                shipping_method: row.shipping_method,
                payment_method: row.payment_method,
                payment_status: row.payment_status,
                shipping_fee: row.shipping_fee,
                created_at: row.created_at,
                updated_at: row.updated_at,
                delivery_time: row.delivery_time,
                order_number: row.order_number,
                order_details: [] // Tạo mảng để chứa order_details
            };
        }

        // Thêm chi tiết đơn hàng vào mảng order_details
        orders[row.order_id].order_details.push({
            order_detail_id: row.order_detail_id,
            item_id: row.item_id,
            item_name: row.item_name,
            quantity: row.quantity,
            price: row.price,
            size: row.size,
            color: row.color,
            colorId: row.colorId,
            brand: row.brand,
            category: row.category,
            img: JSON.parse(row.img), // Giả sử img là chuỗi JSON, cần parse thành mảng
            subtotal: row.subtotal
        });
    }

    // Trả về mảng các đơn hàng (chỉ lấy các giá trị từ đối tượng orders)
    return Object.values(orders);
}
module.exports = {
    getFavoriteItems,
    addToFavorites,
    resetUserSession,
    getFavoriteItemList, getFavoriteItemIds, removeFromFavorites,
    addToCart, getCartItems, removeFromCart, decreaseQuantityItemCart, increaseQuantityItemCart,
    getOrders, getOrderDetails, getOrdersById
}