
//Pagination ------------------------------------------
let currentPage = 1//元のページ
let perPage = 5 //so trang di chuyen 
let totalPage = 0// ページの数
let perItem = [] //アイテムが表示される
let filterItem = list_items

function getItem(listItem) {
    perItem = listItem.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage,)
    renderItem(perItem)
}
function handlerPageNumber(num, element) {
    $$('.bar-page_list-item').forEach(item => {
        item.classList.remove('page-checked');
    });

    // Thêm class 'page-checked' vào trang hiện tại
    element.classList.add('page-checked');
    currentPage = num
    perItem = filterItem.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage,)
    renderItem(perItem)
}

function renderPageNumber(list_items) {
    $('.bar-page_list').innerHTML = "";

    totalPage = Math.ceil(list_items.length / perPage);
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
getItem(list_items)
renderPageNumber(list_items)
filterSort (list_items)

function renderItem(perItem) {
    $('.list-items').innerHTML =
`   <thead>
        <th>ID</th>
        <th>商品名</th>
        <th>ブランド</th>
        <th>カテゴリー</th>
        <th>カラー</th>
        <th>サイズ</th>
        <th>値段</th>
        <th>在庫</th>
        <th>動作</th>
    </thead>
    ${perItem.map(item => `
        <tbody class="">
            <tr>
                <td>${item.id}</td>
                <td class="item-image-name">
                    <div class="item-img-name_box">
                        <img class="item-img" src="/image/item-image/${item.color_img[0].img[0]}" alt="item-img">
                        ${item.name}
                    </div>
                </td>
                <td>${item.brand}</td>
                <td>${item.category}</td>
                <td >
                    <div class="color-box" style="display: flex; gap: 10px;">
                        ${item.color_img.map(item_color => `
                        <div class="item-color" 
                            style="background-color:${item_color.color_nameEng};
                            border-radius: 50%;
                            width: 20px;
                            height: 20px;
                            box-sizing:border-box;">
                        </div>
                        `).join('')}
                    </div>               
                </td>
                <td>${item.size}</td>
                <td>${item.price}￥</td>
                <td class="zaiko-total">${item.zaiko}</td>
                <td>
                    <div class="action-box" style="display: flex; gap: 10px; height:100%;">
                        <div class="action-edit"><a href="/product-edit/${item.id}">更新</a></div>
                        <div class="action-delete"><a href="#" onclick="deleteItem(${item.id})">削除</a></div>
                    </div>
                    
                </td>
            </tr>
        </tbody>
        <tbody class="item-course-list">
                <tr class="item-course-list-down">
                    <td colspan="9" >
                        <i class="fa-solid fa-chevron-down"></i>
                    </td>
                </tr>
                ${item.color_img.map(itemColor => `
                    ${itemColor.color_size.map(itemColor_size => `
                <tr class="item-course" style="display: none;">
                    <td></td>
                    <td class="item-image-name">
                        <div class="item-img-name_box">
                            <img class="item-img" src="/image/item-image/${itemColor.img[0]}" alt="item-img">
                            ${item.name}
                        </div>
                    </td>
                    <td>${item.brand}</td>
                    <td>${item.category}</td>
                    <td>
                        <div class="color-box" style="display: flex; gap: 10px;">
                            <div class="item-color" 
                                style="background-color:${itemColor.color_nameEng};
                                border-radius: 50%;
                                width: 20px;
                                height: 20px;
                                box-sizing:border-box;">
                            </div>
                        </div>               
                    </td>
                    <td>${itemColor_size.size}</td>
                    <td>${item.price}￥</td>
                    <td class="item-zaiko">${itemColor_size.zaiko}</td>
                    <td>
                        <div class="action-box" style="display: flex; gap: 10px; height:100%;">
                            <div class="action-edit"><a href="/product-edit/${item.id}">更新</a></div>
                            <div class="action-delete"><a href="#" onclick="deleteItemColor(${item.id},'${itemColor.color_nameEng}','${itemColor_size.size}')">削除</a></div>
                        </div>
                        
                    </td>
                </tr>
                `).join('')}
            `).join('')}
            </tbody>
    `).join('')}
    `
    totalZaiko()
    itemListHide()
}
function deleteItem(id) {
    $('.warning-delete-box-background').style.display = 'flex'
    let selectItem = list_items.find((item) => item.id == id)
    if (selectItem) {
        $('.warning-delete-box').innerHTML = `
        <div class="warning-delete-title">
                <h2>Delete Item</h2>
                <div class="warning-delete-box-close"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div class="warning-delete-content">
                Are you sure to delete item:<br>
                <div class="warning-delete-content-item">
                    <img class="item-img" src="/image/item-image/${selectItem.color_img[0].img[0]}" alt="item-img">
                    ${selectItem.name}
                </div>      
            </div>
            <div class="warning-delete-action">
                <div class="warning-delete-cancel">キャンセル</div>
                <a href="/item-delete/${id}" class="warning-delete-sure">削除</a>
            </div>
        
        `
    }
    if ($('.warning-delete-box-close')) {
        $('.warning-delete-box-close').onclick = function () {
            $('.warning-delete-box-background').style.display = 'none'
        }
    }
    if ($('.warning-delete-cancel')) {
        $('.warning-delete-cancel').onclick = function () {
            $('.warning-delete-box-background').style.display = 'none'
        }
    }
}
function deleteItemColor(id, itemColorName, itemColorSize) {
    $('.warning-delete-box-background').style.display = 'flex'
    let selectItem = list_items.find((item) => item.id == id)
    let selectItemColor = selectItem.color_img.find((itemColor) => itemColor.color_nameEng == itemColorName)
    if (selectItem) {
        $('.warning-delete-box').innerHTML = `
        <div class="warning-delete-title">
                <h2>Delete Item</h2>
                <div class="warning-delete-box-close"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div class="warning-delete-content">
                Are you sure to delete item:<br>
                <div class="warning-delete-content-item">
                    <div class ="row">
                    <div class="col l-2">
                        <img class="item-img" src="/image/item-image/${selectItemColor.img[0]}" alt="item-img">
                    </div>
                    <div class = "col l-10">
                        ${selectItem.name}
                        <div style="display:flex">
                        カラー：<div class='delete-content-item-color' style ='background-color:${selectItemColor.color_nameEng};border-radius:50%'></div>
                        </div>
                        <div style="display:flex">
                        サイズ：<div class='delete-content-item-size'>${itemColorSize}</div>
                    </div>
                </div>
                </div>
            </div>
            <div class="warning-delete-action">
                <div class="warning-delete-cancel">キャンセル</div>
                <a href="/item-colorsize-delete/${selectItem.id}/${selectItemColor.id}/${itemColorSize}" class="warning-delete-sure">削除</a>
            </div>
        `
    }
    if ($('.warning-delete-box-close')) {
        $('.warning-delete-box-close').onclick = function () {
            $('.warning-delete-box-background').style.display = 'none'
        }
    }
    if ($('.warning-delete-cancel')) {
        $('.warning-delete-cancel').onclick = function () {
            $('.warning-delete-box-background').style.display = 'none'
        }
    }
}


function itemListHide() {
    document.querySelectorAll('.item-course-list-down').forEach(function (button) {
        button.addEventListener('click', function () {
            let nextElement = this.nextElementSibling;

            // Lặp qua tất cả các phần tử kế tiếp cho đến khi không còn phần tử có class 'item-course'
            while (nextElement && nextElement.classList.contains('item-course')) {
                // Toggle hiển thị phần tử
                if (nextElement.style.display === 'none' || !nextElement.style.display) {
                    nextElement.style.display = 'table-row'; // Hiển thị phần tử
                } else {
                    nextElement.style.display = 'none'; // Ẩn phần tử
                }

                // Chuyển sang phần tử kế tiếp
                nextElement = nextElement.nextElementSibling;
            }
        });
    });
}

// total stock
// Lấy tất cả các phần tử tbody chứa class 'item-course-list' (liên kết với từng sản phẩm)

function totalZaiko() {
    const productBodies = document.querySelectorAll('.item-course-list');
    productBodies.forEach(productBody => {
        // Tìm tất cả các phần tử 'item-zaiko' bên trong phần tử này
        productBody.style.backgroundColor = 'var(--hover-color)';
        const zaikoElements = productBody.querySelectorAll('.item-zaiko');

        // Tính tổng số lượng
        let totalZaiko = 0;
        zaikoElements.forEach(zaikoElement => {
            const value = parseInt(zaikoElement.textContent, 10);
            if (!isNaN(value)) {
                totalZaiko += value;
            }
        });

        const zaikoTotalElement = productBody.previousElementSibling.querySelector('.zaiko-total');
        if (zaikoTotalElement) {
            zaikoTotalElement.textContent = totalZaiko;
        }

    });
}
//filter
function filterSort (categoryItem){
    const sortValue = $('.content__title-sort-selected').value 
    if (sortValue == "価格が安い順") {
        categoryItem.sort((a, b) => a.price - b.price);
    } else if (sortValue == "価格が高い順") {
        categoryItem.sort((a, b) => b.price - a.price);
    }else if(sortValue == "高評価商品"){
        categoryItem.sort((a, b) => b.rating - a.rating);
    }
    else if(sortValue == "低評価商品"){
        categoryItem.sort((a, b) => a.rating - b.rating);
    }
    getItem(categoryItem)
}
// Lắng nghe sự kiện DOMContentLoaded để thêm sự kiện click vào các tab
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.sort__tab-list').forEach(function (tab) {
        tab.onclick = function () {
            document.querySelector('.content__title-sort-selected').value = this.innerHTML;
            document.querySelector('.sort__tab-list.selected').classList.remove('selected');
            this.classList.add('selected');
            filterSort (filterItem)
        }
    });
});
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

    filterItem = list_items.filter(item => item.price >= filterPriceValueMin && item.price < filterPriceValueMax)
    
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
    getItem(filterItem)
    filterSort (filterItem)
    renderPageNumber(filterItem)
}
