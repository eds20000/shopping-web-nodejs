import pool from '../configs/connectDB';
import multer from 'multer';


let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM users');

    return res.render('index.ejs', { dataUser: rows })
}

let loginPage = async (req, res) => {
    return res.render('login.ejs')
}
let signupPage = async (req, res) => {
    return res.render('signup.ejs')
}


module.exports = {
    getHomepage, loginPage, signupPage
}