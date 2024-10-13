import userProfileEdit from '../models/profile/profileEdit'
import models from '../models/admin/adminPage.model'
import modelCourse from '../models/course'
import bcrypt from 'bcryptjs';


// password hashing
const salt = bcrypt.genSaltSync(10);


//Profile
let getProfilePage = async (req, res) => {
    if (req.session.user) {
        const items = await models.getItems();
        let myCart;
        if (req.cookies && req.cookies.myCart) {
            myCart = JSON.parse(req.cookies.myCart)
            myCart.forEach(async item => {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size)
            })
            res.clearCookie('myCart')
        }
        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;

        // Find the full item details for each cart item
        const fullCartItems = cartItems.map(cartItem => {
            const fullItem = items.find(item => item.id === cartItem.item_id);
            if (fullItem) {
                return {
                    id: fullItem.id,
                    name: fullItem.name,
                    brand: fullItem.brand,
                    category: fullItem.category,
                    price: fullItem.price,
                    color: fullItem.color_img.find(color => color.id === cartItem.color_id)?.color_name || '',
                    colorId: fullItem.color_img.find(color => color.id === cartItem.color_id)?.id || '',
                    size: cartItem.size,
                    img: fullItem.color_img.find(color => color.id === cartItem.color_id)?.img || '',
                    quantity: cartItem.quantity
                };
            }
            return null;
        }).filter(item => item !== null);
        req.session.logoutBack = req.originalUrl;
        return res.render('user/profile.ejs', { items, user: req.session.user, myCart: fullCartItems });
    } else {
        req.session.loginBack = req.originalUrl;
        return res.redirect('/login');
    }
}
let profileEdit = async (req, res) => {
    const userId = req.params.id;
    const userSection = req.body.section
    const userValue = req.body[userSection]

    await userProfileEdit.userProfileEdit(req, userId, userSection, userValue)
    return res.redirect('/user-profile')
}
let profilePasswordEdit = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const passwordCheck = req.body.user_password_check;
    const passwordNew = req.body.user_password_new;
    const passwordConfirm = req.body.user_password_confirm;

    // Kiểm tra mật khẩu cũ
    const isMatch = bcrypt.compareSync(passwordCheck, req.session.user.user_password);

    if (!isMatch) {
        req.flash('error_msg', '旧パスワードが間違っています');
        return res.redirect('/user-profile');
    }

    // Kiểm tra mật khẩu mới và xác nhận
    if (passwordNew !== passwordConfirm) {
        req.flash('error_msg', 'パスワード確認が間違っています');
        return res.redirect('/user-profile');
    }

    // Mã hóa mật khẩu mới
    const hashPassword = bcrypt.hashSync(passwordNew, salt); // Sử dụng passwordNew

    // Cập nhật mật khẩu trong cơ sở dữ liệu
    await userProfileEdit.userPasswordEdit(req, hashPassword);

    req.flash('success_msg', 'パスワードが正常に更新されました。');
    return res.redirect('/user-profile'); // Chuyển hướng về trang hồ sơ
};
let profileImageEdit = async (req, res) => {
    let userImg;
    let userId = req.params.id
    if (req.file) {
        userImg = req.file.filename;
    } else {
        userImg = req.body.currentUserImg;
    }
    await userProfileEdit.userImageEdit(req, userId, userImg)
    return res.redirect('/user-profile')
}


//Favorite
let getFavoritePage = async (req, res) => {
    if (req.session.user) {
        const items = await models.getItems();
        const userId = req.session.user.user_id;
        const favorIds = await modelCourse.getFavoriteItemIds(userId)
        const favorItems = favorIds.length > 0 ? await models.getItemById(favorIds) : [];
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;
        let myCart;
        if (req.cookies && req.cookies.myCart) {
            myCart = JSON.parse(req.cookies.myCart)
            myCart.forEach(async item => {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size)
            })
            res.clearCookie('myCart')
        }
        // Find the full item details for each cart item
        const fullCartItems = cartItems.map(cartItem => {
            const fullItem = items.find(item => item.id === cartItem.item_id);
            if (fullItem) {
                return {
                    id: fullItem.id,
                    name: fullItem.name,
                    brand: fullItem.brand,
                    category: fullItem.category,
                    price: fullItem.price,
                    color: fullItem.color_img.find(color => color.id === cartItem.color_id)?.color_name || '',
                    colorId: fullItem.color_img.find(color => color.id === cartItem.color_id)?.id || '',
                    size: cartItem.size,
                    img: fullItem.color_img.find(color => color.id === cartItem.color_id)?.img || '',
                    quantity: cartItem.quantity
                };
            }
            return null;
        }).filter(item => item !== null);
        req.session.logoutBack = req.originalUrl;
        return res.render('user/favorite.ejs', { user: req.session.user, favorItems, items, myCart: fullCartItems });
    } else {
        req.session.loginBack = req.originalUrl;
        return res.redirect('/login');
    }
}
let removeFavoriteItem = async (req, res) => {
    const itemId = req.params.id;
    const userId = req.session.user.user_id;
    await modelCourse.removeFromFavorites(userId, itemId);
    const favorItems = await modelCourse.getFavoriteItems(userId);
    req.session.user.favorItems = favorItems;
    return res.redirect('/user-favorite');
}

//Cart
let getCartPage = async (req, res) => {
    if (req.session.user) {
        const items = await models.getItems();
        let myCart;
        if (req.cookies && req.cookies.myCart) {
            myCart = JSON.parse(req.cookies.myCart)
            myCart.forEach(async item => {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size)
            })
            res.clearCookie('myCart')
        }
        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;

        // Find the full item details for each cart item
        const fullCartItems = cartItems.map(cartItem => {
            const fullItem = items.find(item => item.id === cartItem.item_id);
            if (fullItem) {
                return {
                    id: fullItem.id,
                    name: fullItem.name,
                    brand: fullItem.brand,
                    category: fullItem.category,
                    price: fullItem.price,
                    color: fullItem.color_img.find(color => color.id === cartItem.color_id)?.color_name || '',
                    colorId: fullItem.color_img.find(color => color.id === cartItem.color_id)?.id || '',
                    size: cartItem.size,
                    img: fullItem.color_img.find(color => color.id === cartItem.color_id)?.img || '',
                    quantity: cartItem.quantity
                };
            }
            return null;
        }).filter(item => item !== null);
        req.session.logoutBack = req.originalUrl;
        return res.render('user/user-cart.ejs', { items, user: req.session.user, myCart: fullCartItems });
    } else {
        req.session.loginBack = req.originalUrl;
        return res.redirect('/login');
    }
}

//Order
let getOrderPage = async (req, res) => {
    if (req.session.user) {
        const items = await models.getItems();
        let myCart;
        if (req.cookies && req.cookies.myCart) {
            myCart = JSON.parse(req.cookies.myCart)
            myCart.forEach(async item => {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size)
            })
            res.clearCookie('myCart')
        }
        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;

        // Find the full item details for each cart item
        const fullCartItems = cartItems.map(cartItem => {
            const fullItem = items.find(item => item.id === cartItem.item_id);
            if (fullItem) {
                return {
                    id: fullItem.id,
                    name: fullItem.name,
                    brand: fullItem.brand,
                    category: fullItem.category,
                    price: fullItem.price,
                    color: fullItem.color_img.find(color => color.id === cartItem.color_id)?.color_name || '',
                    colorId: fullItem.color_img.find(color => color.id === cartItem.color_id)?.id || '',
                    size: cartItem.size,
                    img: fullItem.color_img.find(color => color.id === cartItem.color_id)?.img || '',
                    quantity: cartItem.quantity
                };
            }
            return null;
        }).filter(item => item !== null);

        const orders = await modelCourse.getOrders(req.session.user.user_id);
        req.session.logoutBack = req.originalUrl;
        return res.render('user/user-order.ejs', { items, user: req.session.user, myCart: fullCartItems, orders });
    } else {
        req.session.loginBack = req.originalUrl;
        return res.redirect('/login');
    }
}

module.exports = {
    getProfilePage, profileEdit, profilePasswordEdit,
    profileImageEdit, getFavoritePage, removeFavoriteItem,
    getCartPage, getOrderPage
}