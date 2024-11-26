import pool from '../configs/connectDB';
import bcrypt from 'bcryptjs';
import modelCourse from '../models/course'
import handlerEmail from '../middleware/handlerEmail'

const crypto = require('crypto');


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
                if(user.is_verified === 1){
                    req.session.user = user;
                    const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id)
                    const cartItems = await modelCourse.getCartItems(req.session.user.user_id)
                    req.session.user.favorItems = favorItems
                    req.session.user.cartItems = cartItems
                    if (req.session.loginBack) {
                        return res.redirect(req.session.loginBack);
                    }
                    else {
                        return res.redirect('/')
                    }
                }else{
                    req.flash('error_msg', 'アカウントのメールアドレスが確認されていません');
                    return res.redirect('/login');
                }
                // Lưu thông tin người dùng vào session và chuyển hướng
            } else {
                // Phản hồi nếu mật khẩu không đúng
                req.flash('error_msg', 'ユーザー名またはパスワードが間違っています');
                return res.redirect('/login');
            }
        } else {
            req.flash('error_msg', 'ユーザー名またはパスワードが間違っています');
            return res.redirect('/login');
        }
    } catch (error) {
        // Xử lý lỗi
        req.flash('error_msg', 'ユーザー名またはパスワードが間違っています');
        return res.redirect('/login');
    }
};
let userLogout = (req, res) => {
    const logoutBack = req.session.logoutBack || '/'; // Default to '/' if logoutBack is undefined
    const myCart = req.cookies.myCart || null; // Read myCart from cookies

    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Unable to log out' });
        }

        // If myCart exists, re-set it in cookies
        if (req.cookies.myCart) {
            res.cookie('myCart', '', { maxAge: 900000, httpOnly: true });
        }


        // Redirect to the stored logoutBack URL or default '/'
        return res.redirect(logoutBack);
    });
};





let userCreate = async (req, res) => {
    try {
        const hashPassword = bcrypt.hashSync(req.body.user_password, salt);
        const userBirth = `${req.body.user_birth_year}/${req.body.user_birth_month}/${req.body.user_birth_day}`;
        const [emailEtrixt] = await pool.query('SELECT * FROM users WHERE user_email = ?', [req.body.user_email]);
        const [userName] = await pool.query('SELECT * FROM users WHERE user_name = ?', [req.body.user_name]);

        // Kiểm tra nếu tên người dùng đã tồn tại
        if (userName.length > 0) {
            return res.status(400).json({ message: 'ユーザー名はすでに使用されています。' });  // Trả về thông báo lỗi JSON
        } 
        // Kiểm tra nếu email đã tồn tại
        else if (emailEtrixt.length > 0) {
            return res.status(400).json({ message: 'メールアドレスはすでに使用されています。' });  // Trả về thông báo lỗi JSON
        } 
        else {
            const verificationCode = crypto.randomBytes(16).toString('hex');

            // Thêm người dùng mới vào cơ sở dữ liệu
            await pool.execute(
                'INSERT INTO users (user_name, user_password, user_email, user_img, user_sex, user_birth, user_role, verification_code, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    req.body.user_name,
                    hashPassword,
                    req.body.user_email,
                    'default.jpg',  // hình ảnh mặc định
                    req.body.user_sex,
                    userBirth,
                    'customer',  // Vai trò là khách hàng
                    verificationCode,
                    0,  // Chưa xác minh
                ]
            );

            await handlerEmail.handlerVerificaSendEmail(verificationCode, req.body.user_email)

            // Trả về thông báo thành công khi đăng ký thành công
            return res.status(200).json({ message: 'メール送信成功' });
        }
    } catch (error) {
        console.error('ユーザー登録中にエラーが発生しました:', error); // Log lỗi
        return res.status(500).json({ message: '登録中にエラーが発生しました。' });  // Trả về thông báo lỗi JSON
    }
};


let userCreateChecked = async(req,res) => {
    const { code } = req.query;
    try {
        const [user] = await pool.execute('SELECT * FROM users WHERE verification_code = ?', [code]);

        if (user.length === 0) {
            req.flash('error_msg', '確認コードが無効です。');
            return res.redirect('/signup');
        }

        await pool.execute('UPDATE users SET is_verified = 1, verification_code = NULL WHERE verification_code = ?', [code]);

        res.render('register-success.ejs');
    } catch (error) {
        console.error(error);
    }
}

module.exports = { userCheck, userLogout, userCreate,userCreateChecked };
