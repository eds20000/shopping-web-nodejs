import models from '../models/course'


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


module.exports = { getadminPage, productEdit }