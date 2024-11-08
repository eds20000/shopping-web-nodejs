import pool from '../configs/connectDB';

let getReview = async () => {
    try{
        const [rows] = await pool.execute(`
            SELECT 
                reviews.id,
                reviews.item_id AS item_id, 
                users.user_name, 
                reviews.color_name, 
                reviews.size, 
                reviews.rating,
                reviews.review_title,
                reviews.review_text,
                DATE_FORMAT(reviews.created_at, '%d/%m/%Y') AS created_at,
                DATE_FORMAT(reviews.updated_at, '%d/%m/%Y') AS updated_at 
            FROM 
                reviews
            INNER JOIN 
                users 
            ON 
                reviews.user_id = users.user_id
            `)
            return rows;
    }
    catch (error) {
        console.log(error);
    }
}
let getReviewByItemid = async (itemId) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                reviews.id,
                reviews.item_id AS item_id, 
                users.user_name, 
                reviews.color_name, 
                reviews.size, 
                reviews.rating,
                reviews.review_title,
                reviews.review_text,
                DATE_FORMAT(reviews.created_at, '%d/%m/%Y') AS created_at,
                DATE_FORMAT(reviews.updated_at, '%d/%m/%Y') AS updated_at 
            FROM 
                reviews 
            RIGHT OUTER JOIN 
                users 
            ON 
                reviews.user_id = users.user_id
            WHERE 
                reviews.item_id = ? ;`, [itemId])
        return rows;
    } catch (error) {
        console.log(error);
    }
}

let getReviewLike = async (reviewId) => {
    try {
        const [rows] = await pool.execute('SELECT like_userId FROM review_like WHERE review_id = ?', [reviewId]);

        // Nếu tìm thấy hàng, trả về giá trị `like_userId`
        if (rows.length > 0) {
            return rows.map(row => row.like_userId);
        } else {
            return null; // Trường hợp không tìm thấy kết quả
        }
    } catch (error) {
        console.error("Error fetching review like:", error);
        return null;
    }
}
let handleReviewLike = async (reviewId, userId) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM review_like WHERE review_id = ? and like_userId = ?', [reviewId, userId]);
        if (rows.length > 0) {
            await pool.query('DELETE FROM review_like WHERE review_id = ? and like_userId = ?', [reviewId, userId]);
        }
        else {
            await pool.query('INSERT INTO review_like(review_id,like_userId) VALUES(?,?) ', [reviewId, userId]);
        }
    } catch (error) {
        console.error("Error delete review like:", error);
    }
}
let addReview = async (itemId, userId, colorName, size, rating,reviewTitle, reviewText) => {
    try {
        await pool.query('INSERT INTO reviews(item_id,user_id,color_name,size,rating,review_title,review_text) VALUES(?,?,?,?,?,?,?) ', [itemId, userId, colorName, size, rating,reviewTitle, reviewText]);
    }
    catch (error) {
        console.error("Error delete review like:", error);
    }
}
let updateReview = async (itemId, userId, colorName, size, rating,reviewTitle, reviewText) => {
    try {
        await pool.query('UPDATE reviews SET color_name = ?, size = ?, rating = ?,review_title = ?, review_text = ?, updated_at = ? WHERE user_id = ? AND item_id = ? ', [colorName, size, rating,reviewTitle, reviewText,new Date(),userId,itemId]);
    }
    catch (error) {
        console.error("Error delete review like:", error);
    }
}
let deleteReview = async (reviewId) =>{
    try {
        await pool.query('DELETE FROM reviews WHERE id = ?', [reviewId]);
    } catch (error) {
        console.error("Error fetching review like:", error);
    }
}
module.exports = {
    getReviewByItemid, getReviewLike, handleReviewLike, addReview,updateReview,getReview,deleteReview
}