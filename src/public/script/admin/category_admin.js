function deleteItem(id) {
    $('.warning-delete-box-background').style.display = 'flex'
    let selectItem = list_items.find((item) => item.id == id)
    if (selectItem) {
        $('.warning-delete-content-item').innerHTML = `
        <img class="item-img" src="/image/item-image/${selectItem.color_img[0].img[0]}" alt="item-img">
        ${selectItem.name}
        `
    }
}
function deleteItemColor(id, itemColorName, itemColorSize) {
    $('.warning-delete-box-background').style.display = 'flex'
    let selectItem = list_items.find((item) => item.id == id)
    let selectItemColor = selectItem.color_img.find((itemColor) => itemColor.color_nameEng == itemColorName)
    console.log(selectItemColor)
    if (selectItem) {
        $('.warning-delete-content-item').innerHTML = `<div class ="row">
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
        `
    }
}
if ($('.warning-delete-box-close')) {
    $('.warning-delete-box-close').onclick = function () {
        $('.warning-delete-box-background').style.display = 'none'
    }
}

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




