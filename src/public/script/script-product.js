import {getItemParent} from './script.js';
import list_item from './script.js'

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Lấy thông tin về sản phẩm từ query parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
var productItem = list_item[productId];

var onChangeCart = function(){
    var headerCartBox = $('.header__navbar-cart-box');
    var myCartCount = $('.header__navbar-cart-count');
    var cartItems = {};
    var priceTotal = myCart.reduce((total, item) => total + item.price, 0);
  
    if (myCart.length === 0){
        myCartCount.style.display = 'none';
        headerCartBox.innerHTML = 
        `
            <div class="header__navbar-cart-box-empty">
                <div class="header__navbar-cart-box-empty-img">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <div class="header__navbar-cart-box-empty-content">
                    現在カートに商品はありません。
                </div>
            </div>                       

        `
        }else{
            myCartCount.style.display = 'block';
            myCartCount.innerHTML = myCart.length;
            headerCartBox.style.maxHeight = '80vh'
            
            headerCartBox.innerHTML = 
            `<div class="header__navbar-cart-list">
                                
            </div>
            <div class="header__navbar-cart-checkox">
                <div class="header__navbar-cart-total">合計：<span>￥<div class="header__navbar-cart-total-index"></div></span></div>
                <div class="header__navbar-cart-check-btn"><a href="./cart.html">買い物かごを見る(${myCart.length})</a></div>
            </div>`
            $('.header__navbar-cart-total-index').innerHTML = priceTotal;
            // Duyệt qua myCart và đếm số lượng của mỗi sản phẩm

            myCart.forEach(function(item) {
                const key = `${item.name}-${item.brand}-${item.color}-${item.size}-${item.img}-${item.price}`;
                if (!cartItems[key]) {
                    cartItems[key] = { ...item, quantity: 0 };
                }
                cartItems[key].quantity++;
        
            });
            renderCart();
    }

    
    
    
    
// Duyệt qua cartItems để hiển thị các sản phẩm và số lượng của chúng
    function renderCart() {
        const cartList = document.querySelector('.header__navbar-cart-list');
        cartList.innerHTML = '';
        Object.values(cartItems).forEach(function(a) {
            const key = `${a.name}-${a.brand}-${a.color}-${a.size}-${a.img}-${a.price}`;
            cartList.innerHTML +=
            `<div class="row header__navbar-cart-item" data-key="${key}">
                <div class="col l-3 c-3 m-3 header__navbar-cart-item_img">
                    <a href="http://" class="item-link">
                        <img src="${a.img}" alt="">
                    </a> 
                </div>
        
                <div class="col l-9 c-9 m-9 header__navbar-cart-item_content">
                    <a href="" class="item-link">
                        <div class="header__navbar-cart-item_title">
                            ${a.name}
                        </div>
                    </a>
                    <div class="header__navbar-cart-item_brand">${a.brand}</div>
                    <div class="header__navbar-cart-item_info">
                        <div class="header__navbar-cart-item_info-box">
                            <div class="header__navbar-cart-item_info-color"><b>カラー：</b>${a.color}</div>
                            <div class="header__navbar-cart-item_info-size"><b>サイズ：</b>${a.size}</div>
                        </div>
                        <div class="header__navbar-cart-item_info-quantity-box">
                            <div class="header__navbar-cart-item_info-quantity-down">-</div>
                            <div class="header__navbar-cart-item_info-quantity-num">${a.quantity}</div>
                            <div class="header__navbar-cart-item_info-quantity-up">+</div>
                        </div>
                    </div>
                    <div class="header__navbar-cart-item_info-footer">
                        <div class="header__navbar-cart-item_info-price">￥${a.price}</div>
                        <div class="header__navbar-cart-item_btn-remove"><i class="fa-regular fa-trash-can"></i></div>
                    </div>
                </div>
            </div>`;
        });
       
        document.querySelectorAll('.header__navbar-cart-item').forEach(function(itemElement) {
            const key = itemElement.getAttribute('data-key');
            
            itemElement.querySelector('.header__navbar-cart-item_info-quantity-down').addEventListener('click', function() {
                if (cartItems[key].quantity > 1) {
                    cartItems[key].quantity--;
                } else {
                    delete cartItems[key];
                }
                updateMyCartFromCartItems(); // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
                renderCart();
                onChangeCart();
            });
    
            itemElement.querySelector('.header__navbar-cart-item_info-quantity-up').addEventListener('click', function() {
                cartItems[key].quantity++;
                updateMyCartFromCartItems(); // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
                renderCart();
                onChangeCart();
            });
    
            itemElement.querySelector('.header__navbar-cart-item_btn-remove').addEventListener('click', function() {
                delete cartItems[key];
                updateMyCartFromCartItems(); // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
                renderCart();
                onChangeCart();
            });
        });

    }
    // Hàm cập nhật myCart từ cartItems
    function updateMyCartFromCartItems() {
        myCart = [];
        Object.values(cartItems).forEach(function(item) {
            for (let i = 0; i < item.quantity; i++) {
                myCart.push(item);
            }
        });
    }
    // Thêm sự kiện click cho các nút tăng và giảm số lượng
}

function categoryItemBtn(){
    var itemData = $$('.product-item-data-color_header');
    var favorBtn = $$('.favor-btn');

    itemData.forEach(a => {
        var itemDataList = a.nextElementSibling;
        var chevronText = a.querySelector('.product-item-data-color_header_open p');
        var chevronBtn = a.querySelector('.product-item-data-color_header_open i');
        a.onclick = function() {
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

    favorBtn.forEach(a => {
        a.onclick = function() {
            this.classList.toggle('favor-btn-disable');
            this.classList.toggle('favor-btn-available');
        };
    });
}

// Hàm chuyển đổi hình ảnh
function itemImgChange() {
    var itemImageMain = $('.product-item-image-main img');
    var itemImage = $$('.product-item-image-item');

    itemImage.forEach(function(a) {
        a.onclick = function() {
            itemImage.forEach(function(b) {
                b.classList.remove('main');
            });
            this.classList.add('main');
            itemImageMain.src = this.querySelector('img').src;
        };
    });
}

// Tạo nội dung hình ảnh sản phẩm
function CreateImgItem (){
    var itemImgList = $('.product-item-image_list');
    itemImgList.innerHTML = ''; // Clear the existing content
    for (var i = 0; i < productItem.color_img.length; ++i) {
        for (let a = 0; a < productItem.color_img[i].img.length; ++a) {
            itemImgList.innerHTML += 
                `<li class="product-item-image-item ${i === 0 && a === 0 ? 'main' : ''}">
                    <img src="${productItem.color_img[i].img[a]}" alt="">
                </li>`;
        }
    }
    itemImgChange(); // Reinitialize the image change event after adding new items
}

// Hàm tạo nội dung sản phẩm
function itemProductCreat(){
    var productItemListColor = $('.product-item-data_list');
    productItemListColor.innerHTML = ''; // Clear the existing content

    for (let i = 0; i < productItem.color_img.length; ++i) {
        let colorSize = '';
        for (let y = 0; y < productItem.color_img[i].color_size.length; ++y) {
            colorSize += `<div class="product-item-data-content">
                            <div class="product-item-data-content_size" data-value = "${productItem.color_img[i].color_size[y]}">
                               <span>${productItem.color_img[i].color_size[y]}</span> サイズ / 在庫あり
                            </div>
                            <div class="product-item-data-content_add">
                                <div class="product-item-data-content_addcart">カートに入れる</div>
                            </div>               
                        </div>`;
        }
        productItemListColor.innerHTML += 
            `<div class="product-item-data-color">
                <div class="product-item-data-color_list">
                    <div class="product-item-data-color_item">
                        <div class="product-item-data-color_header" data-value ="${productItem.color_img[i].img[0]}">
                            <img src="${productItem.color_img[i].img[0]}" alt="">
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
                <li class="breadcrumb-item-main"><a href="./index.html">TS-SHOP</a></li>
                <li class="breadcrumb-item">${productItem.category}</li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col l-5 m-5 c-12">
            <div class="product-item-image">
                <div class="product-item-image-main">
                    <img src="${productItem.color_img[0].img[0]}" alt="">
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
                    <div class="product-item-data-title_favor favor-btn favor-btn-disable"></div>
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
            </div>
        </div>
    </div>`;

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
var myCart=[]
$$('.product-item-data-content_addcart').forEach(function(addCartBtn){
    addCartBtn.onclick = function(){
        // Lấy thông tin sản phẩm từ phần tử cha của nút "カートに入れる"
        var productName = $('.product-item-data-title_name').dataset.value;
        var productBrand = getItemParent(this,'.product-item-data').querySelector('.product-item-data-brand').dataset.value;
        var productImgSrc = getItemParent(this,'.product-item-data-color_item').querySelector('.product-item-data-color_header').dataset.value;
        var productPrice = parseInt(getItemParent(this,'.product-item-data').querySelector('.product-item-data-price_index').dataset.value);
        var productSize = getItemParent(this,'.product-item-data-content').querySelector('.product-item-data-content_size').dataset.value; // Lấy kích cỡ từ chuỗi
        var productColor = getItemParent(this,'.product-item-data-color_item').querySelector('.product-item-data-color_header_title').dataset.value;
        // Thêm sản phẩm vào giỏ hàng
        console.log(productName,
        productBrand,
        productImgSrc,
        productPrice,
        productSize,
        productColor)
        myCartProxy.push({
            name: productName,
            brand: productBrand,
            img: productImgSrc,
            price: productPrice,
            size: productSize,
            color: productColor
        });
    };
    
    let myCartProxy = new Proxy(myCart, {
        set(target, property, value, receiver) {
            // Thực hiện hành động mặc định
            let result = Reflect.set(target, property, value, receiver);

            // Kiểm tra nếu hành động là thêm hoặc thay đổi một phần tử trong mảng
            if (property !== 'length') {
                onChangeCart();
            }

            return result;
        },
        deleteProperty(target, property) {
            // Thực hiện hành động mặc định
            let result = Reflect.deleteProperty(target, property);

            // Gọi hàm khi một phần tử bị xóa
            onChangeCart();

            return result;
        }
    });

    // Gán sự kiện click cho nút "カートに入れる"
    addCartBtn.onclick = function() {
        // Lấy thông tin sản phẩm từ phần tử cha của nút "カートに入れる"
        var productName = this.closest('.product-item-data').querySelector('.product-item-data-title_name').dataset.value;
        var productBrand = this.closest('.product-item-data').querySelector('.product-item-data-brand').dataset.value;
        var productImgSrc = this.closest('.product-item-data-color_item').querySelector('.product-item-data-color_header').dataset.value;
        var productPrice = parseInt(this.closest('.product-item-data').querySelector('.product-item-data-price_index').dataset.value);
        var productSize = this.closest('.product-item-data-content').querySelector('.product-item-data-content_size').dataset.value;
        var productColor = this.closest('.product-item-data-color_item').querySelector('.product-item-data-color_header_title').dataset.value;

        // Thêm sản phẩm vào giỏ hàng
        myCart.push({
            name: productName,
            brand: productBrand,
            img: productImgSrc,
            price: productPrice,
            size: productSize,
            color: productColor
        });

        // Cập nhật giỏ hàng sau khi thêm sản phẩm
        onChangeCart();
    };
});

onChangeCart();


