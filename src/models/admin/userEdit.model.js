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
module.exports = { getUsers, getUserById, DeleteUserById }
