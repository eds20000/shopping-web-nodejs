import express from "express";
import homeController from '../controller/homeController';
import loginController from '../controller/loginController';
import adminPageController from '../controller/adminPageController';
import { upload } from '../middleware/userInfor-updateimg'
let router = express.Router();



const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/login', homeController.loginPage);
    router.post('/login/user-check', loginController.userCheck);
    router.get('/logout', loginController.userLogout);

    router.get('/signup', homeController.signupPage);
    router.post('/signup/user', loginController.userCreate)

    router.get('/product/:id', homeController.productPage);

    //admin-page
    router.get('/admin-page', adminPageController.getadminPage)
    router.get('/product-edit/:id', adminPageController.productEdit)

    router.get('/item-delete/:id', adminPageController.DeleteItem)
    router.get('/item-colorsize-delete/:itemid/:colorid/:colorsize', adminPageController.DeleteItemColorSize)

    //admin-user-page
    router.get('/admin-users', adminPageController.getUsersPage)
    //user-edit
    router.get('/users-edit/:userId', adminPageController.getUsersEditPage)
    router.get('/users-delete/:userId', adminPageController.DeleteUserById)

    router.post('/users-edit/upload', upload.single('user_avatar'), adminPageController.userInforUpdate)

    router.get('/user-add', adminPageController.addUserPage)
    router.post('/users-edit/add', upload.single('user_avatar'), adminPageController.addUser)

    //Profile
    router.get('/user-profile', homeController.getProfilePage)





    return app.use('/', router)
}


export default initWebRoute;
