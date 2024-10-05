import express from "express";
import homeController from '../controller/homeController';
import loginController from '../controller/loginController';
import adminPageController from '../controller/adminPageController';
import profileController from '../controller/profileController';
import { userImgUpload, itemImgUpload } from '../middleware/userInfor-updateimg'
const multer = require('multer');
const upload = multer();

let router = express.Router();



const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/login', homeController.loginPage);
    router.post('/login/user-check', loginController.userCheck);
    router.get('/logout', loginController.userLogout);

    router.get('/signup', homeController.signupPage);
    router.post('/signup/user', loginController.userCreate)
    //product-page
    router.get('/product/:id', homeController.productPage);
    router.post('/add-to-favorites', homeController.addToFavorites);

    //admin-page
    router.get('/admin-page', adminPageController.getadminPage)
    router.get('/product-edit/:id', adminPageController.productEdit)
    //item-update
    router.post('/product-edit/update-item', upload.none(), adminPageController.itemUpdate)
    router.post('/upload-img/:id', itemImgUpload.array('image-add', 10), adminPageController.productImgUpload)
    router.get('/item-delete/:id', adminPageController.DeleteItem)
    router.get('/item-colorsize-delete/:itemid/:colorid/:colorsize', adminPageController.DeleteItemColorSize)

    //admin-user-page
    router.get('/admin-users', adminPageController.getUsersPage)
    //user-edit
    router.get('/users-edit/:userId', adminPageController.getUsersEditPage)
    router.get('/users-delete/:userId', adminPageController.DeleteUserById)

    router.post('/users-edit/upload', userImgUpload.single('user_avatar'), adminPageController.userInforUpdate)


    router.get('/user-add', adminPageController.addUserPage)
    router.post('/users-edit/add', userImgUpload.single('user_avatar'), adminPageController.addUser)




    //Profile
    router.get('/user-profile', profileController.getProfilePage)
    router.post('/user-profile/edit/:id', profileController.profileEdit)
    router.post('/user-profile/edit/pass/:id', profileController.profilePasswordEdit)
    router.post('/user-profile/edit/img/:id', userImgUpload.single('user_avatar'), profileController.profileImageEdit)

    router.get('/user-favorite', profileController.getFavoritePage)
    router.get('/remove-favorite/:id', profileController.removeFavoriteItem)

    return app.use('/', router)
}


export default initWebRoute;
