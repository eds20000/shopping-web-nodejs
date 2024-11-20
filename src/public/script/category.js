let category_item = [];
let filterItem = []
list_item.forEach(item => {
    if(item.category === category) {
        category_item.push(item)
        // Tạo phần tử div cho sản phẩm
    }
})
category_item = category_item.filter(item => categoriesItemid.includes(item.id))


function renderItembyCategory(perItem) {
    const itemListContainer = document.querySelector('.category__item-list');
    itemListContainer.innerHTML = ''; 

    if(perItem.length > 0){
        perItem.forEach(item => {
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
    }
    else{
        itemListContainer.innerHTML =
        `
        <div class ="empty-item-found" style="text-align:center;width:100%;">
            <img src="/image/noitem.png">
        </div>    
        `
    }


    // Gọi lại các hàm cần thiết sau khi thêm các phần tử vào
    changeImage();
    takeCart();
    productRedirect();
}


//Pagination ------------------------------------------
let currentPage = 1 //元のページ
let perPage = 15 //so trang di chuyen 
let totalPage = 0// ページの数
var perItem = [] //アイテムが表示される
function getItem(itemList) {
    perItem = itemList.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage,)
    renderPageNumber(itemList)
    renderItembyCategory(perItem)
}
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

function renderPageNumber(itemList) {
    ('.bar-page_list').innerHTML = "";

    totalPage = Math.ceil(itemList.length / perPage);
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
    getItem(category_item)
    CreatItemSelectBox();
    filterSort (category_item)
}
// Lắng nghe sự kiện DOMContentLoaded để thêm sự kiện click vào các tab
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.sort__tab-list').forEach(function (tab) {
        tab.onclick = function () {
            document.querySelector('.content__title-sort-selected').value = this.innerHTML;
            document.querySelector('.sort__tab-list.selected').classList.remove('selected');
            this.classList.add('selected');
    
            if (this.innerHTML.includes("価格が安い順")) {
                perItem.sort((a, b) => a.price - b.price);
            } else if (this.innerHTML.includes("価格が高い順")) {
                perItem.sort((a, b) => b.price - a.price);
            }else if(this.innerHTML.includes("高評価商品")){
                perItem.sort((a, b) => b.rating - a.rating);
            }
            renderItembyCategory(perItem); 
        }
    });
});

function filterSort (categoryItem){
    const sortValue = $('.content__title-sort-selected').value 
    if (sortValue == "価格が安い順") {
        categoryItem.sort((a, b) => a.price - b.price);
    } else if (sortValue == "価格が高い順") {
        categoryItem.sort((a, b) => b.price - a.price);
    }else if(sortValue == "高評価商品"){
        categoryItem.sort((a, b) => b.rating - a.rating);
    }
    getItem(categoryItem)
}

function showFilterBox(thisElement) {
    thisElement.parentElement.closest('div').querySelector('.content__title-filter--box').classList.toggle('unhide')
    thisElement.parentElement.closest('div').addEventListener('mouseleave', () => {
        thisElement.parentElement.closest('div').querySelector('.content__title-filter--box').classList.remove('unhide')
    });
}

function filterItemsByPrice(minPrice, maxPrice) {
    const filterValue = $('.content__title-filter--price-box').querySelector('.content__title-filter--value');
    filterValue.innerHTML =
    `
    ${minPrice == 0 && maxPrice == 'Infinity' ? 'すべて' : `${minPrice} ~ ${maxPrice == 'Infinity' ? '' : maxPrice}`}
    ` 
    filterValue.setAttribute('data-price-min', minPrice.toString());
    filterValue.setAttribute('data-price-max', maxPrice.toString());

    runFilter();

}
function filterItemsByColor(colorName,colorEngname){

    const filterValue = $('.content__title-filter--color-box').querySelector('.content__title-filter--value');

    if(colorName != 'full'){
        $('.content__title-filter--color-box').querySelector('.content__title-filter--value').innerHTML =
        `
        <div class="filter-color" style="padding:0; margin: 0 auto; border-radius: 50%; width: 20px; height: 20px; background-color:${colorEngname};"></div>
        <div class="filter-colorName">${colorName}</div>
        ` 
        filterValue.setAttribute('data-colorName', colorName);
        filterValue.setAttribute('data-colorEngName', colorEngname);

    }
    else{
        filterValue.innerHTML = 'すべて'
        filterValue.setAttribute('data-colorName', colorName);
        filterValue.setAttribute('data-colorengname', '');
    }

    runFilter ()
}

function filterItemsByBrand(brandName){
    const filterValue = $('.content__title-filter--brand-box').querySelector('.content__title-filter--value');
    if(brandName != 'full'){
        filterValue.innerHTML = brandName
        filterValue.setAttribute('data-brand',brandName)
    }
    else{
        filterValue.innerHTML = 'すべて'
        filterValue.setAttribute('data-brand','full')
    }
    runFilter()
}

function filterItemsBySize(size){
    const filterValue = $('.content__title-filter--size-box').querySelector('.content__title-filter--value');
    if(size != 'full'){
        filterValue.innerHTML = size
        filterValue.setAttribute('data-size',size)
    }
    else{
        filterValue.innerHTML = 'すべて'
        filterValue.setAttribute('data-size','full')
    }
    runFilter()
}

function runFilter (){
    //filter price
    const filterPriceValue = $('.content__title-filter--price-box').querySelector('.content__title-filter--value');
    let filterPriceValueMin = filterPriceValue.getAttribute('data-price-min')
    let filterPriceValueMax = filterPriceValue.getAttribute('data-price-max')
    filterPriceValueMin = parseInt(filterPriceValueMin)
    filterPriceValueMax = filterPriceValueMax === 'Infinity' ? Infinity : parseInt(filterPriceValueMax)

    filterItem = category_item.filter(item => item.price >= filterPriceValueMin && item.price < filterPriceValueMax)
    
    //filter color
    const filterColorValue = $('.content__title-filter--color-box').querySelector('.content__title-filter--value');
    let filterColorValueName = filterColorValue.getAttribute('data-colorname')
    let filterColorValueEngame = filterColorValue.getAttribute('data-colorengname')

    if(filterColorValueName !='full'){
        filterItem = filterItem.filter(item => item.color_img.find(itemColor => itemColor.color_name === filterColorValueName));
    }

    //filter brand
    const filterBrandValue = $('.content__title-filter--brand-box').querySelector('.content__title-filter--value');
    let filterBrandValueName  = filterBrandValue.getAttribute('data-brand')
    if(filterBrandValueName !='full'){
        filterItem = filterItem.filter(item => item.brand === filterBrandValueName);
    }

    //filter size
    const filterSizeValue = $('.content__title-filter--size-box').querySelector('.content__title-filter--value');
    let filterSizeValueName = filterSizeValue.getAttribute('data-size')
    if(filterSizeValueName !='full'){
        filterItem = filterItem.filter(item =>
            item.color_img.some(itemColor =>
              itemColor.color_size.some(colorSize => colorSize.size === filterSizeValueName)
            )
        );
    }

    filterSort (filterItem)
    getItem(filterItem)
}
