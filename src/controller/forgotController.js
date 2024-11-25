import modelForgot from '../models/forgotPassword.model'
import handlerEmail from '../middleware/handlerEmail'
import pool from '../configs/connectDB';
import bcrypt from 'bcryptjs';

import { error } from 'console';
const crypto = require('crypto');


let forgotPasswordCheck = async(req,res)  =>{
    const userName = req.body.user_name
    const userEmail = req.body.user_mail
    if(userName && userEmail){
        const checkUser = await modelForgot.checkUser(userName,userEmail)
        if(checkUser.length === 0){
            req.flash('error_msg', 'ユーザー名またはメールアドレスが正しくありません');
            return res.redirect('/forgot');
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpire = new Date(Date.now() + 3600000);

        // Cập nhật thông tin vào cơ sở dữ liệu
        await modelForgot.updateTokenUser(resetToken,resetPasswordExpire,userEmail)

        await handlerEmail.handlerResetPassSendEmail(resetToken,userEmail)
        return res.render('forgot.ejs',{sendEmail:true,userEmail,userName})
    }
    else{
        req.flash('error_msg', '情報をすべて入力してください。');
        return res.redirect('/forgot');
    }
}

let resetPassword = async (req,res) =>{
    const token = req.params.token;
    try {
        const [user] = await pool.query(
            'SELECT * FROM users WHERE reset_password_token = ? AND reset_password_expire > ?',
            [token, new Date()]
        );
        if (user.length === 0) {
            console.log('Token không hợp lệ hoặc đã hết hạn.')
        }
        else{
            res.render('reset-password-form.ejs',{userId : user[0].user_id,token});
        }
    } catch (error) {
        console.error(error);
    }
}
let resetPasswordForm = async (req,res) =>{
    const userId = req.params.userid
    const password = req.body.user_newpass;
    const token = req.body.token
    if(!token){
        return res.render('404.ejs')
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const [rows] = await pool.query(
            'UPDATE users SET user_password = ?, reset_password_token = NULL, reset_password_expire = NULL WHERE user_id = ?',
            [hashedPassword, userId]
        );
        if (rows.affectedRows > 0) {
            req.flash('success_msg', 'パスワードが更新されました。');
            return res.redirect('/login'); 
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {forgotPasswordCheck,resetPassword,resetPasswordForm}