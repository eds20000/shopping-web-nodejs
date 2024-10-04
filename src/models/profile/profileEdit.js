import pool from '../../configs/connectDB';

let userProfileEdit = async (req, userId, userSection, userValue) => {
    try {
        const [rows] = await pool.query(`
            UPDATE users SET ??=? WHERE user_id=?;
            `, [userSection, userValue, userId,])
        if (rows.affectedRows > 0) {
            // 更新 session ユーザー
            if (req.session.user) {
                req.session.user[userSection] = userValue; // sessionの値を変更
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}
let userPasswordEdit = async (req, newPassword) => {
    try {
        const [rows] = await pool.query(`
            UPDATE users SET user_password =? ;
            `, [newPassword])
        if (rows.affectedRows > 0) {
            // 更新 session ユーザー
            if (req.session.user) {
                req.session.user[userSection] = userValue; // sessionの値を変更
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    userProfileEdit, userPasswordEdit
}