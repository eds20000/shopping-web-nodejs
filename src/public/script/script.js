"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//HEADER TAB HIDE //
let lastScrollTop = 0;
const header = $('.header');
const headerHeight = header.clientHeight; // Chiều cao của header
const scrollThreshold = headerHeight; // Giá trị ngưỡng cuộn
const headerSearch = $('.header__search')

if (window.innerWidth > 1023) {
    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Cuộn xuống và vượt ngưỡng
            header.style.transform = 'translateY(-100%)';
        } else {
            // Cuộn lên hoặc chưa vượt ngưỡng
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}
if (window.innerWidth < 1023) {
    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            headerSearch.style.display = 'flex'
            $('.header__logo').style.display = 'none'
        } else {
            headerSearch.style.display = 'none'
            $('.header__logo').style.display = 'block'
        }
    });
}

//
// <!---------------Page-bar--------Start--> 


//item start//
var pageButton = document.querySelectorAll(".bar-page_list-item");
Array.from(pageButton).forEach(function (item) {
    item.addEventListener('click', function () {
        document.querySelector('.page-checked').classList.remove('page-checked')
        this.classList.add('page-checked');
    });
}

);

//Item
//Set-cartProxy
const handlerCartProxy = {
    set(target, property, value) {
        target[property] = value; // Cập nhật giá trị trong mảng
        setCartCookie(target); // Lưu vào cookies
        return true; // Trả về true để cho phép thay đổi
    },
    deleteProperty(target, property) {
        delete target[property]; // Xóa phần tử trong mảng
        setCartCookie(target); // Lưu vào cookies
        return true; // Trả về true để cho phép xóa
    }
};
const proxyCart = new Proxy(myCart, handlerCartProxy);

var recommendList = $('.section__recommend-list')
var newList = $('.section__new-list')
var bestsellersList = $('.section__best_sellers-list')
var mensList = $('.section__mens-list')
var womensList = $('.section__womens-list')
var cosmeticsList = $('.section__cosmetics-list')
if (recommendList) {
    exportItemByCategory(recommendList,'recommended', 'l-2');
}
if (newList) {
    exportItemByCategory(newList,'new_arrivals', 'l-2');
}
if (bestsellersList) {
    exportItemByCategory(bestsellersList,'best_sellers', 'l-2');
}
if (mensList) {
    exportItemByCategory(mensList,'mens', 'l-2');
}
if (womensList) {
    exportItemByCategory(womensList,'womens', 'l-2');
}
if (cosmeticsList) {
    exportItemByCategory(cosmeticsList,'cosmetics', 'l-2');
    CreatItemSelectBox();//ham tao ra muc takcartitembox
    changeImage();
    takeCart();
    productRedirect();
}

if ($('.header__navbar-cart-box-container')) {
    takeCart();
}

//ham trich xuat item
function exportItem(itemList, column) {
    itemList.innerHTML = '';
    for (let i = 0; i < list_item.length; ++i) {
        itemList.innerHTML +=
            `<div class="col ${column} c-4 m-3">
            <div class="sort__item" item-index = "${i}">
                <a class="sort__item-link" data-id="${list_item[i].id}" >
                    <div class="sort__item-img">
                        <img src="/image/item-image/${list_item[i].color_img[0].img[0]}" alt="">
                    </div>
                    <div class="sort__item-brand">${list_item[i].brand}</div>
                    <div class="sort__item-text">${list_item[i].name}</div>
                </a>
                <div class="sort__item-img_btn sort__item-img_btn-left"><i class="fa-solid fa-angle-left"></i></div>
                <div class="sort__item-img_btn sort__item-img_btn-right"><i class="fa-solid fa-angle-right"></i></div>
                <div class="sort__item-content">
                    <div class="sort__item-title">
                        <div class="sort__item-price">￥${list_item[i].price}</div>
                        <div class="sort__item-takeit">
                            <a class="sort__item-favorite ${user && user.favorItems.find(favorItem => favorItem.item_id == list_item[i].id) ? 'sort__item-takecart-enable' : 'sort__item-takecart-disable'} " ${user ? `onclick="addToFavorites(${list_item[i].id},this)"` : 'href="/login"'}></a>
                            <button type="button" class="sort__item-takecart"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                    <div class="sort__item-star">
                        <div class="stars-outer">
                            <div class="stars-inner" style="width: ${list_item[i].rating > 0 ? list_item[i].rating / 5 * 100 : 0}%;"></div>
                        </div>
                        <div class="sort__item-star-number">
                            (<p>${list_item[i].ratingCount}</p>)
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }

}

function exportItemByCategory(itemList,categoryName, column){
    const getItemIdsByCategory = categories.filter(category => category.category_name === categoryName).map(category => category.item_id);
    const categoryItems = list_item.filter(item => getItemIdsByCategory.includes(item.id))
    itemList.innerHTML = '';
    for (let i = 0; i < categoryItems.length; ++i) {
        itemList.innerHTML +=
            `<div class="col ${column} c-4 m-3">
            <div class="sort__item" item-index = "${categoryItems[i].id}">
                <a class="sort__item-link" data-id="${categoryItems[i].id}" >
                    <div class="sort__item-img">
                        <img src="/image/item-image/${categoryItems[i].color_img[0].img[0]}" alt="">
                    </div>
                    <div class="sort__item-brand">${categoryItems[i].brand}</div>
                    <div class="sort__item-text">${categoryItems[i].name}</div>
                </a>
                <div class="sort__item-img_btn sort__item-img_btn-left"><i class="fa-solid fa-angle-left"></i></div>
                <div class="sort__item-img_btn sort__item-img_btn-right"><i class="fa-solid fa-angle-right"></i></div>
                <div class="sort__item-content">
                    <div class="sort__item-title">
                        <div class="sort__item-price">￥${categoryItems[i].price}</div>
                        <div class="sort__item-takeit">
                            <a class="sort__item-favorite ${user && user.favorItems.find(favorItem => favorItem.item_id == categoryItems[i].id) ? 'sort__item-takecart-enable' : 'sort__item-takecart-disable'} " ${user ? `onclick="addToFavorites(${categoryItems[i].id},this)"` : 'href="/login"'}></a>
                            <button type="button" class="sort__item-takecart"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                    <div class="sort__item-star">
                        <div class="stars-outer">
                            <div class="stars-inner" style="width: ${categoryItems[i].rating > 0 ? categoryItems[i].rating / 5 * 100 : 0}%;"></div>
                        </div>
                        <div class="sort__item-star-number">
                            (<p>${categoryItems[i].ratingCount}</p>)
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }

}


function CreatItemSelectBox() {
    const container = document.querySelector('.container');
    if (!container) return; // Đảm bảo container tồn tại

    // Chèn HTML của hộp chọn vào container bằng `insertAdjacentHTML`
    container.insertAdjacentHTML('beforeend', `
        <div class="item__select-cart-container">
            <div class="item__select-cart-box">
                <div class="select-cart-box-close"><i class="fa-solid fa-xmark"></i></div>
                <div class="select-cart-box-content">
                    <div class="row">
                        <ul class="item-checklist-imglist col l-1 c-6"></ul>
                        <div class="item-checklist-img-main col l-5 c-6"></div>
                        <div class="item-checklist-content col l-6 c-12">
                            <div class="item-checklist-name"></div>
                            <div class="item-checklist-brand"></div>
                            <div class="item-checklist-price">￥<span></span></div>
                            <div class="item-checklist-color">
                                <div class="checklist-color-name"><strong>カラー：</strong><span></span></div>
                                <ul class="checklist-color-list"></ul>
                            </div>
                            <div class="item-checklist-size">
                                <div class="checklist-size-name">サイズ:</div>
                                <ul class="checklist-size-list"></ul>
                            </div>
                            <div class="item-checklist-btn">
                                <div class="item-checklist-takecart-btn primary-btn">
                                    買い物かごに追加
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
}


function getItemParent(element, parentAdress) {
    while (element.parentElement) {
        if (element.parentElement.matches(parentAdress)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}

function changeImage() {
    $$('.sort__item').forEach(function (item) {//thay doi hinh anh bang nut bam o muc item
        var index = 0;
        let itemId = item.getAttribute('item-index');
        const product = list_item.find(item => item.id === parseInt(itemId));
        item.querySelector('.sort__item-img_btn-left').onclick = function () {
            index = index - 1
            if (index < 0) {
                index = product.color_img[0].img.length + index
            }

            item.querySelector('.sort__item-img img').src = '/image/item-image/' + product.color_img[0].img[index]
        }

        item.querySelector('.sort__item-img_btn-right').onclick = function () {
            index = index + 1
            if (index >= product.color_img[0].img.length) {
                index = 0
            }

            item.querySelector('.sort__item-img img').src = '/image/item-image/' + product.color_img[0].img[index]
        }
    })
}

// <!---------------Page-bar--------End--> 

//-----------------------Take-cart--------------------------------Start

function takeCart() {
    var takeCartBoxBtn = document.querySelectorAll('.sort__item-takecart');
    var takeCartBtn = document.querySelector('.item-checklist-takecart-btn');

    // Hàm chuyển đổi hình ảnh
    function itemImgChange() {
        var itemImageMain = document.querySelector('.item-checklist-img-main img');
        var itemImage = document.querySelectorAll('.item-checklist-imglist-item');

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

    // Xử lý khi người dùng nhấn vào nút thêm vào giỏ hàng
    takeCartBoxBtn.forEach(function (currentItemBox) {
        currentItemBox.onclick = function () {
            itemImgChange();
            var ItemName = getItemParent(this, '.sort__item').querySelector('.sort__item-text').innerHTML;
            var itemCurrent = list_item.find(function (item) {
                return item.name === ItemName;
            });

            let ItemImg_Color = itemCurrent.color_img;
            let ItemPrice = itemCurrent.price;
            let ItemBrand = itemCurrent.brand;
            let ItemId = itemCurrent.id;

            var body = document.body;
            var SelectCartCloseBtn = document.querySelector('.select-cart-box-close');
            body.classList.toggle("overlay-open_select-cart-box");

            if (body.classList.contains("overlay-open")) {
                body.style.position = "fixed";
            } else {
                body.style.position = "";
            }

            SelectCartCloseBtn.onclick = function () {
                if (body.classList.contains("overlay-open_select-cart-box")) {
                    body.classList.remove("overlay-open_select-cart-box");
                }
            };

            // Truyền thông tin sản phẩm vào box take cart
            var itemChecklistImg = document.querySelector('.item-checklist-imglist');
            var itemCheckSizeList = document.querySelector('.checklist-size-list');
            var iteamCheckBrand = document.querySelector('.item-checklist-brand');
            var itemChecklistTakecartBtn = document.querySelector('.item-checklist-takecart-btn');

            itemChecklistImg.innerHTML = "";
            for (var i = 0; i < ItemImg_Color[0].img.length; ++i) {
                itemChecklistImg.innerHTML += `<li class="item-checklist-imglist-item"><img src="${ItemImg_Color[0].img[i]}" alt=""></li>`;
            }

            document.querySelector('.item-checklist-name').innerHTML = ItemName;
            document.querySelector('.item-checklist-price span').innerHTML = ItemPrice;

            itemCheckSizeList.innerHTML = "";
            itemCheckSizeList.innerHTML += `<li class="checklist-size size_checked">${itemCurrent.size[0]}</li>`;
            iteamCheckBrand.innerHTML = ItemBrand;

            for (var i = 1; i < itemCurrent.size.length; ++i) {
                itemCheckSizeList.innerHTML += `<li class="checklist-size">${itemCurrent.size[i]}</li>`;
            }

            // Trích xuất màu sắc từ list item
            var CheckColorList = document.querySelector('.checklist-color-list');
            var CheckColorName = document.querySelector('.checklist-color-name span');
            var itemColorCurrent = itemCurrent.color_img.find(
                colorList => colorList.color_name === CheckColorName.innerHTML);
            CheckColorList.innerHTML = "";

            for (let i = 0; i < itemCurrent.color_img.length; ++i) {
                CheckColorList.innerHTML += `<li class="checklist-color" data-id="${itemCurrent.color_img[i].id}"></li>`;
            }

            var checkListItem = document.querySelectorAll('.checklist-color');
            checkListItem[0].classList.add('color-checked');
            colorNameChange();
            colorImageChange();
            itemImgChange();

            // Hàm đổi tên màu
            function colorNameChange() {
                for (let i = 0; i < itemCurrent.color_img.length; ++i) {
                    checkListItem[i].style.backgroundColor = itemCurrent.color_img[i].color_nameEng;
                    if (checkListItem[i].classList.contains('color-checked')) {
                        CheckColorName.innerHTML = itemCurrent.color_img[i].color_name;
                    }
                }
            }

            // Hàm thay đổi hình ảnh khi chọn màu
            function colorImageChange() {
                itemColorCurrent = itemCurrent.color_img.find(
                    colorList => colorList.color_name === CheckColorName.innerHTML);

                itemChecklistImg.innerHTML = "";
                for (var i = 0; i < itemColorCurrent.img.length; ++i) {
                    itemChecklistImg.innerHTML += `<li class="item-checklist-imglist-item"><img src="/image/item-image/${itemColorCurrent.img[i]}" alt=""></li>`;
                    document.querySelector('.item-checklist-img-main').innerHTML =
                        `<img src="/image/item-image/${itemColorCurrent.img[0]}" alt="">`;
                }
            }

            // Xử lý chọn size
            let sizeBtn = document.querySelectorAll('.checklist-size');
            sizeBtn.forEach(function (a) {
                a.onclick = function () {
                    document.querySelector('.size_checked').classList.remove('size_checked');
                    this.classList.add('size_checked');
                }
            });

            // Xử lý chọn màu
            let colorBtn = document.querySelectorAll('.checklist-color');
            colorBtn.forEach(function (color) {
                color.onclick = function () {
                    document.querySelector('.color-checked').classList.remove('color-checked');
                    this.classList.add('color-checked');

                    colorNameChange();
                    colorImageChange();
                    itemImgChange();
                }
            });

            // Xử lý khi nhấn nút "Thêm vào giỏ hàng"
            itemChecklistTakecartBtn.onclick = function () {
                var ItemImgSrc = itemColorCurrent.img;
                var ItemColor = itemColorCurrent.color_name;
                var ItemPrice = itemCurrent.price;
                var ItemSize = document.querySelector('.checklist-size.size_checked').innerHTML;
                var ItemBrand = itemCurrent.brand;
                var ItemCategory = itemCurrent.category;
                var ItemId = itemCurrent.id;
                var ItemColorId = parseInt(document.querySelector('.checklist-color.color-checked').getAttribute('data-id'));

                if (myCart.some(item => item.name === ItemName && item.brand === ItemBrand && item.color === ItemColor && item.size === ItemSize && item.id === ItemId)) {
                    myCart.forEach(item => {
                        if (item.name === ItemName && item.brand === ItemBrand && item.color === ItemColor && item.size === ItemSize && item.id === ItemId) {
                            item.quantity++;
                        }
                    });
                } else {
                    proxyCart.push({
                        id: ItemId,
                        name: ItemName,
                        brand: ItemBrand,
                        category: ItemCategory,
                        img: ItemImgSrc,
                        price: ItemPrice,
                        size: ItemSize,
                        color: ItemColor,
                        colorId: ItemColorId,
                        quantity: 1,
                    });
                }
                onChangeCart();
                header.style.transform = 'translateY(0)';
                if (user) {
                    addToCart(ItemId, ItemColorId, ItemSize, user);
                }
            };
        }
    });
}

onChangeCart()


function addToCart(ItemId, ItemcolorId, ItemSize, user) {
    fetch(`/add-to-cart/${user.user_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            itemId: ItemId,
            colorId: ItemcolorId,
            size: ItemSize,
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Item added to cart successfully');
            } else {
                console.log('Error adding item to cart:', data.error);
            }
        })
        .catch(error => console.error('Error adding item to cart:', error));
}

function onChangeCart() {
    var headerCartBox = $('.header__navbar-cart-box');
    var myCartCount = $('.header__navbar-cart-count');
    var priceTotal = myCart.reduce((total, item) => total + item.price, 0);

    if (myCart.length === 0) {
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
        `;
    } else {
        myCartCount.style.display = 'block';
        myCartCount.innerHTML = myCart.reduce((quantity, current) => current.quantity + quantity, 0);
        headerCartBox.style.maxHeight = '80vh';

        headerCartBox.innerHTML =
            `<div class="header__navbar-cart-list"></div>
            <div class="header__navbar-cart-checkox">
                <div class="header__navbar-cart-total">合計：<span>￥<div class="header__navbar-cart-total-index"></div></span></div>
                <div class="header__navbar-cart-check-btn"><a href="/getCartPage">買い物かごを見る(${myCart.length})</a></div>
            </div>`;

        $('.header__navbar-cart-total-index').innerHTML = priceTotal;

        // Duyệt qua cartItems để hiển thị các sản phẩm và số lượng của chúng
        const cartList = document.querySelector('.header__navbar-cart-list');
        cartList.innerHTML = '';
        myCart.forEach(cartItem => {
            cartList.innerHTML +=
                `<div class="row header__navbar-cart-item">
                <div class="col l-3 c-3 m-3 header__navbar-cart-item_img">
                    <a href="/product/${cartItem.id}" class="item-link">
                        <img src="/image/item-image/${cartItem.img[0]}" alt="">
                    </a> 
                </div>
        
                <div class="col l-9 c-9 m-9 header__navbar-cart-item_content">
                    <a href="" class="item-link">
                        <div class="header__navbar-cart-item_title">
                            ${cartItem.name}
                        </div>
                    </a>
                    <div class="header__navbar-cart-item_brand">${cartItem.brand}</div>
                    <div class="header__navbar-cart-item_info">
                        <div class="header__navbar-cart-item_info-box">
                            <div class="header__navbar-cart-item_info-color"><b>カラー：</b>${cartItem.color}</div>
                            <div class="header__navbar-cart-item_info-size"><b>サイズ：</b>${cartItem.size}</div>
                        </div>
                        <div class="header__navbar-cart-item_info-quantity-box">
                            <div class="header__navbar-cart-item_info-quantity-down" onclick="decreaseQuantityItemCart(${cartItem.id},${cartItem.colorId},'${cartItem.size}')">-</div>
                            <div class="header__navbar-cart-item_info-quantity-num">${cartItem.quantity}</div>
                            <div class="header__navbar-cart-item_info-quantity-up" onclick="increaseQuantityItemCart(${cartItem.id},${cartItem.colorId},'${cartItem.size}')">+</div>
                        </div>
                    </div>
                    <div class="header__navbar-cart-item_info-footer">
                        <div class="header__navbar-cart-item_info-price">￥${cartItem.price}</div>
                        <div class="header__navbar-cart-item_btn-remove" onclick="removeItemFromCart(${cartItem.id},${cartItem.colorId},'${cartItem.size}')"><i class="fa-regular fa-trash-can"></i></div>
                    </div>
                </div>
            </div>`;
        });
    }
}

function addToFavorites(itemId, event) {
    fetch('/add-to-favorites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                event.classList.toggle('sort__item-takecart-disable');
                event.classList.toggle('sort__item-takecart-enable');
                const favorQualityElement = document.querySelector('.header__navbar--favor-quality');
                document.querySelector('.header').style.transform = 'translateY(0)';
                if (favorQualityElement) {
                    favorQualityElement.textContent = data.favorCount;
                    favorQualityElement.style.display = data.favorCount > 0 ? 'block' : 'none';
                }
            } else {
                alert('Failed to add item to favorites. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}



//--------------------------Cart-button--------------------------------Start

function removeItemFromCart(itemId, colorId, size) {
    const filteredCart = proxyCart.filter(item => {
        return !(item.id === itemId && item.colorId === colorId && item.size === size);
    });

    proxyCart.length = 0; // Xóa tất cả phần tử
    filteredCart.forEach(item => proxyCart.push(item)); // Thêm lại phần tử đã lọc
    if (user) {
        const userId = user.user_id
        fetch('/remove-from-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, itemId: itemId, colorId: colorId, size: size }),
        })
    }
    onChangeCart();
}
function decreaseQuantityItemCart(itemId, colorId, size) {
    proxyCart.forEach(item => {
        if (item.id === itemId && item.colorId === colorId && item.size === size) {
            item.quantity--;
            if (item.quantity <= 0) {
                removeItemFromCart(item.id, colorId, size);
            }
        }
    });
    if (user) {
        const userId = user.user_id
        fetch('/decrease-quantity-item-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, itemId: itemId, colorId: colorId, size: size }),
        })
    }
    onChangeCart();
}
function increaseQuantityItemCart(itemId, colorId, size) {
    const item = proxyCart.find(item =>
        item.id === itemId && item.colorId === colorId && item.size === size
    );
    if (item)
        item.quantity++;

    setCartCookie(proxyCart);
    if (user) {
        const userId = user.user_id
        fetch('/increase-quantity-item-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, itemId: itemId, colorId: colorId, size: size }),
        })
    }

    onChangeCart();
}
//--------------------------Cart-button--------------------------------End


//---------------------Take-cart--------------------------------End

//--------------------------Thanhchuyenhuonggiaodiensanpham----------]

function productRedirect() {
    if ($$('.sort__item-link')) {
        $$('.sort__item-link').forEach(function (item) {
            item.onclick = function () {
                const productId = this.dataset.id;
                window.location.pathname = `product/${productId}`;
            }

        })
    }
}

// --------------SEARCH-ITEM-BAR-------------START
function searchItemIp() {
    var searchItemInput = $('.header__search-input');
    var searchItemBox = $('.header__search-box');
    var searchItemBtn = $('.header__search-button');
    let searchItemList =[]
    searchItemList = list_item.filter(value => {
        return value.name.toLowerCase().includes(searchItemInput.value.toLowerCase())
    }
    )
    searchItemInput.oninput = function searchInput() {
        if (searchItemInput.value !== '') {
            searchItemBox.style.display = 'block';
            itemNameSearch();
            function itemNameSearch() {
                searchItemList = list_item.filter(value => {
                    return value.name.toLowerCase().includes(searchItemInput.value.toLowerCase())
                }
                )
                if (searchItemList.length > 0) {
                    searchItemBox.innerHTML = '';

                    searchItemList.forEach(item => {
                        let searchInputIndex = item.name.toLowerCase().indexOf(searchItemInput.value.toLowerCase());
                        let beforeMatch = item.name.substring(0, searchInputIndex);
                        let match = item.name.substring(searchInputIndex, searchInputIndex + searchItemInput.value.length);
                        let afterMatch = item.name.substring(searchInputIndex + searchItemInput.value.length);

                        searchItemBox.innerHTML +=
                            `
                                <div class="header__search-item-list">
                                    <div class="header__search-item-discription"></div>
                                    <a href = "/product/${item.id}">
                                        <div class="header__search-item-name">
                                        ${beforeMatch}<strong>${match}</strong>${afterMatch}       
                                        </div>
                                    </a>
                                </div>
                            `
                    }
                    )
                }
                else {
                    searchItemBox.innerHTML = '';
                }
            }
        }

        else {
            searchItemBox.style.display = 'none';
        }
    }

   

    // Enter key press event
    searchItemInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            window.location.href = `/category?word=${encodeURIComponent(searchItemInput.value.trim())}`;
        }
    })
}
function setCartCookie(target) {
    if (!user) {
        fetch('/set-cart-cookie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ myCart: target }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Cookie set successfully');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
}

// --------------SEARCH-ITEM-BAR-------------END


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

searchItemIp();
// TAKE CART BOX Responsive
//CATEGORY BOX HIDE 
var categoryBoxBtn = $('.header-category-box i');
var categoryBoxBtnClose = $('.category-box-closeBtn')
var categoryBox = $('.category-box');
if (categoryBox) {
    categoryBoxBtn.onclick = function () {
        categoryBox.classList.toggle('unhide-active')
        document.body.classList.add('over')
        $('.over-play').style.display = 'block'
        document.body.style.position = 'fixed'
    }
}
if (categoryBoxBtnClose) {
    categoryBoxBtnClose.onclick = function () {
        categoryBox.classList.remove('unhide-active')
        document.body.classList.remove('over')
        $('.over-play').style.display = 'none'
        document.body.style.position = ''
    }
}

// $$('.swiper-slide').forEach(tabSlide =>{
    
//     tabSlide.onclick = function(){
//     $('.swiper.tab').querySelector('.swiper-slide.tab__list-start').classList.remove('tab__list-start')
//     this.classList.add('tab__list-start')
//     }
// })