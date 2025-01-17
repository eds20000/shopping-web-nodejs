import express from "express";
import homeController from '../controller/homeController';
import loginController from '../controller/loginController';
import forgotController from '../controller/forgotController'
import adminPageController from '../controller/adminPageController';
import profileController from '../controller/profileController';
import cartController from '../controller/cartController';
import orderController from '../controller/orderController';
import categoryController from '../controller/categoryController';
import { userImgUpload, itemImgUpload,reviewImgUpload} from '../middleware/userInfor-updateimg'

import models from '../models/admin/adminPage.model'


const multer = require('multer');
const upload = multer();

let router = express.Router();



const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);

    router.get('/login', (req, res) => { return res.render('login.ejs') });
    router.post('/login/user-check', loginController.userCheck);
    router.get('/logout', loginController.userLogout);

    router.get('/signup',(req, res) => { return res.render('signup.ejs') });
    router.post('/signup/user', loginController.userCreate)
    router.get('/verify-email',loginController.userCreateChecked)

    router.get('/forgot',(req, res) => { return res.render('forgot.ejs',{sendEmail:false})})
    router.post('/forgot-password',forgotController.forgotPasswordCheck)
    router.get('/reset-password/:token',forgotController.resetPassword)
    router.post('/reset-password/:userid',forgotController.resetPasswordForm)

    //product-page
    router.get('/product/:id', homeController.productPage);
    router.get('/product/:id?scrollToElement=#reviews-section', homeController.productPage);
    router.post('/add-to-favorites', homeController.addToFavorites);
    router.get('/review-like/:reviewId', homeController.handleReviewLike);
    router.post('/add-review/:itemId', reviewImgUpload.array('review-img',10), homeController.addReview)
    router.post('/update-review/:itemId',reviewImgUpload.array('review-img',10), homeController.updateReview)
    router.get('/delete-review/:reviewId',homeController.deleteReview)

    //admin-page
    router.get('/admin-page', adminPageController.getadminPage)
    router.get('/product-edit/:id', adminPageController.productEdit)
    router.get('/product-add', adminPageController.productAdd)


    //item-update
    router.post('/product-edit/update-item', upload.none(), adminPageController.itemUpdate)
    router.post('/product-edit/add-item', upload.none(), adminPageController.itemAdd)
    router.post('/upload-img/:id', itemImgUpload.array('image-add', 10), adminPageController.productImgUpload)
    router.post('/upload-img-add/', itemImgUpload.array('image-add', 10), adminPageController.productImgUploadAdd)
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

    //admin-order-page
    router.get('/admin-orders', adminPageController.getOrdersPage)
    router.post('/admin-orders/edit', adminPageController.editOrder)

    //admin-review-page
    router.get('/admin-reviews',adminPageController.getReviewsPage)


    //Profile
    router.get('/user-profile', profileController.getProfilePage)
    router.post('/user-profile/edit/:id', profileController.profileEdit)
    router.post('/user-profile/edit/pass/:id', profileController.profilePasswordEdit)
    router.post('/user-profile/edit/img/:id', userImgUpload.single('user_avatar'), profileController.profileImageEdit)

    router.get('/user-favorite', profileController.getFavoritePage)
    router.get('/remove-favorite/:id', profileController.removeFavoriteItem)
    router.get('/user-cart', profileController.getCartPage)

    router.get('/user-order', profileController.getOrderPage)
    router.post('/user-order/remove', orderController.deleteOrder)
    router.get('/user-order/tracking/:orderId', orderController.orderTracking)

    //cart
    router.post('/add-to-cart/:id', cartController.addToCart)
    router.post('/set-cart-cookie', (req, res) => {
        console.log(req.cookies.myCart)
        res.cookie('myCart', req.body.myCart, { maxAge: 900000, httpOnly: true });
        res.sendStatus(200);
    })
    router.get('/getCartPage', cartController.getCartPage)
    router.get('/getCartPage-reset', cartController.getCartPage)
    router.post('/remove-from-cart', cartController.removeFromCart)
    router.post('/decrease-quantity-item-cart', cartController.decreaseQuantityItemCart)
    router.post('/increase-quantity-item-cart', cartController.increaseQuantityItemCart)

    //address-add
    router.post('/user-address-add',profileController.addAddress)
    router.get('/user-address-delete/:addressId',profileController.deleteAddress)

    //take-order
    router.post('/take-order', orderController.takeOrder)


    //Category
    router.get('/category', categoryController.getCategoryPage)
    router.post('/category', categoryController.getCategoryPage)


    //Chat support

    router.get('/chat-box',homeController.getChatSupport)
    router.get('/chatbox-roomDelete/:roomId',models.chatRoomDelete)
    return app.use('/', router)
}


export default initWebRoute;
