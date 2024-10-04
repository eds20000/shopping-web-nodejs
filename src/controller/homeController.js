import models from '../models/admin/adminPage.model'
import usersEdit from '../models/admin/userEdit.model'



let getHomepage = async (req, res) => {
    const items = await models.getItems();

    if (req.session.user) {
        // Nếu người dùng đã đăng nhập, hiển thị thông tin người dùng
        res.render('index', { items, user: req.session.user });

    } else {
        // Nếu người dùng chưa đăng nhập, hiển thị trang chủ mặc định
        res.render('index', { items, user: null });
    }
}

let loginPage = async (req, res) => {
    return res.render('login.ejs')
}
let signupPage = async (req, res) => {
    return res.render('signup.ejs')
}
let productPage = async (req, res) => {
    const items = await models.getItems();
    const itemId = req.params.id;
    return res.render('product.ejs', { itemId, items })
}



module.exports = {
    getHomepage, loginPage, signupPage, productPage,
}