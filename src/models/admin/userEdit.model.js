import pool from '../../configs/connectDB';


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
        const [rows] = await pool.query(`
            DELETE FROM users WHERE user_id = ?;
            `, userId)
    }
    catch (error) {
        console.log(error)
    }
}

let userInforEdit = async (userId, userName, userEmail, userSex, userBirth, userRole, userImg) => {
    try {
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
        const [rows] = await pool.query(`
            INSERT users (user_name,user_password,user_email,user_img,user_sex,user_birth,user_role) VALUE (?,?,?,?,?,?,?);
            `, [userName, userPassword, userEmail, userImg, userSex, userBirth, userRole])
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = { getUsers, getUserById, DeleteUserById, userInforEdit, userAdd }
