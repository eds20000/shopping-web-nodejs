import pool from '../../configs/connectDB';
import fs from 'fs'
const path = require('path');
import modelCourse from '../course'

let getUsers = async () => {
    try {
        const [rows] = await pool.execute(`
            SELECT * from users;
            `)
        return rows
    }
    catch (error) {
        console.log(error)
    }
}
let getUserById = async (id) => {
    try {
        const [rows] = await pool.execute(`
            SELECT * from users WHERE user_id = ?;
            `, [id])
        return rows
    }
    catch (error) {
        console.log(error)
    }
}

let DeleteUserById = async (userId) => {
    try {
        // Truy vấn để lấy thông tin về ảnh đại diện của người dùng
        const [rows] = await pool.query(`
            SELECT user_img FROM users WHERE user_id = ?;
        `, [userId]);

        if (rows.length === 0) {
            throw new Error('Người dùng không tồn tại.');
        }

        const userImg = rows[0].user_img;

        // Xóa người dùng khỏi cơ sở dữ liệu
        const [result] = await pool.query(`
            DELETE FROM users WHERE user_id = ?;
        `, [userId]);

        if (result.affectedRows > 0) {
            // Xóa ảnh đại diện nếu có
            if (userImg && userImg != 'default.jpg') {
                const imgPath = path.resolve(__dirname, '../../public/image/user-image', userImg);
                fs.unlink(imgPath, (err) => {
                });
            }
        } else {
            throw new Error('Không thể xóa người dùng.');
        }
    } catch (error) {
        console.log(error);
    }
}


let userInforEdit = async (userId, userName, userEmail, userSex, userBirth, userRole, userImg) => {
    try {
        if (!userId || !userName || !userEmail || !userSex || !userBirth || !userRole) {
            throw new Error('すべてのフィールドは必須です。');
        }
        const [rows] = await pool.query(`
            UPDATE users SET user_name=?,user_email=?,user_img=?,user_sex=?,user_birth=?,user_role=?  WHERE user_id = ?;
            `, [userName, userEmail, userImg, userSex, userBirth, userRole, userId])

    }
    catch (error) {
        console.log(error)
    }
}

let userAdd = async (userName, userPassword, userEmail, userSex, userBirth, userRole, userImg) => {
    try {
        if (!userPassword || !userName || !userEmail || !userSex || !userBirth || !userRole) {
            throw new Error('すべてのフィールドの入力は必須です。');
        }
        const [existingUser] = await pool.query(`
            SELECT * FROM users WHERE user_name = ?;
        `, [userName]);

        if (existingUser.length > 0) {
            throw new Error('ユーザー名はすでに存在しています。他の名前を選択してください。');
        }
        const [existingUserEmail] = await pool.query(`
            SELECT * FROM users WHERE user_email = ?;
        `, [userEmail]);

        if (existingUserEmail.length > 0) {
            throw new Error('メールアドレスはすでに存在しています。他のメールアドレスを選択してください。');
        }

        const [rows] = await pool.query(`
            INSERT users (user_name,user_password,user_email,user_img,user_sex,user_birth,user_role) VALUE (?,?,?,?,?,?,?);
            `, [userName, userPassword, userEmail, userImg, userSex, userBirth, userRole])
    }
    catch (error) {
        throw error
    }
}
module.exports = { getUsers, getUserById, DeleteUserById, userInforEdit, userAdd }
