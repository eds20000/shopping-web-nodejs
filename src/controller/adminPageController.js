import models from '../models/admin/adminPage.model'
import usersEdit from '../models/admin/userEdit.model'


let getadminPage = async (req, res) => {
    const items = await models.getItems();
    return res.render('admin/category_admin.ejs', { items })
}

let productEdit = async (req, res) => {
    const itemId = req.params.id
    const item = (await models.getItemById(itemId))[0]
    console.log(item)
    return res.render('admin/product-edit.ejs', { item })

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
    const user = (await usersEdit.getUserById(req.params.userId))[0]
    return res.render('admin/userInfor-edit.ejs', { user })
}

let DeleteUserById = async (req, res) => {
    const userId = req.params.userId
    await usersEdit.DeleteUserById(userId)
    return res.redirect('/admin-users')
}

let userInforUpdate = async (req, res) => {
    const userName = req.body.user_name
    const userEmail = req.body.user_email
    const userSex = req.body.user_sex
    const userBirth = req.body.user_birth
    const userRole = req.body.user_role
    const userImg = req.file ? req.file.filename : null;
    await usersEdit.DeleteUserById(userId)

    return res.redirect('/admin-users')
}

module.exports = {
    getadminPage, productEdit, DeleteItem, DeleteItemColorSize,
    getUsersPage, getUsersEditPage, DeleteUserById, userInforUpdate
}