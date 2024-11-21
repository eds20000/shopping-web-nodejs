import multer from "multer";
import path from 'path';

const storageUserImg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/image/user-image'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const storageItemImg = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/image/item-image'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//Review Img
const storageReviewImg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/image/review-image'));

    },
    filename: function (req, file, cb) {
        cb(null, `review-img-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const userImgUpload = multer({ storage: storageUserImg });
const itemImgUpload = multer({ storage: storageItemImg });
const reviewImgUpload = multer({ storage: storageReviewImg})

export { userImgUpload, itemImgUpload,reviewImgUpload };