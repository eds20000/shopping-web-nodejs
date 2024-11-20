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
const colorListCookie = getCookie("colorList");
if (colorListCookie) {
    let parsedColorList = JSON.parse(colorListCookie); // Chuyển chuỗi JSON thành mảng
    const listBox = document.querySelector('.item-color-list-box'); // Đảm bảo element tồn tại
    console.log(listBox)
    if (listBox && !$('.item-color-list-box.filePaths')) {
        parsedColorList.forEach((item, index) => {
            // Tạo HTML cho mỗi item từ dữ liệu
            const colorImgsHTML = item.colorImgSrc.map(imgSrc => `<img alt="item-img" class="item-colorImg" src="${imgSrc}">`).join('');

            const sizeItemsHTML = item.colorSize.map(sizeItem => `
                <div class="item-colorImg-size-list">
                    <label for="item-colorImg-size">サイズ</label>
                    <input type="text" class="item-colorImg-size" name="item-colorImg-size" value="${sizeItem.size}">                                          
                    <label for="item-colorImg-stock">在庫</label>                                                      
                    <input type="text" class="item-colorImgSize-stock" name="item-colorImgSize-stock" value="${sizeItem.stock}">
                    <div class="item-colorImgSize-Delete" onclick="itemColorSizeDelete(this)" style="display: inline-block;">サイズの削除</div>     
                </div>
            `).join('');

            // Gắn HTML vào danh sách
            listBox.innerHTML += `
                <div class="item-color-list">
                    <div class="itemColorImg-box">
                        <div class="item-color-box">
                            <div class="colorSelected" style="background-color:${item.color};"></div>
                            <label for="color_name">カラー名：</label>
                            <input type="text" name="color_name" value="${item.colorName}">
                        </div>
                        <div class="item-colorImg-box">
                            ${colorImgsHTML}
                        </div>
                    </div>
                    <div class="itemColorImgSize-box">
                        <div class="item-colorImgSize-add" onclick="itemColorSizeAdd(this)">サイズの追加</div>
                        ${sizeItemsHTML}
                    </div>
                    <div class="item-colorImg-remove" onclick="itemColorDelete(this)">削除</div>
                </div>
            `;
        });
    } else {
        console.error("Không tìm thấy phần tử '.item-color-list-box'.");
    }
} else {
    console.log("Không tìm thấy danh sách màu trong cookie.");
}
// Hàm lưu cookie
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`; // Lưu cookie
}

// Hàm lấy giá trị cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Hàm khôi phục dữ liệu từ cookie vào các trường nhập liệu
function restoreFormData() {
    const itemName = getCookie("item-name");
    const itemBrand = getCookie("item-brand");
    const itemCategory = getCookie("item-category");
    const itemPrice = getCookie("item-price");
    const itemSize = getCookie("item-size");
    const itemZaiko = getCookie("item-zaiko");
    const itemInfo = getCookie("item-info");

    if (itemName) document.querySelector('input[name="item-name"]').value = itemName;
    if (itemBrand) document.querySelector('input[name="item-brand"]').value = itemBrand;
    if (itemCategory) document.querySelector('input[name="item-category"]').value = itemCategory;
    if (itemPrice) document.querySelector('input[name="item-price"]').value = itemPrice;
    if (itemSize) document.querySelector('input[name="item-size"]').value = itemSize;
    if (itemZaiko) document.querySelector('input[name="item-zaiko"]').value = itemZaiko;
    if (itemInfo) document.querySelector('textarea[name="item-info"]').value = itemInfo;
}

// Gọi hàm khôi phục dữ liệu khi trang được tải lại
window.onload = restoreFormData;

// Thêm sự kiện cho các trường nhập liệu để tự động lưu vào cookie
document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('input', function () {
        setCookie(this.name, this.value); // Lưu giá trị vào cookie khi người dùng nhập
    });
});
//Set cookie cho color
const colorLists = []
if($$('.item-color-list') ){
    document.querySelectorAll('.item-color-list').forEach(colorList => {
        if(!colorList.classList.contains('disable')){
            let color = colorList.querySelector('.colorSelected').style.backgroundColor
            let colorName = colorList.querySelector('input[name="color_name"]').value
            let colorImgSrc = []
            let colorSize = []
            colorList.querySelectorAll('.item-colorImg').forEach(colorImgSrcList => {
                colorImgSrc.push(colorImgSrcList.src)
            })
            colorList.querySelectorAll('.item-colorImg-size-list').forEach(colorSizeList =>{
                colorSize.push({
                    size:colorSizeList.querySelector('input[name="item-colorImg-size"]').value,
                    stock:colorSizeList.querySelector('input[name="item-colorImgSize-stock"]').value
                })
            })
    
            colorLists.push({
                color:color,
                colorName:colorName,
                colorImgSrc:colorImgSrc,
                colorSize:colorSize
            })
        }
    })
    setCookie('colorList', JSON.stringify(colorLists));
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
        itemColorList.classList.add('disable')
        // Tạo cấu trúc HTML cho item-color-list
        itemColorList.innerHTML = `
        <div class="itemColorImg-box">
        <form action="/upload-img-add/" method="POST" enctype="multipart/form-data" class="image-upload-form" style="display:block;">
            <div class="item-color-box">
                <div class="colorSelected" style="background-color:${colorInput};"></div>
                <label for="color_name">カラー名：</label>
                <input type="text" name="color_name"> 
            </div>
            <div class="item-colorImg-box">
                <input type="file" name="image-add" id="${uniqueId}" multiple accept="image/*" hidden>
                <input type="text" name="colorInput" value="${colorInput}" hidden> 
                <label for="${uniqueId}" class="image-upload-label">
                    <span class="material-symbols-rounded"> 画像アップロード </span> 
                </label>
            </div>
            <div class="itemColorImgSize-box">                           
                <div class="item-colorImgSize-add" onclick ="itemColorSizeAdd(this)">サイズの追加</div>
                <div class="item-colorImg-size-list">
                    <label for="item-colorImg-size">サイズ</label>
                    <input type="text" class="item-colorImg-size" name ="item-colorImg-size"></input>                                           
                    <label for="item-colorImg-size">在庫</label>                                                      
                    <input type="text" class="item-colorImgSize-stock" name ="item-colorImgSize-stock"></input>
                    <div class="item-colorImgSize-Delete" onclick ="itemColorSizeDelete(this)" style="display: inline-block;">サイズの削除</div>     
                </div>
            </div>
        </form>
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
            let itemColorBox = event.target.closest('.itemColorImg-box');

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
            if (itemColorBox) {
                const agreeButton = document.createElement('button');
                agreeButton.type = "submit";
                agreeButton.className = "item-colorImg-agree";
                agreeButton.textContent = "確認";
                itemColorBox.querySelector('.image-upload-form').appendChild(agreeButton);
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
    const itemColorList = a.closest('.item-color-list');
    if (itemColorList) {
        // Lấy giá trị colorName từ phần tử cần xóa
        const colorName = itemColorList.querySelector('input[name="color_name"]').value;
        const updatedColorLists = colorLists.filter(item => item.colorName !== colorName);
        setCookie('colorList', JSON.stringify(updatedColorLists));
        // Xóa phần tử trong DOM
        itemColorList.remove();
    }
}
function itemColorSizeDelete(a) {
    a.closest('.item-colorImg-size-list').remove()
}
function itemColorSizeAdd(a) {
    const newItem = document.createElement('div');
    newItem.classList.add('item-colorImg-size-list');
    
    // Thêm nội dung HTML vào phần tử mới
    newItem.innerHTML = `
        <label for="item-colorImg-size">サイズ</label>
        <input type="text" class="item-colorImg-size" name="item-colorImg-size" value=""></input>
        <label for="item-colorImgSize-stock">在庫</label>
        <input type="text" class="item-colorImgSize-stock" name="item-colorImgSize-stock" value=""></input>
        <div class="item-colorImgSize-Delete" onclick="itemColorSizeDelete(this)" style="display: inline-block;">サイズの削除</div>
    `;

    // Thêm phần tử mới vào container
    a.closest('.itemColorImgSize-box').appendChild(newItem);
}

function handleSubmit(event) {
    event.preventDefault();  // Prevent default form submission

    const formData = new FormData();
    try {
        const itemName = document.querySelector('input[name="item-name"]').value;
        const itemBrand = document.querySelector('input[name="item-brand"]').value;
        const itemCategory = document.querySelector('input[name="item-category"]').value;
        const itemPrice = document.querySelector('input[name="item-price"]').value;
        const itemZaiko = document.querySelector('input[name="item-zaiko"]').value;
        const itemInfo = document.querySelector('textarea[name="item-info"]').value;
        const itemSize = document.querySelector('input[name="item-size"]').value

        console.log("itemName:", itemName);
        console.log("itemBrand:", itemBrand);
        console.log("itemCategory:", itemCategory);
        console.log("itemPrice:", itemPrice);
        console.log("itemZaiko:", itemZaiko);
        console.log("itemInfo:", itemInfo);

        if ( !itemName || !itemBrand || !itemCategory || !itemPrice || !itemZaiko || !itemInfo) {
            throw new Error('All fields are required!');
        }

        // Append item details to formData
        formData.append('name', itemName);
        formData.append('brand', itemBrand);
        formData.append('category', itemCategory);
        formData.append('price', itemPrice);
        formData.append('zaiko', itemZaiko);
        formData.append('size', itemSize);
        formData.append('infor', itemInfo);



        // Collect color and image information
        const colorImgList = [];
        document.querySelectorAll('.item-color-list').forEach(colorItem => {
            const colorNameEng = colorItem.querySelector('.colorSelected').style.backgroundColor;
            const colorName = colorItem.querySelector('input[name="color_name"]').value;

            const imgUrls = [];
            colorItem.querySelectorAll('.item-colorImg').forEach(img => {
                imgUrls.push(img.src.split('/').pop());
            });

            const colorSize = [];
            colorItem.querySelectorAll('.item-colorImg-size-list').forEach(sizeItem => {
                const size = sizeItem.querySelector('input[name="item-colorImg-size"]').value;
                const stock = sizeItem.querySelector('input[name="item-colorImgSize-stock"]').value;
                colorSize.push({ size, zaiko: stock });
            });

            colorImgList.push({
                color_nameEng: colorNameEng,
                color_name: colorName,
                img: imgUrls,
                color_size: colorSize
            });
        });
        formData.append('color_img', JSON.stringify(colorImgList));

        // Send data to the server
        fetch('/product-edit/add-item', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('更新に成功しました。');
                    window.location.href = "/admin-page";
                }

            })
            .catch(error => {
                console.error('Lỗi:', error);
            });
    } catch (err) {
        alert('情報をすべてご記入ください!');
        console.error(err);
    }
}





