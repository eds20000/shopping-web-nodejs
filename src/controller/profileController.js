import userProfileEdit from '../models/profile/profileEdit'
import models from '../models/admin/adminPage.model'
import modelCourse from '../models/course'
import bcrypt from 'bcryptjs';


// password hashing
const salt = bcrypt.genSaltSync(10);


//Profile
let getProfilePage = async (req, res) => {
    const items = await models.getItems();
    if (req.session.user) {
        return res.render('profile.ejs', { items, user: req.session.user })
    } else {
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
        return res.render('favorite.ejs', { user: req.session.user, favorItems, items })
    } else {
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

module.exports = {
    getProfilePage, profileEdit, profilePasswordEdit,
    profileImageEdit, getFavoritePage, removeFavoriteItem
}