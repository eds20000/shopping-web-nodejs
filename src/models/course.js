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
let getOrders = async (userId) => {
    const [rows] = await pool.query('SELECT * FROM orders WHERE user_id = ?', [userId]);
    for (let i = 0; i < rows.length; i++) {
        const date = new Date(rows[i].order_date);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, cần +1 và định dạng 2 chữ số
        const day = date.getDate().toString().padStart(2, '0'); // Định dạng ngày với 2 chữ số

        // Lấy giờ, phút, giây
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        // Tạo chuỗi định dạng YYYY/MM/DD HH:MM:SS
        const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        rows[0].order_date = formattedDate;
    }
    return rows;
}
let getOrderDetails = async (orderIds) => {
    const [rows] = await pool.query('SELECT * FROM order_details WHERE order_id IN (?)', [orderIds]);
    return rows;
}

module.exports = {
    getFavoriteItems,
    addToFavorites,
    resetUserSession,
    getFavoriteItemList, getFavoriteItemIds, removeFromFavorites,
    addToCart, getCartItems, removeFromCart, decreaseQuantityItemCart, increaseQuantityItemCart,
    getOrders, getOrderDetails
}