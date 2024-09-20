import models from '../models/admin/adminPage.model'


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
    models.deleteItemById(itemId)
    return res.redirect('/admin-page')
}
let DeleteItemColorSize = async (req, res) => {
    const itemId = req.params.itemid
    const colorId = req.params.colorid
    const colorSize = req.params.colorsize
    models.deleteItemByColorsize(itemId, colorId, colorSize)
    return res.redirect('/admin-page')
}

module.exports = { getadminPage, productEdit, DeleteItem, DeleteItemColorSize }