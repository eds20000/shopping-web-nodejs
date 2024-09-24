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
            // Lấy màu nền của colorSelected
            const currentColorRgb = window.getComputedStyle(colorSelected).backgroundColor;

            // So sánh màu đã chuẩn hóa
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

        // Tạo cấu trúc HTML cho item-color-list
        itemColorList.innerHTML = `
        <div class="itemColorImg-box">
            <div class="item-color-box">
                <div class="colorSelected" style="background-color:${colorInput};"></div>
            </div>
            <div class="item-colorImg-box">
                <input type="file" name="image" id="${uniqueId}" accept="image/*" multiple style="display: none">
                <label for="${uniqueId}" class="image-upload-label">
                    <span class="material-symbols-rounded"> 画像アップロード </span> 
                </label>
            </div>
        </div>
            <div class="itemColorImgSize-box">                           
                <div class="item-colorImg-size-list">
                    <label for="item-colorImg-size">サイズ</label>
                    <input type="text" class="item-colorImg-size" name ="item-colorImg-size" value=""></input>                                           
                    <label for="item-colorImg-size">在庫</label>                                                      
                    <input type="text" class="item-colorImgSize-stock" name ="item-colorImgSize-stock" value=""></input>     
                </div>
                <div class="item-colorImg-remove" onclick ="itemColorDelete(this)">削除</div>
            </div>
        </div>
        `;

        // Thêm item-color-list vào item-color-list-box
        document.querySelector('.item-color-list-box').appendChild(itemColorList);

        let imageInput = itemColorList.querySelector('input[type="file"]');

        imageInput.addEventListener('change', (event) => {
            let files = event.target.files;

            // Tìm phần tử cha item-color-list
            let itemColorList = event.target.closest('.item-color-list');
            let imgBox = itemColorList.querySelector('.item-colorImg-box');
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if (file) {
                    let reader = new FileReader();
                    reader.onload = () => {
                        if (imgBox) {
                            imgBox.innerHTML += `<img alt="item-img" class="item-colorImg" src="${reader.result}">
                            `;
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
            $('.image-upload-label').remove()
            document.getElementById(uniqueId).remove()
        });
    }
}

function itemColorDelete(a) {
    a.closest('.item-color-list').remove()
}