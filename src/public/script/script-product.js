"use strict";
var productItem = list_item[productId];

function categoryItemBtn() {
    var itemData = $$('.product-item-data-color_header');
    var favorBtn = $$('.favor-btn');

    itemData.forEach(a => {
        var itemDataList = a.nextElementSibling;
        var chevronText = a.querySelector('.product-item-data-color_header_open p');
        var chevronBtn = a.querySelector('.product-item-data-color_header_open i');
        a.onclick = function () {
            itemDataList.classList.toggle('item-data-open');
            chevronBtn.classList.toggle('fa-chevron-up');
            chevronBtn.classList.toggle('fa-chevron-down');
            if (chevronText.innerHTML === '在庫を確認する') {
                chevronText.innerHTML = '閉じる';
            } else {
                chevronText.innerHTML = '在庫を確認する';
            }
        };
    });
}

// Hàm chuyển đổi hình ảnh
function itemImgChange() {
    var itemImageMain = $('.product-item-image-main img');
    var itemImage = $$('.product-item-image-item');

    itemImage.forEach(function (a) {
        a.onclick = function () {
            itemImage.forEach(function (b) {
                b.classList.remove('main');
            });
            this.classList.add('main');
            itemImageMain.src = this.querySelector('img').src;
        };
    });
}

// Tạo nội dung hình ảnh sản phẩm
function CreateImgItem() {
    var itemImgList = $('.product-item-image_list');
    itemImgList.innerHTML = ''; // Clear the existing content
    for (var i = 0; i < productItem.color_img.length; ++i) {
        for (let a = 0; a < productItem.color_img[i].img.length; ++a) {
            itemImgList.innerHTML +=
                `<li class="product-item-image-item ${i === 0 && a === 0 ? 'main' : ''}">
                    <img src="/image/item-image/${productItem.color_img[i].img[a]}" alt="">
                </li>`;
        }
    }
    itemImgChange(); // Reinitialize the image change event after adding new items
}

// Hàm tạo nội dung sản phẩm
function itemProductCreat() {
    var productItemListColor = $('.product-item-data_list');
    productItemListColor.innerHTML = ''; // Clear the existing content

    for (let i = 0; i < productItem.color_img.length; ++i) {
        let colorSize = '';
        for (let y = 0; y < productItem.color_img[i].color_size.length; ++y) {
            colorSize += `<div class="product-item-data-content">
                            <div class="product-item-data-content_size" data-value = "${productItem.color_img[i].color_size[y].size}">
                               <span>${productItem.color_img[i].color_size[y].size}</span> サイズ / 在庫あり
                            </div>
                            <div class="product-item-data-content_add">
                                <div class="product-item-data-content_addcart">カートに入れる</div>
                            </div>               
                        </div>`;
        }
        productItemListColor.innerHTML +=
            `<div class="product-item-data-color" data-colorid = "${productItem.color_img[i].id}">
                <div class="product-item-data-color_list">
                    <div class="product-item-data-color_item">
                        <div class="product-item-data-color_header" data-value ="${productItem.color_img[i].img[0]}">
                            <img src="/image/item-image/${productItem.color_img[i].img[0]}" alt="">
                            <div class="product-item-data-color_header_text">
                                <div class="product-item-data-color_header_title" data-value ="${productItem.color_img[i].color_name}" >${productItem.color_img[i].color_name}</div>
                                <div class="product-item-data-color_header_open">
                                    <p>在庫を確認する</p>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>                     
                        </div>
                        <div class="product-item-data-size">
                            ${colorSize}
                        </div>
                    </div>
                </div>
            </div>`;
    }
    categoryItemBtn(); // Reinitialize the category and favor button events after adding new items
}

// Hiển thị thông tin sản phẩm
var productItemContainer = $('.product-item-container');
productItemContainer.innerHTML =
    `<div class="row">
        <div class="breadcrumb">
            <ul class="breadcrumb-list">
                <li class="breadcrumb-item-main"><a href="/">TS-SHOP</a></li>
                <li class="breadcrumb-item">${productItem.category}</li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col l-5 m-5 c-12">
            <div class="product-item-image">
                <div class="product-item-image-main">
                    <img src="/image/item-image/${productItem.color_img[0].img[0]}" alt="">
                    <div class="product-item-btn product-item-btnNext"><i class="fa-solid fa-angle-right"></i></div>
                    <div class="product-item-btn product-item-btnPrev"><i class="fa-solid fa-angle-left"></i></div>
                </div>
                <ul class="product-item-image_list"></ul>
            </div>
        </div>
        <div class="col l-7 m-7 c-12">
            <div class="product-item-data">
                <div class="product-item-data-title">
                    <div class="product-item-data-title_name" data-value = "${productItem.name}">${productItem.name}</div>
                    <a ${user ? `onclick="addToFavorites(${productItem.id},this)"` : 'href="/login"'} class="product-item-data-title_favor favor-btn ${user && user.favorItems.find(item => item.item_id === productItem.id) ? 'favor-btn-available' : 'favor-btn-disable'}" "></a>
                    <div class="product-item-data-title-favornum">900</div>
                </div>
                <div class="product-item-data-brand" data-value ="${productItem.brand}">
                    ${productItem.brand}
                </div>
                <div class="product-item-data-price">￥
                    <div class="product-item-data-price_index" data-value = "${productItem.price}">${productItem.price}</div>
                    <div class="product-item-data-price_tax">税込</div>
                </div>
                <div class="product-item-data_list"></div>
                <div class="product-item-data-infor">
                    <div class="product-item-data-infor_title">商品情報</div>
                    <div class="product-item-data-infor_content">
                        ${productItem.infor}
                    </div>
                </div>
                <div class="product-item-data-review">
                    <div class="product-item-data-review_title">レビュー</div>
                    <div class="product-item-data-review_content">
                        <div class="product-item-data-review_content-tensu">
                            <div class="product-item-data-review_content-score">
                                ${reviews.ratingSum > 0 ? reviews.ratingSum / reviews.reviews.length : 0}
                            </div>
                            <div class="stars-outer">
                                <div class="stars-inner" style="width: ${reviews.ratingSum > 0 ? (reviews.ratingSum / reviews.reviews.length) / 5 * 100 : 0}%;"></div>
                            </div>
                            <div class="product-item-data-review_content-number">
                                (${reviews.reviews.length})
                            </div>
                        </div>
                        <div class="product-item-data-review_content-box">                     
                        </div>
                        <div class="bar-page">
                            <div class="bar-page_list">
                                        
                            </div>
                        </div>
                        ${user ? 
                            // Kiểm tra xem người dùng có đánh giá không
                            (reviews.reviews.find(review => review.user_name === user.user_name) 
                                ? 
                                // Nếu có, hiển thị phần chỉnh sửa đánh giá
                                reviews.reviews.map(review => 
                                    review.user_name === user.user_name ? `
                                        <div class="product-item-data-review_add">
                                            <div class="product-item-data-review_add--username">${user.user_name}</div>
                                            <form action="/update-review/${productItem.id}" method="post" id="review-form">
                                                <div class="form-group">
                                                    <label for="name">カラー - サイズ：</label>
                                                    <select name="color_name">
                                                        ${item.color_img.map(colorImg =>
                                                            colorImg.color_size.map(colorSize =>
                                                                `<option value="${colorImg.color_name}-${colorSize.size}" ${review.color_name == colorImg.color_name && review.size == colorSize.size ? `selected` : ``}>
                                                                    ${colorImg.color_name} - ${colorSize.size}
                                                                </option>`
                                                            ).join('')
                                                        ).join('')}
                                                    </select>
                                                    <span class="form-message"></span>
                                                </div>
                                                <div class="form-group">
                                                    <div class="star-rating-title">評価：</div>
                                                    <div class="star-rating">
                                                        ${[5, 4, 3, 2, 1].map(rating =>
                                                            `<input type="radio" name="rating" id="rating-${rating}" value="${rating}" ${review.rating == rating ? `checked` : ``}>
                                                             <label for="rating-${rating}"></label>`
                                                        ).join('')}
                                                    </div>
                                                    <span class="form-message"></span>

                                                </div>
                                                <div class ="form-group">
                                                    <label for="review_title">タイトル</label>
                                                    <input type="text" name="review_title" id="review_title" class"review_title" value="${review.review_title}">
                                                    <span class="form-message"></span>
                                                </div>
                                                <div class="form-group">
                                                    <label for="review_text">内容</label>
                                                    <textarea id="review_text" name="review_text" rows="4" placeholder="レビュー" style="width:100%">${review.review_text}</textarea>
                                                    <span class="form-message"></span>
                                                </div>
                                                <div class="action-btn">
                                                    <button type="submit" class="primary-btn review-submit-btn">レビューを変更</button>
                                                    <a class="primary-btn review-delete-btn" href ="/delete-review/${review.id}">レビューを削除</a>
                                                </div>
                                            </form>
                                        </div>` : ''
                                ).join('') 
                                : 
                                // Nếu không có đánh giá, hiển thị phần viết đánh giá mới
                                `
                                <div class="product-item-data-review_add">
                                    <div class="product-item-data-review_add--username">${user.user_name}</div>
                                    <form action="/add-review/${productItem.id}" method="post" id="review-form">
                                        <div class="form-group">
                                            <label for="name">カラー - サイズ：</label>
                                            <select name="color_name">
                                                ${item.color_img.map(colorImg =>
                                                    colorImg.color_size.map(colorSize =>
                                                        `<option value="${colorImg.color_name}-${colorSize.size}">${colorImg.color_name} - ${colorSize.size}</option>`
                                                    ).join('')
                                                ).join('')}
                                            </select>
                                            <span class="form-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <div class="star-rating-title">評価：</div>
                                            <div class="star-rating">
                                                ${[5, 4, 3, 2, 1].map(rating =>
                                                    `<input type="radio" name="rating" id="rating-${rating}" value="${rating}">
                                                     <label for="rating-${rating}"></label>`
                                                ).join('')}
                                            </div>
                                            <span class="form-message"></span>
                                        </div>
                                        <div class ="form-group">
                                            <label for="review_title">タイトル</label>
                                            <input type="text" name="review_title" id="review_title" class"review_title" value="">
                                            <span class="form-message"></span>
                                        </div>
                                        <div class="form-group">
                                            <label for="review_text">内容</label>
                                            <textarea id="review_text" name="review_text" rows="4" placeholder="レビュー" style="width:100%"></textarea>
                                            <span class="form-message"></span>
                                        </div>
                                        <button type="submit" class="primary-btn review-submit-btn">レビューを書く</button>
                                    </form>
                                </div>`
                            ) : 
                            // Nếu người dùng chưa đăng nhập, hiển thị nút đăng nhập
                            `<a href="/login" class="primary-btn product-item-data-review_add-btn">レビューを書く</a>`
                        }
                        </div>
                </div>
            </div>
        </div>
    </div>`;
Validator({
    form:'#review-form',
    formGroupSelector:'.form-group',
    errorSelector:'.form-message',
    rules:[
        Validator.isRequired('input[name="review_title"]','タイトルを入力してください。'),
        Validator.isRequired('textarea[name="review_text"]','内容を入力してください。'),
        Validator.isRequired('input[name="rating"]','評価を入力してください。'),
    ]
    })
function ReviewLike(reviewId, a) {
    fetch(`/review-like/${reviewId}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                const currentReview = window.currentList.find(review => review.id === reviewId);
                const likeCountElement = a.nextElementSibling;
                if (a.classList.contains('like-icon-checked')) {
                    a.classList.remove('like-icon-checked')
                    likeCountElement.innerText = parseInt(likeCountElement.innerText) - 1
                    if (currentReview && currentReview.reviewLikeUserId) {
                        const index = currentReview.reviewLikeUserId.indexOf(user.user_id);
                        if (index > -1) currentReview.reviewLikeUserId.splice(index, 1);
                    }
                }
                else {
                    a.classList.add('like-icon-checked')
                    likeCountElement.innerText = parseInt(likeCountElement.innerText) + 1
                    if (currentReview) {
                        currentReview.reviewLikeUserId = currentReview.reviewLikeUserId || [];
                        currentReview.reviewLikeUserId.push(user.user_id);
                    }
                }
            }
            return response.json();
        })
}

//Pagination ------------------------------------------
let currentPage = 1 //元のページ
let perPage = 4 //so trang di chuyen 
let totalPage = 0// ページの数
let perItem = [] //アイテムが表示される
function getItem(list) {
    perItem = list.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
    renderPageNumber(list)
    reviewRender()
}
function handlerPageNumber(num, element) {
    $$('.bar-page_list-item').forEach(item => {
        item.classList.remove('page-checked');
    });
    // Thêm class 'page-checked' vào trang hiện tại
    element.classList.add('page-checked');
    currentPage = num
    perItem = window.currentList.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)
    reviewRender()
}

function renderPageNumber(list) {
    window.currentList = list;
    totalPage = Math.ceil(list.length / perPage);
    for (let i = 1; i <= totalPage; i++) {
        if (totalPage > 1) {
            if (i == 1) {
                $('.bar-page_list').innerHTML += `<a class="bar-page_list-item page-checked" onclick="handlerPageNumber(${i},this)"> ${i}</a>`
            } else {
                $('.bar-page_list').innerHTML += `<a class="bar-page_list-item" onclick="handlerPageNumber(${i},this)"> ${i}</a>`
            }
        }
    }

}

//レビューリストを抽出
function reviewRender() {
    if($('.product-item-data-review_content-box')){
        $('.product-item-data-review_content-box').innerHTML = 
        `${perItem.map(review => `
            <div class="product-item-data-review_content-item">
                <div class="product-item-data-review_content-name">
                    <strong>${review.user_name[0] + '*'.repeat(review.user_name.length - 2) + review.user_name.slice(-1)}</strong>
                    <span class="product-item-data-review_content-date">${review.created_at}</span>
                </div>
                <div class="product-item-data-review_content-product">
                    <strong>カラー：</strong> ${review.color_name}
                    <strong>サイズ：</strong> ${review.size}
                </div>
                <div class="product-item-data-review_content-star">
                    ${Array.from({ length: review.rating }).map(() => '<i class="fa-solid fa-star"></i>').join('')}
                    <strong>${review.review_title}</strong>
                </div>
                <div class="product-item-data-review_content-text">
                    ${review.review_text}
                </div>
                <div class="product-item-data-review_content-like">
                    ${user ?
                        review.reviewLikeUserId != null && review.reviewLikeUserId.includes(user.user_id) ?
                        `
                        <a onclick="ReviewLike(${review.id},this)" class="review-like like-icon-checked">
                        ` 
                        : 
                        `
                        <a onclick="ReviewLike(${review.id},this)" class="review-like">
                        ` 
                        
                    :
                    `<a href = "/login" class="review-like">`}
                        <i class="fa-regular fa-thumbs-up"></i>
                    </a> いいね！(<span class="reviewLikeQuantity">${review.reviewLikeUserId != null ? review.reviewLikeUserId.length : 0}</span>)
                </div >
            </div >
        `).join('')}
        `
    }
}
if (Array.isArray(reviews.reviews) && reviews.reviews.length > 0) {
    getItem(reviews.reviews);
}

// Tạo nội dung hình ảnh và sản phẩm
CreateImgItem();
itemProductCreat();
// Hàm chuyển đổi hình ảnh khi nhấn nút "Next" và "Prev"
function initImageSlider() {
    const btnNext = $('.product-item-btnNext');
    const btnPrev = $('.product-item-btnPrev');
    const itemImageMain = $('.product-item-image-main img');
    let currentImageIndex = 0;

    function updateMainImage(index) {
        const allImages = $$('.product-item-image-item img');
        if (index >= allImages.length) index = 0;
        if (index < 0) index = allImages.length - 1;
        currentImageIndex = index;
        itemImageMain.src = allImages[currentImageIndex].src;
        $$('.product-item-image-item').forEach(item => item.classList.remove('main'));
        allImages[currentImageIndex].closest('.product-item-image-item').classList.add('main');
    }

    btnNext.onclick = () => {
        updateMainImage(currentImageIndex + 1);
    };

    btnPrev.onclick = () => {
        updateMainImage(currentImageIndex - 1);
    };
}

// Khởi tạo slider hình ảnh
initImageSlider();
$$('.product-item-data-content_addcart').forEach(function (addCartBtn) {
    addCartBtn.onclick = function () {
        var productId = productItem.id;
        var productName = productItem.name;
        var productBrand = productItem.brand;
        var productCategory = productItem.category;
        var productPrice = productItem.price;
        var productSize = this.parentElement.closest('.product-item-data-content').querySelector('.product-item-data-content_size').dataset.value; // Lấy kích cỡ từ chuỗi
        var productColor = this.parentElement.closest('.product-item-data-color').querySelector('.product-item-data-color_header_title').dataset.value;
        var productColorId = parseInt(this.parentElement.closest('.product-item-data-color').dataset.colorid);
        var productImgSrc = productItem.color_img.find(item => item.id === productColorId).img;

        console.log(productImgSrc, productSize, productColor, productColorId)
        // Thêm sản phẩm vào giỏ hàng
        if (myCart.some(item => item.name === productName && item.brand === productBrand && item.color === productColor && item.size === productSize && item.id === productId)) {
            myCart.forEach(item => {
                if (item.name === productName && item.brand === productBrand && item.color === productColor && item.size === productSize && item.id === productId) {
                    item.quantity++;
                }
            });
        }
        else {
            proxyCart.push({
                id: productId,
                name: productName,
                brand: productBrand,
                category: productCategory,
                img: productImgSrc,
                price: productPrice,
                size: productSize,
                color: productColor,
                colorId: productColorId,
                quantity: 1,
            });
        }
        console.log(myCart)
        onChangeCart()
        header.style.transform = 'translateY(0)';
        if (user) {
            addToCart(productId, productColorId, productSize, user);
        }
    };
});
function TakeCartBoxHide() {
    let takeCartBtn = $('.navbar-cart');
    let takeCartBoxClosebtn = $('.header__navbar-cart-box-closeBtn');
    takeCartBtn.onclick = function () {
        $(' .header__navbar-cart-box-container').classList.add('cart-box-hide');
        document.body.classList.add('over')
        $('.header').style.zIndex = '10';
        $('.over-play').style.display = 'block'
        document.body.style.position = 'fixed'
    }
    takeCartBoxClosebtn.onclick = function () {
        $(' .header__navbar-cart-box-container').classList.remove('cart-box-hide');
        document.body.classList.remove('over')
        $('.over-play').style.display = 'none'
        document.body.style.position = ''
        $('.header').style.zIndex = '2';
    }
}
if (window.innerWidth < 1024) {
    TakeCartBoxHide()
}
else {
    $('.header__navbar-cart').addEventListener('mouseenter', function () {
        $(' .header__navbar-cart-box-container').style.display = 'block';
    });

    // Gán sự kiện mouseleave để thay đổi màu nền khi di chuột ra
    $('.header__navbar-cart').addEventListener('mouseleave', function () {
        $(' .header__navbar-cart-box-container').style.display = 'none';

    });
    $('.header__navbar-cart-box-container').addEventListener('mouseenter', function () {
        $(' .header__navbar-cart-box-container').style.display = 'block';
    });

    // Gán sự kiện mouseleave để thay đổi màu nền khi di chuột ra
    $('.header__navbar-cart-box-container').addEventListener('mouseleave', function () {
        $(' .header__navbar-cart-box-container').style.display = 'none';

    });
}




