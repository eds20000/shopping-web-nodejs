import express from "express";
import homeController from '../controller/homeController';
import loginController from '../controller/loginController';
import adminPageController from '../controller/adminPageController';
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



    return app.use('/', router)
}


export default initWebRoute;
