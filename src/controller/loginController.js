import pool from '../configs/connectDB';
import bcrypt from 'bcryptjs';
import modelCourse from '../models/course'

// password hashing
const salt = bcrypt.genSaltSync(10);


let userCheck = async (req, res) => {
    try {
        // Truy vấn cơ sở dữ liệu dựa trên user_name
        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE user_name = ?',
            [req.body.user_name]
        );

        // Kiểm tra nếu người dùng tồn tại
        if (rows.length > 0) {
            let user = rows[0];
            // So sánh mật khẩu băm
            const isMatch = bcrypt.compareSync(req.body.user_password, user.user_password);
            if (isMatch) {
                // Lưu thông tin người dùng vào session và chuyển hướng
                req.session.user = user;
                const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id)
                req.session.user.favorItems = favorItems
                res.redirect('/');
            } else {
                // Phản hồi nếu mật khẩu không đúng
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            // Phản hồi nếu không tìm thấy người dùng
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Xử lý lỗi
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};
let userLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Unable to log out' });
        }
        res.redirect('/');
    });
}

let userCreate = async (req, res) => {
    try {
        const hashPassword = bcrypt.hashSync(req.body.user_password, salt);
        const userBirth = `${req.body.user_birth_year}/${req.body.user_birth_month}/${req.body.user_birth_day}`;
        const [row] = await pool.execute(
            'INSERT INTO users (user_name,user_password,user_email,user_img,user_sex,user_birth,user_role) VALUES (?,?,?,?,?,?,?)',
            [
                req.body.user_name,
                hashPassword,
                req.body.user_email,
                'default.jpg',
                req.body.user_sex,
                userBirth,
                'customer'
            ]
        );
        res.render('register-success.ejs')
    }
    catch (error) {
        // Xử lý lỗi
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
}
module.exports = { userCheck, userLogout, userCreate };
