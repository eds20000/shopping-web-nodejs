import models from '../models/admin/adminPage.model'
import modelCourse from '../models/course'
import modelReview from '../models/review.model'
import usersEdit from '../models/admin/userEdit.model'


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
    const items = await models.getItems()
    const categories = await modelCourse.getCategories()
    let myCart = []
    const reviews = await modelReview.getReview();
    await Promise.all(reviews.map(async (review) => {
        const reviewLikes = await modelReview.getReviewLike(review.id);
        review.reviewLikeUserId = reviewLikes;
    }));
    if (req.cookies && req.cookies.myCart) {
        myCart = req.cookies.myCart
    }
    if (req.session.user) {
        if (req.cookies && req.cookies.myCart) {
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
        res.render('index', { items, user: req.session.user, myCart: fullCartItems,reviews,categories });
    } else {
        req.session.loginBack = req.originalUrl;
        res.render('index', { items, user: null, myCart: myCart,reviews,categories });
    }
}

let productPage = async (req, res) => {
    const items = await models.getItems();
    const itemId = req.params.id;
    const reviews = await modelReview.getReviewByItemid(itemId);
    const ratingSum = reviews.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.rating;
    }, 0);
    // Nếu muốn trả về cả reviews và ratingSum
    const reviewsList = {
        reviews,
        ratingSum
    };
    await Promise.all(reviewsList.reviews.map(async (review) => {
        const reviewLikes = await modelReview.getReviewLike(review.id);
        review.reviewLikeUserId = reviewLikes;
    }));

    let item;
    if (itemId) {
        item = (await models.getItemById(itemId))[0];
    }

    let myCart = [];
    if (req.cookies && req.cookies.myCart) {
        myCart = req.cookies.myCart;
    }

    if (req.session.user) {
        if (req.cookies && req.cookies.myCart) {
            // Sử dụng for...of với await để đảm bảo thực thi tuần tự
            for (const item of myCart) {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size);
            }
            res.clearCookie('myCart');
        }

        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;

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
        res.render('product.ejs', { items, item, user: req.session.user, myCart: fullCartItems, itemId, reviewsList ,scrollToElement: req.query.scrollToElement || null });
    } else {
        req.session.loginBack = req.originalUrl;
        res.render('product.ejs', { items, item, user: null, myCart: myCart, itemId, reviewsList ,scrollToElement: req.query.scrollToElement || null });
    }
};

let handleReviewLike = async (req, res) => {
    const reviewId = req.params.reviewId;

    // Kiểm tra xem user có đăng nhập không
    if (req.session.user) {
        try {
            const result = await modelReview.handleReviewLike(reviewId, req.session.user.user_id);
            if (result) {
                return res.status(200).json({ message: "Review like deleted successfully." });
            } else {
                return res.status(400).json({ message: result.message });
            }
        } catch (error) {
            console.error("Error deleting review like:", error);
            return res.status(500).json({ message: "An internal server error occurred." });
        }
    } else {
        return res.status(401).json({ message: "User not logged in." });
    }
}

let addReview = async (req, res) => {
    try {
        if (req.session.user) {
            const itemId = req.params.itemId;
            const userId = req.session.user.user_id;
            const rating = req.body.rating;
            const reviewTitle = req.body.review_title || '';
            const reviewText = req.body.review_text || '';
            const [colorName, size] = req.body.color_name.split('-');

            // Kiểm tra nếu không có file upload
            const filePaths = req.files ? req.files.map(file => file.filename) : [];

            console.log('Files:', req.files);

            // Thêm review vào cơ sở dữ liệu
            await modelReview.addReview(
                itemId,
                userId,
                colorName,
                size,
                rating,
                reviewTitle,
                reviewText,
                filePaths.join(',') // Lưu các đường dẫn ảnh dưới dạng chuỗi
            );

            // Chuyển hướng về trang sản phẩm
            req.session.logoutBack = req.originalUrl;
            return res.redirect(`/product/${itemId}`);
        } else {
            req.session.loginBack = req.originalUrl;
            return res.redirect('/login');
        }
    } catch (error) {
        console.error('Error in addReview:', error);
        res.status(500).send('Internal Server Error');
    }
};

let updateReview = async (req, res) => {
    if (req.session.user) {
        const itemId = req.params.itemId
        const userId = req.session.user.user_id
        const rating = req.body.rating
        const reviewTitle = req.body.review_title
        const reviewText = req.body.review_text
        const [colorName, size] = req.body.color_name.split('-');
        const filePaths = req.files ? req.files.map(file => file.filename) : (req.body['review-img'] ? [req.body['review-img']] : []);

        console.log(itemId, userId, colorName, size, rating, reviewText)
        await modelReview.updateReview(itemId, userId, colorName, size, rating,reviewTitle, reviewText,filePaths.join(','))
        req.session.logoutBack = req.originalUrl;
        return res.redirect(`/product/${itemId}`);
    }

    else {
        req.session.loginBack = req.originalUrl;
        return res.redirect('/login');
    }
}
let deleteReview = async (req,res) =>{
    if(req.session.user){
        const reviewId = req.params.reviewId
        console.log(reviewId)
        await modelReview.deleteReview(reviewId)
        return res.redirect(req.session.logoutBack);
    }
    else {
        return res.redirect('/login');
    }
}
let getChatSupport = async(req,res) =>{
    const users = await usersEdit.getUsers()
    if(req.session.user){       
        const items = await models.getItems()
        let myCart = []
        let chatList =null;
        if (req.cookies && req.cookies.myCart) {
            myCart.forEach(async item => {
                await modelCourse.addToCart(req.session.user.user_id, item.id, item.colorId, item.size)
            })
            res.clearCookie('myCart')
        }
        const favorItems = await modelCourse.getFavoriteItems(req.session.user.user_id);
        const cartItems = await modelCourse.getCartItems(req.session.user.user_id);
        req.session.user.favorItems = favorItems;
        req.session.user.cartItems = cartItems;
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

        if(req.session.user.user_role ==='admin'){
            chatList = await models.getChatList(req.session.user.user_name);
        }
        req.session.logoutBack = req.originalUrl;
        res.render('chatSupport', {items,users, user: req.session.user, myCart: fullCartItems,chatList});
    }
    else {
        req.session.loginBack = req.originalUrl;
        return res.redirect('/login');
    }
}


module.exports = {
    getHomepage, productPage, addToFavorites, handleReviewLike, addReview,updateReview,deleteReview,getChatSupport}