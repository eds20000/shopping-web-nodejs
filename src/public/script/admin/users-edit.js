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

//Pagination ------------------------------------------
let currentPage = 1 //元のページ
let perPage = 6 //so trang di chuyen 
let totalPage = 0// ページの数
let perUser = [] //アイテムが表示される
function getUser() {
    perUser = list_users.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage,)
    renderPageNumber()
    renderUser()
}

function handlerPageNumber(num, element) {
    $$('.bar-page_list-item').forEach(item => {
        item.classList.remove('page-checked');
    });

    // Thêm class 'page-checked' vào trang hiện tại
    element.classList.add('page-checked');
    currentPage = num
    perUser = list_users.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage,)
    renderUser()
}

function renderPageNumber() {
    totalPage = list_users.length / perPage
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
getUser()
console.log(list_users)
function renderUser() {
    document.querySelector('.ad_page-user-list').innerHTML =
        `
                        <tr>
                            <th>ID</th>
                            <th>ユーザー名</th>
                            <th>メールアドレス</th>
                            <th>性別</th>
                            <th>誕生日</th>
                            <th>作成時</th>
                            <th>動作</th>
                        </tr>
                        ${perUser.map(user =>
            `
                            <tr>
                                <td>${user.user_id}</td>
                                <td class="user-nameImg">
                                    <div class="user-img"><img src="/image/user-image/${user.user_img}" alt=""></div>
                                    <div class="user-name">${user.user_name}</div>
                                </td>
                                <td>${user.user_email}</td>
                                <td>${user.user_sex}</td>
                                <td>${user.user_birth}</td>
                                <td>${user.created_at}</td>
                                <td>
                                    <div class="action-box" style="display: flex; gap: 10px; height:100%; justify-content:center">
                                        <div class="action-edit"><a href="/users-edit/${user.user_id}">更新</a></div>
                                        <div class="action-delete"><a href="#" onclick="deleteUser(${user.user_id})">削除</a></div>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
    `
}
function deleteUser(id) {
    document.querySelector('.warning-delete-box-background').style.display = 'flex'
    let selectUser = list_users.find((user) => user.user_id == id)
    if (selectUser) {
        document.querySelector('.warning-delete-box').innerHTML = `
        <div class="warning-delete-title">
                <h2>Delete User</h2>
                <div class="warning-delete-box-close"><i class="fa-solid fa-xmark"></i></div>
            </div>
            <div class="warning-delete-content">
                Are you sure to delete User:<br>
                <div class="warning-delete-content-item">
                    <img class="item-img" src="/image/user-image/${selectUser.user_img}" alt="item-img">
                    ${selectUser.user_name}
                </div>      
            </div>
            <div class="warning-delete-action">
                <div class="warning-delete-cancel">キャンセル</div>
                <a href="/users-delete/${selectUser.user_id}" class="warning-delete-sure">削除</a>
            </div>
        
        `
    }
    if (document.querySelector('.warning-delete-box-close')) {
        document.querySelector('.warning-delete-box-close').onclick = function () {
            document.querySelector('.warning-delete-box-background').style.display = 'none'
        }
    }
    if (document.querySelector('.warning-delete-cancel')) {
        document.querySelector('.warning-delete-cancel').onclick = function () {
            document.querySelector('.warning-delete-box-background').style.display = 'none'
        }
    }
}