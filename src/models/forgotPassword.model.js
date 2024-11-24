import pool from '../configs/connectDB';

let checkUser = async(userName,userEmail) =>{
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE user_name = ? and user_email = ?', [userName,userEmail]);
        return user
    } catch (error) {
        return error
    }
}

let updateTokenUser = (resetToken,resetPasswordExpire,userEmail) => {
    try {
        return pool.query('UPDATE users SET reset_password_token = ?, reset_password_expire = ? WHERE user_email = ?',
        [resetToken, resetPasswordExpire, userEmail])
    } catch (error) {
        return error
    }
}

module.exports = { checkUser,updateTokenUser }
