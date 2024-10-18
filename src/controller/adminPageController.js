import models from '../models/admin/adminPage.model'
import usersEdit from '../models/admin/userEdit.model'
import modelCourse from '../models/course'
import modelOrder from '../models/order.model'



let getadminPage = async (req, res) => {
    const users = await usersEdit.getUsers()
    const items = await models.getItems();
    return res.render('admin/category_admin.ejs', { items, users })
}

let productEdit = async (req, res) => {
    const itemId = req.params.id
    const users = await usersEdit.getUsers()
    const item = (await models.getItemById(itemId))[0]
    return res.render('admin/product-edit.ejs', { item, users, filePaths: null, colorInput: null })

}
//product-Img-Upload
let productImgUpload = async (req, res) => {
    const itemId = req.params.id
    const users = await usersEdit.getUsers()
    const item = (await models.getItemById(itemId))[0]
    const filePaths = req.files.map(file => file.filename);
    const colorInput = req.body.colorInput
    return res.render('admin/product-edit.ejs', { users, item, filePaths, colorInput });
}
let DeleteItem = async (req, res) => {
    const itemId = req.params.id
    await models.deleteItemById(itemId)
    return res.redirect('/admin-page')
}
let DeleteItemColorSize = async (req, res) => {
    const itemId = req.params.itemid
    const colorId = req.params.colorid
    const colorSize = req.params.colorsize
    models.deleteItemByColorsize(itemId, colorId, colorSize)
    return res.redirect('/admin-page')
}

const itemUpdate = async (req, res) => {
    const { id, name, brand, category, price, zaiko, infor, size, color_img } = req.body;
    try {
        // Gọi hàm cập nhật database
        await models.updateItemById(id, name, brand, category, price, zaiko, infor, size, color_img);

        // Trả về phản hồi JSON cho phía client
        return res.status(200).json({ success: true, message: '更新に成功しました！' });
    } catch (error) {
        console.error('Error updating item:', error);

        // Trả về lỗi nếu có
        return res.status(500).json({ success: false, message: '更新に失敗しました！.' });
    }
};


//User-Page
let getUsersPage = async (req, res) => {
    const users = await usersEdit.getUsers()
    return res.render('admin/users-edit.ejs', { users })
}
let getUsersEditPage = async (req, res) => {
    const users = await usersEdit.getUsers()
    const user = (await usersEdit.getUserById(req.params.userId))[0]
    return res.render('admin/userInfor-edit.ejs', { user, users })
}

let DeleteUserById = async (req, res) => {
    const userId = req.params.userId
    await usersEdit.DeleteUserById(userId)
    return res.redirect('/admin-users')
}

let userInforUpdate = async (req, res) => {
    const { userId, userName, userEmail, userSex, userBirth, userRole } = req.body;
    let userImg;
    if (req.file) {
        userImg = req.file.filename;
    } else {
        userImg = req.body.currentUserImg;
    }

    await usersEdit.userInforEdit(userId, userName, userEmail, userSex, userBirth, userRole, userImg)
    await modelCourse.resetUserSession(req)
    return res.redirect('/admin-users')
}
let addUserPage = async (req, res) => {
    const users = await usersEdit.getUsers()

    return res.render('admin/userAdd.ejs', { users })
}

let addUser = async (req, res) => {
    const { userName, userPassword, userEmail, userSex, userBirth, userRole } = req.body;
    let userImg;
    if (req.file) {
        userImg = req.file.filename;
    } else {
        userImg = req.body.currentUserImg;
    }
    try {
        await usersEdit.userAdd(userName, userPassword, userEmail, userSex, userBirth, userRole, userImg)
        req.flash('success_msg', 'ユーザーが正常に追加されました。');
        return res.redirect('/admin-users');
    }
    catch (error) {
        req.flash('error_msg', error.message);
        return res.redirect('/user-add');
    }
}

//Order-Page
let getOrdersPage = async (req, res) => {
    if (req.session.user) {
        const users = await usersEdit.getUsers()
        const orders = await modelCourse.getOrders(req.session.user.user_id)
        req.session.logoutBack = req.originalUrl;
        return res.render('admin/orders-edit.ejs', { orders, users })
    }
    return res.redirect('/login')
}

let editOrder = async (req, res) => {
    const { orderId, shipping_method, delivery_time_min, delivery_time_max, status } = req.body;
    const delivery_time = `${delivery_time_min} ~ ${delivery_time_max}`
    await modelOrder.editOrder(orderId, shipping_method, delivery_time, status);
    return res.redirect('/admin-orders');
}

module.exports = {
    getadminPage, productEdit, DeleteItem, DeleteItemColorSize, itemUpdate, productImgUpload,
    getUsersPage, getUsersEditPage, DeleteUserById, userInforUpdate,
    addUserPage, addUser, getOrdersPage, editOrder
}