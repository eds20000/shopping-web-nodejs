import models from '../models/admin/adminPage.model'
import usersEdit from '../models/admin/userEdit.model'


let getadminPage = async (req, res) => {
    const users = await usersEdit.getUsers()
    const items = await models.getItems();
    return res.render('admin/category_admin.ejs', { items, users })
}

let productEdit = async (req, res) => {
    const itemId = req.params.id
    const users = await usersEdit.getUsers()
    const item = (await models.getItemById(itemId))[0]
    console.log(item)
    return res.render('admin/product-edit.ejs', { item, users })

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

    await usersEdit.userAdd(userName, userPassword, userEmail, userSex, userBirth, userRole, userImg)
    return res.redirect('/admin-users')
}


module.exports = {
    getadminPage, productEdit, DeleteItem, DeleteItemColorSize,
    getUsersPage, getUsersEditPage, DeleteUserById, userInforUpdate,
    addUserPage, addUser
}