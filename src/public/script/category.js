let category_item = [];
list_item.forEach(item => {
    if(item.category === category) {
        category_item.push(item)
        // Tạo phần tử div cho sản phẩm
    }
})

function renderItembyCategory(perItem) {
    const itemListContainer = document.querySelector('.category__item-list');
    
    itemListContainer.innerHTML = ''; 

    perItem.forEach(item =>{
        itemListContainer.innerHTML += `
        <div class="col l-2-4 c-4 m-3">
            <div class="sort__item" item-index="${item.id}">
                <a class="sort__item-link" data-id="${item.id}">
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
                            <a class="sort__item-favorite ${user && user.favorItems.find(favorItem => favorItem.item_id === item.id) ? 'sort__item-takecart-enable' : 'sort__item-takecart-disable'}" ${user ? `onclick="addToFavorites(${item.id},this)"` : 'href="/login"'}></a>
                            <button type="button" class="sort__item-takecart"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>
                    <div class="sort__item-star">
                        <div class="stars-outer">
                            <div class="stars-inner" style="width: ${item.rating > 0 ? item.rating / 5 * 100 : 0}%;"></div>
                        </div>
                        <div class="sort__item-star-number">
                            (<p>${item.ratingCount}</p>)
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    })

    // Gọi lại các hàm cần thiết sau khi thêm các phần tử vào
    changeImage();
    takeCart();
    productRedirect();
}

// Lắng nghe sự kiện DOMContentLoaded để thêm sự kiện click vào các tab
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.sort__tab-list').forEach(function (tab) {
        tab.onclick = function () {
            document.querySelector('.content__title-sort-selected').value = this.innerHTML;
            document.querySelector('.sort__tab-list.selected').classList.remove('selected');
            this.classList.add('selected');
    
            if (this.innerHTML.includes("価格が安い順")) {
                category_item.sort((a, b) => a.price - b.price);
            } else if (this.innerHTML.includes("価格が高い順")) {
                category_item.sort((a, b) => b.price - a.price);
            }else if(this.innerHTML.includes("高評価商品")){
                category_item.sort((a, b) => b.rating - a.rating);
            }
            console.log(category_item)
            renderItembyCategory(category); 
        }
    });
});



//Pagination ------------------------------------------
let currentPage = 1 //元のページ
let perPage = 16 //so trang di chuyen 
let totalPage = 0// ページの数
let perItem = [] //アイテムが表示される
function getItem() {
    perItem = category_item.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage,)
    renderPageNumber()
    renderItembyCategory(perItem)
}
console.log(category_item)
function handlerPageNumber(num, element) {
    $$('.bar-page_list-item').forEach(item => {
        item.classList.remove('page-checked');
    });

    // Thêm class 'page-checked' vào trang hiện tại
    element.classList.add('page-checked');
    currentPage = num
    perItem = category_item.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage,)
    renderItembyCategory(perItem)
}

function renderPageNumber() {
    totalPage = category_item.length / perPage
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
if (category) {
    getItem()
    CreatItemSelectBox();
}
