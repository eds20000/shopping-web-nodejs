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

let addToCart = async (userId, itemId, colorName, size) => {
    try {
        // Lấy `rows` từ kết quả trả về của truy vấn
        const [colorResult] = await pool.query('SELECT id FROM colors WHERE color_name = ? AND item_id = ? ', [colorName, itemId]);

        if (colorResult.length > 0) {
            const colorId = colorResult[0].id;

            // Kiểm tra xem mục đã tồn tại trong giỏ hàng hay chưa
            const [cartItemExist] = await pool.query('SELECT * FROM cart WHERE user_id = ? AND item_id = ? AND color_id = ? AND size = ?', [userId, itemId, colorId, size]);

            if (cartItemExist.length > 0) {
                // Cập nhật số lượng nếu đã tồn tại
                await pool.query('UPDATE cart SET quantity = quantity + 1, add_time= NOW()  WHERE user_id = ? AND item_id = ? AND color_id = ? AND size = ?', [userId, itemId, colorId, size]);
            } else {
                // Thêm mục mới vào giỏ hàng nếu chưa tồn tại
                await pool.query('INSERT INTO cart (user_id, item_id, color_id, size, quantity) VALUES (?, ?, ?, ?, 1)', [userId, itemId, colorId, size]);
            }
        } else {
            throw new Error('Color not found for the item');
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
module.exports = {
    getFavoriteItems,
    addToFavorites,
    resetUserSession,
    getFavoriteItemList, getFavoriteItemIds, removeFromFavorites, addToCart, getCartItems
}