import models from '../models/admin/adminPage.model'
import usersEdit from '../models/admin/userEdit.model'
import modelCourse from '../models/course'

let addToFavorites = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.session.user.user_id;

    try {
        await modelCourse.addToFavorites(userId, itemId);

        if (req.session.user) {
            req.session.user.favorItems = await modelCourse.getFavoriteItems(userId);
            const favorCount = req.session.user.favorItems.length;
            req.session.save();
            return res.json({ success: true, favorCount });
        }
    } catch (error) {
        return res.json({ success: false, error: error.message });
    }
}

let getHomepage = async (req, res) => {
    const items = await models.getItems();

    if (req.session.user) {
        // Fetch favorItems for the user
        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        res.render('index', { items, user: req.session.user });
    } else {
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
    let item;
    if (itemId) {
        item = (await models.getItemById(itemId))[0]
    }
    if (req.session.user) {
        // Fetch favorItems for the user
        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        res.render('product.ejs', { items, item, user: req.session.user, itemId });
    } else {
        res.render('product.ejs', { items, item, user: null, itemId });
    }
}



module.exports = {
    getHomepage, loginPage, signupPage, productPage, addToFavorites
}