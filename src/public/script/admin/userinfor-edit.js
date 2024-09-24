let userImgInput = document.getElementById('user_avatar')
userImgInput.addEventListener('change', (event) => {
    const reader = new FileReader();
    const avatarPreview = document.querySelector('.user_avatar');

    reader.onload = function () {
        // Cập nhật src của thẻ img bằng ảnh mới
        avatarPreview.src = reader.result;
        avatarPreview.style.display = 'block'
    }

    // Đọc file ảnh được chọn
    reader.readAsDataURL(event.target.files[0])
})