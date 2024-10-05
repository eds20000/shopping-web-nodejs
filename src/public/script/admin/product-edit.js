const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


//HEADER TAB HIDE //
let lastScrollTop = 0;
const header = $('.header');
const headerHeight = header.clientHeight; // Chiều cao của header
const scrollThreshold = headerHeight; // Giá trị ngưỡng cuộn
const headerSearch = $('.header__search')

function getItemParent(element, parentAdress) {
    while (element.parentElement) {
        if (element.parentElement.matches(parentAdress)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}
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
function addColor() {
    // Lấy giá trị màu được chọn
    const colorInput = document.getElementById('item-color').value;

    // Hàm chuyển từ hex sang RGB
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    };

    // Hàm chuyển đổi tên màu sang dạng RGB (nếu cần)
    const colorNameToRgb = (colorName) => {
        const tempElement = document.createElement('div');
        tempElement.style.backgroundColor = colorName;
        document.body.appendChild(tempElement);
        const rgb = window.getComputedStyle(tempElement).backgroundColor;
        document.body.removeChild(tempElement);
        return rgb;
    };

    // Chuẩn hóa màu input
    let colorInputRgb;
    if (colorInput.startsWith('#')) {
        colorInputRgb = hexToRgb(colorInput);
    } else {
        // Nếu input là tên màu, chuyển đổi nó sang RGB
        colorInputRgb = colorNameToRgb(colorInput);
    }

    let colorExists = false;

    // Chọn tất cả các phần tử có class 'colorSelected'
    const colorSelectedElements = document.querySelectorAll('.colorSelected');

    // Kiểm tra xem màu đã tồn tại chưa
    if (colorSelectedElements.length > 0) {
        colorSelectedElements.forEach(colorSelected => {
            const currentColorRgb = window.getComputedStyle(colorSelected).backgroundColor;
            if (currentColorRgb === colorInputRgb) {
                colorExists = true;
                return;
            }
        });
    }

    // Nếu màu chưa tồn tại, thêm phần tử mới
    if (!colorExists) {
        const uniqueId = `imageUpload_${Date.now()}`; // Tạo id duy nhất cho input file

        // Tạo phần tử item-color-list
        const itemColorList = document.createElement('div');
        itemColorList.className = 'item-color-list';
        const itemId = document.querySelector('input[name="item-id"]').value
        // Tạo cấu trúc HTML cho item-color-list
        itemColorList.innerHTML = `
        <div class="itemColorImg-box">
            <div class="item-color-box">
                <div class="colorSelected" style="background-color:${colorInput};"></div>
                <input type="text" name="color_name" value=""> 
            </div>
            <div class="item-colorImg-box">
                <form action="/upload-img/${itemId}" method="POST" enctype="multipart/form-data" class="image-upload-form" style="display:block;">
                    <input type="file" name="image-add" id="${uniqueId}" multiple accept="image/*" hidden>
                    <input type="text" name="colorInput" value="${colorInput}" hidden> 
                    <label for="${uniqueId}" class="image-upload-label">
                        <span class="material-symbols-rounded"> 画像アップロード </span> 
                    </label>
                </form>
            </div>
        </div>
        <div class="itemColorImgSize-box">                           
                <div class="item-colorImg-size-list">
                    <label for="item-colorImg-size">サイズ</label>
                    <input type="text" class="item-colorImg-size" name ="item-colorImg-size" value=""></input>                                           
                    <label for="item-colorImg-size">在庫</label>                                                      
                    <input type="text" class="item-colorImgSize-stock" name ="item-colorImgSize-stock" value=""></input>
                    <div class="item-colorImgSize-Delete" onclick ="itemColorSizeDelete(this)" style="display: inline-block;">サイズの削除</div>     
                </div>
               <div class="item-colorImgSize-add" onclick ="itemColorSizeAdd(this)">サイズの追加</div>
        </div>
        <div class="item-colorImg-remove" onclick ="itemColorDelete(this)">削除</div>
        `;

        // Thêm item-color-list vào item-color-list-box
        document.querySelector('.item-color-list-box').insertAdjacentElement('afterbegin', itemColorList);

        let imageInput = document.getElementById(uniqueId);

        imageInput.addEventListener('change', async (event) => {
            let files = event.target.files;
            console.log(files);

            // Tìm phần tử cha item-color-list
            let imgBox = event.target.closest('.item-colorImg-box');

            // Sử dụng Promise.all để đọc tất cả các file
            const fileReaders = Array.from(files).map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (imgBox) {
                            const newImg = document.createElement('img');
                            newImg.alt = "item-img";
                            newImg.className = "item-colorImg";
                            newImg.src = reader.result;
                            imgBox.appendChild(newImg);
                        }
                        resolve();
                    };
                    reader.readAsDataURL(file);
                });
            });

            // Chờ cho tất cả file được đọc xong
            await Promise.all(fileReaders);

            // Thêm liên kết xác nhận vào cuối cùng
            if (imgBox) {
                const agreeButton = document.createElement('button');
                agreeButton.type = "submit";
                agreeButton.className = "item-colorImg-agree";
                agreeButton.textContent = "確認";
                imgBox.querySelector('.image-upload-form').appendChild(agreeButton);
            }

            // Xóa nhãn tải lên
            const uploadLabel = imgBox.querySelector('.image-upload-label');
            if (uploadLabel) {
                uploadLabel.remove();
            }
        });
    }
}


function itemColorDelete(a) {
    a.closest('.item-color-list').remove()
}
function itemColorSizeDelete(a) {
    a.closest('.item-colorImg-size-list').remove()
}
function itemColorSizeAdd(a) {
    a.closest('.itemColorImgSize-box').innerHTML +=
        `
    <div class="item-colorImg-size-list">
        <label for="item-colorImg-size">サイズ</label>
        <input type="text" class="item-colorImg-size" name ="item-colorImg-size" value=""></input>                                           
        <label for="item-colorImgSize-stock">在庫</label>                                                      
        <input type="text" class="item-colorImgSize-stock" name ="item-colorImgSize-stock" value=""></input>
        <div class="item-colorImgSize-Delete" onclick ="itemColorSizeDelete(this)" style="display: inline-block;">サイズの削除</div>
             
    </div>
    `
}

function handleSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành động submit mặc định của form

    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();
    try {
        const itemId = document.querySelector('input[name="item-id"]').value;
        const itemName = document.querySelector('input[name="item-name"]').value;
        const itemBrand = document.querySelector('input[name="item-brand"]').value;
        const itemCategory = document.querySelector('input[name="item-category"]').value;
        const itemPrice = document.querySelector('input[name="item-price"]').value;
        const itemZaiko = document.querySelector('input[name="item-zaiko"]').value;
        const itemInfo = document.querySelector('textarea[name="item-info"]').value;

        formData.append('id', itemId);
        formData.append('name', itemName);
        formData.append('brand', itemBrand);
        formData.append('category', itemCategory);
        formData.append('price', itemPrice);
        formData.append('zaiko', itemZaiko);
        formData.append('infor', itemInfo);

        // Thu thập kích thước
        const itemSize = [];
        document.querySelectorAll('input[name="item-size"]').forEach(item_size => {
            itemSize.push(item_size.value);
        });
        formData.append('size', JSON.stringify(itemSize));

        // Thu thập màu sắc và hình ảnh
        const colorImgList = [];
        document.querySelectorAll('.item-color-list').forEach((colorItem) => {
            const colorNameEng = colorItem.querySelector('.colorSelected').style.backgroundColor;
            const colorName = colorItem.querySelector('input[name="color_name"]').value;
            const colorId = colorItem.querySelector('input[name="color_id"]').value;

            const imgUrls = [];
            colorItem.querySelectorAll('.item-colorImg').forEach((img) => {
                imgUrls.push(img.src.split('/').pop());
            });

            const colorSize = [];
            colorItem.querySelectorAll('.item-colorImg-size-list').forEach((sizeItem) => {
                const size = sizeItem.querySelector('input[name="item-colorImg-size"]').value;
                const stock = sizeItem.querySelector('input[name="item-colorImgSize-stock"]').value;
                colorSize.push({ size, zaiko: stock });
            });

            colorImgList.push({
                color_id: colorId,
                color_nameEng: colorNameEng,
                color_name: colorName,
                img: imgUrls,
                color_size: colorSize
            });
        });

        formData.append('color_img', JSON.stringify(colorImgList));

        // Gửi dữ liệu đến server
        fetch('/product-edit/update-item', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('更新に成功しました。');
                }
            })
            .catch(error => {
                console.error('Lỗi:', error);
            });
    }
    catch (err) {
        alert('情報をすべてご記入ください!');
    }
    // Thu thập dữ liệu từ form
}




