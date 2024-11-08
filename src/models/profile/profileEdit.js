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
let userImageEdit = async (req, userId, userImg) => {
    try {
        const [rows] = await pool.query(`
            UPDATE users SET user_img =? WHERE user_id = ?;
            `, [userImg, userId])
        console.log('rows:', rows);
        if (rows.affectedRows > 0) {
            // 更新 session ユーザー
            if (req.session.user) {
                req.session.user['user_img'] = userImg; // sessionの値を変更
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

let addAddress = async(userId,address) =>{
    try{
        await pool.query(`
            INSERT INTO user_address(user_id,name,phone, address_zip_code,address_prefecture,address_city,address_add,address_building) VALUES (?,?,?,?,?,?,?,?)
            `,[userId,address.addressName,address.addressPhone,address.addressZipcode,address.addressPrefecture,address.addressCity,address.addressAdd,address.addressBuilding])
    }catch (error) {
        console.log(error)
    }
}
let deleteAddress = async(addressId) =>{
    try{
        await pool.query(`
            DELETE FROM user_address WHERE id = ?
            `,[addressId])
        await pool.query(`
            ALTER TABLE user_address AUTO_INCREMENT = 1;`)
    }catch (error) {
        console.log(error)
    }
}

module.exports = {
    userProfileEdit, userPasswordEdit, userImageEdit,addAddress,deleteAddress
}