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

const list_item = list_items
$$('.sort__tab-list').forEach(function (a) {
    a.onclick = function () {
        $(".content__title-sort-selected").value = this.innerHTML;
        $('.sort__tab-list.selected').classList.remove('selected');
        this.classList.add('selected');
    }
});

// sort-tab end//

//item start//


function favoritebutton(a) {
    console.log(a.classList[1])
    if (a.classList.contains('sort__item-takecart-disable')) {
        a.classList.remove('sort__item-takecart-disable');
        a.classList.add('sort__item-takecart-enable');
    }
    else {
        a.classList.remove('sort__item-takecart-enable');
        a.classList.add('sort__item-takecart-disable');
    }
}

var pageButton = document.querySelectorAll(".bar-page_list-item");
Array.from(pageButton).forEach(function (item) {
    item.addEventListener('click', function () {
        document.querySelector('.page-checked').classList.remove('page-checked')
        this.classList.add('page-checked');
    });
}

);

//Item

var sort__item_list = $('.sort__item-list')
var recommendList = $('.section__recommend-list')
if (sort__item_list) {
    exportItem(sort__item_list, 'l-2-4');
    CreatItemSelectBox();//ham tao ra muc takcartitembox
    changeImage();
    takeCart();
    productRedirect();
}
if (recommendList) {
    exportItem(recommendList, 'l-2');
    CreatItemSelectBox();//ham tao ra muc takcartitembox
    changeImage();
    takeCart();
    productRedirect();
}
// if($('.section__new-list')){
//     exportItem($('.section__new-list'),'l-2');
//     CreatItemSelectBox();//ham tao ra muc takcartitembox
//      changeImage();
//      takeCart();
//      productRedirect();
// }

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
                            <button type="button" class="sort__item-favorite sort__item-takecart-disable" onclick="favoritebutton(this)"></button>
                            <button type="button" class="sort__item-takecart"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                    <div class="sort__item-star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <div class="sort__item-star-number">
                            (<p>0</p>)
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
}

function CreatItemSelectBox() {
    $('.container').innerHTML +=
        `<div class="item__select-cart-container">
        <div class="item__select-cart-box">
            <div class="select-cart-box-close"><i class="fa-solid fa-xmark"></i></div>
            <div class="select-cart-box-content">
                <div class="row">
                                                <ul class="item-checklist-imglist col l-1 c-6">
                                        
                                                </ul>
                                                <div class="item-checklist-img-main col l-5 c-6"></div>
                                                <div class="item-checklist-content col l-6 c-12">
                                                    <div class="item-checklist-name"></div>
                                                    <div class="item-checklist-brand"></div>
                                                    <div class="item-checklist-price">￥<span></span></div>
                                                    <div class="item-checklist-color">
                                                        <div class="checklist-color-name"><strong>カラー：</strong><span>ブラック</span></div>
                                                        <ul class="checklist-color-list">
                                                            
                                                        </ul>
                                                    </div>
                                                    <div class="item-checklist-size">
                                                        <div class="checklist-size-name">サイズ:</div>
                                                        <ul class="checklist-size-list">
                                                        </ul>
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
    `

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
        item.querySelector('.sort__item-img_btn-left').onclick = function () {
            index = index - 1
            if (index < 0) {
                index = list_item[itemId].color_img[0].img.length + index
            }

            item.querySelector('.sort__item-img img').src = '/image/item-image/' + list_item[itemId].color_img[0].img[index]
        }

        item.querySelector('.sort__item-img_btn-right').onclick = function () {
            index = index + 1
            if (index >= list_item[itemId].color_img[0].img.length) {
                index = 0
            }

            item.querySelector('.sort__item-img img').src = '/image/item-image/' + list_item[itemId].color_img[0].img[index]
        }
    })
}

// <!---------------Page-bar--------End--> 

//-----------------------Take-cart--------------------------------Start
function takeCart() {
    var takeCartBoxBtn = $$('.sort__item-takecart');
    var takeCartBtn = $('.item-checklist-takecart-btn');

    var myCart = [];


    // Hàm chuyển đổi hình ảnh
    function itemImgChange() {
        var itemImageMain = $('.item-checklist-img-main img');
        var itemImage = $$('.item-checklist-imglist-item');

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
    //



    var onChangeCart = function () {
        var headerCartBox = $('.header__navbar-cart-box');
        var myCartCount = $('.header__navbar-cart-count');
        var cartItems = {};
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
    
            `
        } else {
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

            myCart.forEach(function (item) {
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
            Object.values(cartItems).forEach(function (a) {
                const key = `${a.name}-${a.brand}-${a.color}-${a.size}-${a.img}-${a.price}`;
                cartList.innerHTML +=
                    `<div class="row header__navbar-cart-item" data-key="${key}">
                    <div class="col l-3 c-3 m-3 header__navbar-cart-item_img">
                        <a href="http://" class="item-link">
                            <img src="/image/item-image/${a.img}" alt="">
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

            document.querySelectorAll('.header__navbar-cart-item').forEach(function (itemElement) {
                const key = itemElement.getAttribute('data-key');

                itemElement.querySelector('.header__navbar-cart-item_info-quantity-down').addEventListener('click', function () {
                    if (cartItems[key].quantity > 1) {
                        cartItems[key].quantity--;
                    } else {
                        delete cartItems[key];
                    }
                    updateMyCartFromCartItems(); // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
                    renderCart();
                    onChangeCart();
                });

                itemElement.querySelector('.header__navbar-cart-item_info-quantity-up').addEventListener('click', function () {
                    cartItems[key].quantity++;
                    updateMyCartFromCartItems(); // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
                    renderCart();
                    onChangeCart();
                });

                itemElement.querySelector('.header__navbar-cart-item_btn-remove').addEventListener('click', function () {
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
            Object.values(cartItems).forEach(function (item) {
                for (let i = 0; i < item.quantity; i++) {
                    myCart.push(item);
                }
            });
        }
        // Thêm sự kiện click cho các nút tăng và giảm số lượng
    }

    if (true) {
        takeCartBoxBtn.forEach(function (currentItemBox) {
            currentItemBox.onclick = function (a) {
                itemImgChange($(".item-checklist-img-main"), $$(".item-checklist-imglist-item"));
                var ItemName = getItemParent(this, '.sort__item').querySelector('.sort__item-text').innerHTML;
                var itemCurrent = list_item.find(function (item) {
                    return item.name === ItemName;
                });

                let ItemImg_Color = itemCurrent.color_img;
                let ItemPrice = itemCurrent.price;
                let ItemBrand = itemCurrent.brand;


                let body = document.body;
                let SelectCartCloseBtn = $('.select-cart-box-close')

                body.classList.toggle("overlay-open_select-cart-box");

                if (body.classList.contains("overlay-open")) {
                    body.style.position = "fixed";
                } else {
                    body.style.position = "";
                }

                SelectCartCloseBtn.onclick = function () {
                    var body = document.body;

                    if (body.classList.contains("overlay-open_select-cart-box")) {
                        body.classList.remove("overlay-open_select-cart-box");
                    }
                }
                //chuyền thông tin sản phẩm vào box take cart

                var SelectCartBox = $('.select-cart-box-content');
                var itemChecklistImg = $('.item-checklist-imglist');
                var itemCheckSizeList = $('.checklist-size-list');
                var iteamCheckBrand = $('.item-checklist-brand');


                itemChecklistImg.innerHTML = "";
                for (var i = 0; i < ItemImg_Color[0].img.length; ++i) {
                    itemChecklistImg.innerHTML +=
                        `<li class="item-checklist-imglist-item"><img src="${ItemImg_Color[0].img[i]}" alt=""></li>
                    `
                }

                $('.item-checklist-name').innerHTML = ItemName;
                $('.item-checklist-price span').innerHTML = ItemPrice;

                itemCheckSizeList.innerHTML = "";
                itemCheckSizeList.innerHTML += `<li class="checklist-size size_checked">${itemCurrent.size[0]}</li>`;
                iteamCheckBrand.innerHTML = ItemBrand;
                for (var i = 1; i < itemCurrent.size.length; ++i) {
                    itemCheckSizeList.innerHTML += `
                    <li class="checklist-size">${itemCurrent.size[i]}</li>
                    `
                }

                //trich xuat color tu list item
                var CheckColorList = $('.checklist-color-list');
                var CheckColorName = $('.checklist-color-name span');
                var itemColorCurrent = itemCurrent.color_img.find(
                    colorList => colorList.color_name == CheckColorName.innerHTML);
                CheckColorList.innerHTML = "";
                for (let i = 0; i < itemCurrent.color_img.length; ++i) {

                    CheckColorList.innerHTML += `<li class="checklist-color"></li>`;
                }
                var checkListItem = $$('.checklist-color');
                checkListItem[0].classList.add('color-checked')
                colorNameChange();
                colorImageChange();
                itemImgChange();//goi ham lua chon hinh anh
                function colorNameChange() {
                    for (let i = 0; i < itemCurrent.color_img.length; ++i) {
                        checkListItem[i].style.backgroundColor = itemCurrent.color_img[i].color_nameEng;
                        if (checkListItem[i].classList.contains('color-checked')) {
                            CheckColorName.innerHTML = itemCurrent.color_img[i].color_name;//trich xuat ten mau vao box
                        }
                    }
                }
                function colorImageChange() {//Ham doi hinh anh khi chon color
                    itemColorCurrent = itemCurrent.color_img.find(
                        colorList => colorList.color_name == CheckColorName.innerHTML);


                    itemChecklistImg.innerHTML = "";
                    for (var i = 0; i < itemColorCurrent.img.length; ++i) {
                        itemChecklistImg.innerHTML +=
                            `<li class="item-checklist-imglist-item"><img src="/image/item-image/${itemColorCurrent.img[i]}" alt=""></li>
                        `
                        $('.item-checklist-img-main').innerHTML =
                            `<img src="/image/item-image/${itemColorCurrent.img[0]}" alt="">`;
                    }
                }


                // THIET LAP NUT CHON SIZE
                let sizeBtn = $$('.checklist-size');
                sizeBtn.forEach(function (a) {
                    a.onclick = function () {
                        $('.size_checked').classList.remove('size_checked');
                        this.classList.add('size_checked');
                    }
                });

                //THIET LAP NUT CHON MAU
                let colorBtn = $$('.checklist-color');
                colorBtn.forEach(function (color) {
                    color.onclick = function () {
                        $('.color-checked').classList.remove('color-checked');
                        this.classList.add('color-checked');

                        colorNameChange();
                        colorImageChange();
                        itemImgChange();//goi ham lua chon hinh anh
                    }
                })

                //Item product take --------------------------------- Start
                takeCartBtn.onclick = function () {
                    var ItemImgSrc = itemColorCurrent.img[0];
                    var ItemColor = itemColorCurrent.color_name;
                    var ItemPrice = itemCurrent.price;
                    var ItemSize = $('.checklist-size.size_checked').innerHTML;
                    var ItemBrand = itemCurrent.brand;

                    myCartProxy.push({
                        name: ItemName,
                        brand: ItemBrand,
                        img: ItemImgSrc,
                        price: ItemPrice,
                        size: ItemSize,
                        color: ItemColor

                    })
                    header.style.transform = 'translateY(0)';
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

                //Item product take -------------------------------- Enđ
            }

        })
    }
    onChangeCart();
}
//-----------------------Take-cart--------------------------------End


//--------------------------Thanhchuyenhuonggiaodiensanpham----------]

function productRedirect() {
    $$('.sort__item-link').forEach(function (item) {
        item.onclick = function () {
            const productId = this.dataset.id;
            window.location.href = `product/${productId}`;
        }

    })
}

// --------------SEARCH-ITEM-BAR-------------START
function searchItemIp() {
    const urlParams = new URLSearchParams(window.location.search);
    const itemSearch = urlParams.get('word');
    var searchItemInput = $('.header__search-input');
    var searchItemBox = $('.header__search-box');
    var searchItemBtn = $('.header__search-button');
    var searchItemList = [];
    let path = window.location.pathname;

    // Tách chuỗi path bằng dấu "/"
    let parts = path.split('/');

    // Lấy phần tử cuối cùng trong mảng parts
    let lastSegment = parts[parts.length - 1];
    if (lastSegment === 'category.html' && itemSearch.trim() != "") {
        searchItemInput.value = itemSearch;
        searchItemList = list_item.filter(value => {
            return value.name.toLowerCase().includes(searchItemInput.value.toLowerCase())
        }
        )
        performSearch();
    }
    else {

        if ($('.sort__item-list')) {
            performSearch();
        }
    }
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
                                    <a href = "./product.html?id=${item.id}">
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

    function performSearch() {
        if (searchItemList.length > 0) {
            $('.sort__item-list').innerHTML = '';
            searchItemList.forEach(item => {
                $('.sort__item-list').innerHTML +=
                    `<div class="col l-2-4 c-4 m-3">
            <div class="sort__item" item-index = "${item.id}">
                <a class="sort__item-link" data-id="${item.id}" >
                    <div class="sort__item-img">
                        <img src="/image/item-image/${item.color_img[0].img[0]}" alt="">
                    </div>
                    <div class="sort__item-brand">${item.brand}</div>
                    <div class="sort__item-text">${item.name}</div>
                </a>
                <div class="sort__item-img_btn sort__item-img_btn-left"><i class="fa-solid fa-angle-left"></i></div>
                <div class="sort__item-img_btn sort__item-img_btn-right"><i class="fa-solid fa-angle-right"></i></div>
                <div class="sort__item-content">
                    <div class="sort__item-title">
                        <div class="sort__item-price">￥${item.price}</div>
                        <div class="sort__item-takeit">
                            <button type="button" class="sort__item-favorite sort__item-takecart-disable" onclick="favoritebutton(this)"></button>
                            <button type="button" class="sort__item-takecart"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                    <div class="sort__item-star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <div class="sort__item-star-number">
                            (<p>0</p>)
                        </div>
                    </div>
                </div>
            </div>
        </div>`
            }
            )
            changeImage();
            takeCart();
            productRedirect();
        }
        else {
            $('.content__title-sort').style.display = 'none';
            $('.sort__item-list').innerHTML = `
                <div class='search__item-empty'>
                <img src="./image/item-search-empty.jpg">
                No results found for "${searchItemInput.value}"
                </div>`
                ;
        }
    }

    // Enter key press event
    searchItemInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    }
    );

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
categoryBoxBtn.onclick = function () {
    categoryBox.classList.toggle('unhide-active')
    document.body.classList.add('over')
    $('.over-play').style.display = 'block'
    document.body.style.position = 'fixed'
}
categoryBoxBtnClose.onclick = function () {
    categoryBox.classList.remove('unhide-active')
    document.body.classList.remove('over')
    $('.over-play').style.display = 'none'
    document.body.style.position = ''
}

console.log(list_item)
export default list_item;