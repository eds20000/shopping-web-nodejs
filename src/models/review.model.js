import pool from '../configs/connectDB';
const fs = require('fs').promises;
const path = require('path'); // Nếu cần xử lý đường dẫn


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
                reviews.review_img,
                DATE_FORMAT(reviews.created_at, '%d/%m/%Y') AS created_at,
                DATE_FORMAT(reviews.updated_at, '%d/%m/%Y') AS updated_at 
            FROM 
                reviews
            INNER JOIN 
                users 
            ON 
                reviews.user_id = users.user_id
            `)
            return rows.reduce((acc, row) => {
                // Kiểm tra xem review đã tồn tại trong mảng acc chưa
                let review = acc.find(review => review.id === row.id);
    
                if (!review) {
                    // Nếu chưa tồn tại, tạo review mới
                    review = {
                        id: row.id,
                        item_id: row.item_id,
                        user_name: row.user_name,
                        color_name: row.color_name,
                        size: row.size,
                        rating: row.rating,
                        review_title: row.review_title,
                        review_text: row.review_text,
                        review_img: row.review_img ? row.review_img.split(',') : [], // Xử lý trường hợp null hoặc undefined
                        created_at: row.created_at,
                        updated_at: row.updated_at
                    };
                    acc.push(review); // Thêm vào mảng
                }
    
                return acc; // Trả về accumulator
            }, []); // Khởi tạo acc là mảng rỗng
        } catch (error) {
            console.error(error); // Log lỗi nếu xảy ra
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
                reviews.review_img,
                DATE_FORMAT(reviews.created_at, '%d/%m/%Y') AS created_at,
                DATE_FORMAT(reviews.updated_at, '%d/%m/%Y') AS updated_at 
            FROM 
                reviews 
            RIGHT OUTER JOIN 
                users 
            ON 
                reviews.user_id = users.user_id
            WHERE 
                reviews.item_id = ? ;`, [itemId]);

        // Sử dụng reduce để nhóm dữ liệu
        return rows.reduce((acc, row) => {
            // Kiểm tra xem review đã tồn tại trong mảng acc chưa
            let review = acc.find(review => review.id === row.id);

            if (!review) {
                // Nếu chưa tồn tại, tạo review mới
                review = {
                    id: row.id,
                    item_id: row.item_id,
                    user_name: row.user_name,
                    color_name: row.color_name,
                    size: row.size,
                    rating: row.rating,
                    review_title: row.review_title,
                    review_text: row.review_text,
                    review_img: row.review_img ? row.review_img.split(',') : [], // Xử lý trường hợp null hoặc undefined
                    created_at: row.created_at,
                    updated_at: row.updated_at
                };
                acc.push(review); // Thêm vào mảng
            }

            return acc; // Trả về accumulator
        }, []); // Khởi tạo acc là mảng rỗng
    } catch (error) {
        console.error(error); // Log lỗi nếu xảy ra
    }
};


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
let addReview = async (itemId, userId, colorName, size, rating, reviewTitle, reviewText, reviewImg) => {
    try {
        const query = `
            INSERT INTO reviews 
            (item_id, user_id, color_name, size, rating, review_title, review_text, review_img, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        await pool.execute(query, [itemId, userId, colorName, size, rating, reviewTitle, reviewText, reviewImg]);
    } catch (error) {
        console.error('Error in modelReview.addReview:', error);
        throw error;
    }
};

let updateReview = async (itemId, userId, colorName, size, rating,reviewTitle, reviewText,reviewImg) => {
    try {
        await pool.query('UPDATE reviews SET color_name = ?, size = ?, rating = ?,review_title = ?, review_text = ?,review_img = ?, updated_at = ? WHERE user_id = ? AND item_id = ? ', [colorName, size, rating,reviewTitle, reviewText,reviewImg,new Date(),userId,itemId]);
    }
    catch (error) {
        console.error("Error delete review like:", error);
    }
}
let deleteReview = async (reviewId) =>{
    try {
        const [rows] = await pool.query('SELECT review_img FROM reviews WHERE id = ?', [reviewId]);
        const reviewImg = rows.map(reviewImg => reviewImg.review_img)
        for (const imgName of reviewImg) {
            try {
                const imgPath = path.join(__dirname, '../public/image/review-image', imgName); 
                await fs.unlink(imgPath); // Xóa file
            } catch (err) {
                console.error(`Failed to delete file: ${imgName}`, err);
            }
        }
        await pool.query('DELETE FROM reviews WHERE id = ?', [reviewId]);
    } catch (error) {
        console.error("Error fetching review like:", error);
    }
}
module.exports = {
    getReviewByItemid, getReviewLike, handleReviewLike, addReview,updateReview,getReview,deleteReview
}