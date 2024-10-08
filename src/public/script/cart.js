var cartItemQuanityBtn = document.querySelector(".cart__list-item-quantily i");
var cartItemSelect = document.querySelector(".cart__list-item-count");

TakeCart();
function updateTotalPrice() {
    let totalPrice = 0;

    // Duyệt qua tất cả các mục trong giỏ hàng
    const cartItems = document.querySelectorAll('.cart__list-item');
    cartItems.forEach(function (item) {
        let price = parseInt(item.querySelector('.cart__list-item-price span').textContent); // Lấy giá của sản phẩm
        let quantity = parseInt(item.querySelector('.header__navbar-cart-item_info-quantity-num').textContent); // Lấy số lượng sản phẩm

        // Tính tổng cho sản phẩm hiện tại (giá * số lượng)
        let itemTotal = price * quantity;
        // Cộng tổng cho toàn bộ giỏ hàng
        totalPrice += itemTotal;
    });

    // Cộng thêm phí ship
    document.querySelector('.cart-detail-price span').textContent = totalPrice.toLocaleString();
    let shippingCost = parseInt(document.querySelector('.cart-detail-price-ship span').textContent) || 0;

    totalPrice += shippingCost;

    // Cập nhật tổng tiền thanh toán
    document.querySelector('.cart-detail-total-price span').textContent = totalPrice.toLocaleString();
}


function TakeCart() {
    $('.container').innerHTML = `<div class="grid wide">
                <div class="row cart-content">
                ${myCart.length > 0 ?
            `<div class="col l-8 m-8 c-12">
                        <div class="cart__list-box">
                        ${myCart.map(item => `
                            <div class="cart__list-item">
                                <div class="cart__list-item-img">
                                    <a href="/product/${item.id}"><img src="/image/item-image/${item.img}" alt=""></a>
                                </div>
                                <div class="cart__list-content">
                                    <ul class="cart__list-item-title">
                                        <li class="cart__list-item-name">${item.name}</li>
                                        <li class="cart__list-item-brand">${item.brand}</li>
                                        <li class="cart__list-item-category">${item.category}</li>
                                        <li class="cart__list-item-color">カラー：${item.color}</li>
                                        <li class="cart__list-item-size">サイズ：${item.size}</li>
                                    </ul>
                                    <div class="cart__list-item-check">
                                        <div class="cart__list-item-price">
                                            ￥ <span>${item.price}</span> 
                                        </div>
                                        <div class="cart__list-item-quantily">
                                             <div class="header__navbar-cart-item_info-quantity-box">
                                                <div class="header__navbar-cart-item_info-quantity-down" onclick="decreaseQuantityItemCart(${item.id},${item.colorId},'${item.size}'),TakeCart()">-</div>
                                                <div class="header__navbar-cart-item_info-quantity-num">${item.quantity}</div>
                                                <div class="header__navbar-cart-item_info-quantity-up" onclick="increaseQuantityItemCart(${item.id},${item.colorId},'${item.size}'),TakeCart()">+</div>
                                            </div>
                                        </div>
                                        <div class="cart__list-item-delete-btn" onclick="removeItemFromCart(${item.id},${item.colorId},'${item.size}'),TakeCart()">
                                            削除
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="col l-4 m-4 c-12">
                        <div class="cart-total-box">
                            <div class="cart-total-title">
                                商品合計
                            </div>
                            <div class="cart-detail-box">
                                <div class="cart-detail">
                                    <div class="cart-detail-title">小計(税込)</div>
                                    <div class="cart-detail-price">￥ <span></span> </div>
                                </div>
                                <div class="cart-detail">
                                    <div class="cart-detail-title">送料(税込)</div>
                                    <div class="cart-detail-price-ship">￥<span>0</span> </div>
                                </div>
                                <div class="cart-detail">
                                    <div class="cart-detail-total-titletext">
                                        <div class="cart-detail-total-title">合計</div>
                                        <div class="cart-detail-total-tax"> 税込</div>
                                    </div>
                                    <div class="cart-detail-total-price">￥<span></span> </div>
                                </div>
                            </div>
                            <div class="cart-total-account primary-btn">ご購入手続きへ(1)</div>
                        </div>
                    </div>
                    `: `
                    <div class="cart-empty-box">
                        <img src="/image/cart-empty.jpg" alt="cart-empty-img">
                        <p>現在カートに商品がありません。</p>
                    </div>`}
                </div>
            </div>`// Tính tổng tiền khi render giỏ hàng
    if (myCart.length > 0) {
        updateTotalPrice();
        // Sự kiện thay đổi số lượng sản phẩm
        $('.header__navbar-cart-item_info-quantity-num').onchange = function () {
            updateTotalPrice();
        }
        if ($('.cart-total-account')) {
            $('.cart-total-account').onclick = TakeCartInfor;
        }
    }

}

function TakeCartInfor() {
    $('.container').innerHTML =
        `
    <div class="grid wide">
                <div class="row">
                    <div class="cart-heading">
                    <div class="cart-heading-list cart-heading-cartshow cart-active">
                        ショッピングカート
                    </div>
                    <div class="cart-heading-list cart-heading-pay cart-active">
                        お届け先･発送方法･お支払い方法
                    </div>
                    <div class="cart-heading-list cart-heading-pay-check">
                        お届け先･発送方法･お支払い方法確認
                    </div>
                    <div class="cart-heading-list cart-heading-paysucess">
                        注文完了
                    </div>                  
                </div>
        
                </div>
                <form action="post" id ="cart__pay-form" class="row cart-content">
                    <div class="col l-8 m-8 c-12">
                        <div class="cart__pay-form">
                                <div class="address-form">
                                     <div class="row">
                                    <div class="cart__pay-form-title">届け先</div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-name" class="address-id">
                                            名前
                                            <span class="required_label">必須</span>
                                        </label>
                                    </div>
                                    
                                    <div class="col l-8 m-8 c-12">
                                        <input type="text" class="pay-form-input pay-form-input_name" name="adress-name" id="adress-name">
                                        <span class="form-message"></span>
                                    </div>
                                    

                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-phone" class="address-phone">電話番号
                                            <span class="required_label">必須</span>
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        <input type="text" class="pay-form-input pay-form-input_phone" name="adress-phone" id="adress-phone">                                  
                                        <span class="form-message"></span>
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-zipcode" class="address-zip-code">郵便番号
                                            <span class="required_label">必須</span>
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        <div class="input_zip-code-box">
                                            <input type="text" class="pay-form-input pay-form-input_zip-code" name="adress-zip-code" id="adress-zip-code" >
                                            <div class="zip-code-checkBtn primary-btn" onclick = "AjaxZip3.zip2addr('adress-zip-code','','adress-prefecture','adress-city');">住所を自動入力</div>
                                        </div>
                                        <span class="form-message"></span>
                                    </div>
                                    
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-prefecture" class="address-prefecture">都道府県
                                            <span class="required_label">必須</span>
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        <input type="text" class="pay-form-input pay-form-input_prefecture" name="adress-prefecture" id="adress-prefecture">
                                        <span class="form-message"></span>
                                    </div>
                                    
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-city" class="address-city">市区町村
                                            <span class="required_label">必須</span>
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        <input type="text" class="pay-form-input pay-form-input_city" name="adress-city" id="adress-city">
                                        <span class="form-message"></span>
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-add" class="address-add">町名・丁番地等
                                            <span class="required_label">必須</span>
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        <input type="text" class="pay-form-input pay-form-input_add" name="adress-add" id="adress-add">
                                        <span class="form-message"></span>
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-building" class="address-building">マンション名・号室等</label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        <input type="text" class="pay-form-input pay-form-input_building" name="adress-building" id="adress-building">
                                        <span class="form-message"></span>
                                    </div>
                                </div>
                                </div>
                               
                            
                            
                                <div class="payment-form">
                                    <div id ="payment-form" class="form-close input-group">
                                        <div class="row">
                                            <div class="payment-form-title">お支払方法</div>
                                        </div>
                                        <div class="radio-group row">
                                            <input type="radio" name="payment" id="payment-cashon" class="payment-cashon" value ="代金引換">
                                            <label for="payment-cashon">代金引換</label>
                                        </div> 
                                        <div class="radio-group row">
                                            <input type="radio" name="payment" id="payment-credit" class="payment-credit" value ="クレジットカード決済<">
                                            <label for="payment-credit">クレジットカード決済</label>
                                        </div>
                                        <div class="radio-group row">
                                            <input type="radio" name="payment" id="payment-paypay" class="payment-paypay" value ="PayPay">
                                            <label for="payment-paypay">PayPay</label>
                                        </div>
                                       
                                        <div class="radio-group row">
                                            <input type="radio" name="payment" id="payment-d" class="payment-d" value = "d払い">
                                            <label for="payment-d">d払い ｄポイントがたまる・つかえる</label>
                                        </div>
                                        <div class="radio-group row">
                                            <input type="radio" name="payment" id="payment-paydy" class="payment-paydy value ="Paidyあと払い">
                                            <label for="payment-paydy">Paidyあと払い（3･6･12回払いも可能）</label>
                                        
                                        </div>
                                        <span class="form-message payment-error"></span>
                                    </div>
                                    
                                    <div class="close-formBtn">他のお支払い方法で支払う<i class="fa-solid fa-chevron-down"></i></div>
                                </div>
                        </div>

                    </div>
                    <div class="col l-4 m-4 c-12">
                        <div class="cart-total-box">
                            <div class="cart-total-title">
                                商品合計
                            </div>
                            <div class="cart-detail-box">
                                <div class="cart-detail">
                                    <div class="cart-detail-total-titletext">
                                        <div class="cart-detail-total-title">合計</div>
                                        <div class="cart-detail-total-tax"> 税込</div>
                                    </div>
                                    <div class="cart-detail-total-price">￥<span>${TotalPrice}</span> </div>
                                </div>
                                </div>
                            <button type="submit" class="payment-agree-btn primary-btn">入力内容を確認する</button>
                    </div>
                    </div>
                </form>
            </div>
    `
    let paymentCloseBtn = $('.close-formBtn')
    paymentCloseBtn.onclick = function () {
        let paymentForm = $('#payment-form')
        paymentForm.classList.toggle('form-close');
        if (paymentForm.classList.contains('form-close')) {
            paymentCloseBtn.innerHTML = '他のお支払い方法で支払う<i class="fa-solid fa-chevron-down"></i>';
        }
        else {
            paymentCloseBtn.innerHTML = '閉じる<i class="fa-solid fa-chevron-up"></i>';
        }

    }
    $('.cart-heading-cartshow.cart-active').addEventListener("click", TakeCart);
    Validator({
        form: '#cart__pay-form',
        formGroupSelector: '.input-group',
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#adress-name', 'ユーザー名を入力してください'),

            Validator.isRequired('#adress-phone', '電話番号を入力してください'),
            Validator.isPhoneNumber('#adress-phone', '正しい電話番号を入力してください'),

            Validator.isRequired('#adress-zip-code', '郵便番号を入力してください'),
            Validator.isRequired('#adress-prefecture', '都道府県を入力してください'),
            Validator.isRequired('#adress-city', '市区町村を入力してください'),
            Validator.isRequired('#adress-add', '町名・丁番地等を入力してくださいを入力してください。'),

            Validator.isRequired('input[name="payment"]', '支払い方法を選択しください')
        ],
        onSubmit: function TakeCartInforCheck(data) {

            $('.container').innerHTML =
                `<div class="grid wide">
                <div class="row">
                    <div class="cart-heading">
                    <div class="cart-heading-list cart-heading-cartshow cart-active">
                        ショッピングカート
                    </div>
                    <div class="cart-heading-list cart-heading-pay cart-active">
                        お届け先･発送方法･お支払い方法
                    </div>
                    <div class="cart-heading-list cart-heading-pay-check cart-active">
                        お届け先･発送方法･お支払い方法確認
                    </div>
                    <div class="cart-heading-list cart-heading-paysucess">
                        注文完了
                    </div>                  
                </div>
        
                </div>
                <form action="post" id ="cart__pay-form" class="row cart-content">
                    <div class="col l-8 c-12">
                        <div class="cart__pay-form">
                            <div class="address-form">
                                <div class="row">
                                    <div class="cart__pay-form-title">届け先</div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-name" class="address-id">
                                            名前
                                        </label>
                                    </div>                                   
                                    <div class="col l-8 m-8 c-12">
                                        ${data['adress-name']}
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-phone" class="address-phone">電話番号</label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        ${data['adress-phone']}
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-zipcode" class="address-zip-code">郵便番号
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        ${data['adress-zip-code']}
                                    </div>   
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-prefecture" class="address-prefecture">都道府県
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        ${data['adress-prefecture']}
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-city" class="address-city">市区町村
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        ${data['adress-city']}
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-add" class="address-add">町名・丁番地等
                                        </label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        ${data['adress-add']}
                                    </div>
                                </div>
                                <div class="input-group row">
                                    <div class="col l-4 m-4 c-12">
                                        <label for="adress-building" class="address-building">マンション名・号室等</label>
                                    </div>
                                    <div class="col l-8 m-8 c-12">
                                        ${data['adress-building']}
                                    </div>
                                </div>
                            </div>                           
                            <div class="payment-form">
                                <div id ="payment-form" class="form-close input-group">
                                    <div class="row">
                                        <div class="payment-form-title">お支払方法</div>
                                    </div>
                                    <div class="radio-group row">
                                        <div class='payment-value-check'>
                                            ${data['payment']}
                                        <div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div class="col l-4 c-12">
                        <div class="cart-total-box">
                            <div class="cart-total-title">
                                商品合計
                            </div>
                            <div class="cart-detail-box">
                                <div class="cart-detail">
                                    <div class="cart-detail-total-titletext">
                                        <div class="cart-detail-total-title">合計</div>
                                        <div class="cart-detail-total-tax"> 税込</div>
                                    </div>
                                    <div class="cart-detail-total-price">￥<span>${TotalPrice}</span> </div>
                                </div>
                            </div>
                            <div class="payment-agree-btn primary-btn">入力内容を確認する</div>
                        </div>
                    </div>
                </form>
            </div>
        `
            $('.cart-heading-cartshow.cart-active').addEventListener("click", TakeCart);
            $('.cart-heading-pay.cart-active').onclick = TakeCartInfor;

            $('.payment-agree-btn').onclick = function TakeCartAgree() {
                $('.container').innerHTML =
                    `<div class="gird wide">
            <div class="row">
                <div class="cart-heading">
                    <div class="cart-heading-list cart-heading-cartshow cart-active">
                        ショッピングカート
                    </div>
                    <div class="cart-heading-list cart-heading-pay cart-active">
                        お届け先･発送方法･お支払い方法
                    </div>
                    <div class="cart-heading-list cart-heading-pay-check cart-active">
                        お届け先･発送方法･お支払い方法確認
                    </div>
                    <div class="cart-heading-list cart-heading-paysucess cart-active">
                        注文完了
                    </div>                  
                </div>
        
            </div>
            <div class="row">
                <div class="payment-success__content">
                    <div class="payment-success__content-title">
                        THANK YOU!
                    </div>
                    <div class="payment-success__content-thank">
                        ご注文ありがとうございます
                    </div>
                    <div class="payment-success__content-img">
                        <i class="fa-solid fa-truck"></i>
                    </div>
                    <div class="payment-success__content-number-box">
                        <div class="payment-success__content-number-title">
                            お客様のご注文番号
                        </div>
                        <div class="payment-success__content-number">
                            SL00------------
                        </div>
                    </div>
                    <div class="payment-success__content-notification">ご注文詳細メールを</div>
                    <div class="payment-success__content-notification">ご登録メールアドレスに送りしました</div>
                    <div class="payment-success__content-cancel">ご注文キャンセルについて</div>
                    <div class="payment-success__content-change">返品・交換について</div>
                    <a href="./index.html" class="primary-btn payment-success__content-keepBtn ">
                        買い物を続けます
                    </a>
                </div>
            </div>
        </div>
            `
            }

        }
    });
}



if (window.innerWidth < 1023) {
    $$('.cart-heading-list').forEach(headinglist => {
        headinglist.innerHTML = '.';
    });
}
// payment-CloseBtn---------------------------------------------Start









// payment-CloseBtn---------------------------------------------End

//zipcodeCheckBtn-----------------------------------------------Start


//zipcodeCheckBtn-----------------------------------------------End