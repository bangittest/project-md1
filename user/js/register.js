
let users = JSON.parse(localStorage.getItem('users')) || [];

const handleLogin = () => {
    // lấy ra toàn bộ thông tin ô input
    let username = document.getElementById('username').value;
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let passwordConfirm = document.getElementById('repassword').value;
    // console.log(username, email,fullName, password, passwordConfirm);


    // Xác thực dữ liệu
    // username : không để trống
    if (username.trim() === "") {
        document.getElementById("usernameError").innerText = "Không được để trống";
        return;
    } else if (users.findIndex((value) => value.username === username) > -1) {
        document.getElementById("usernameError").innerText = "Đã tồn tại tài khoản này, vui lòng nhập tên khác";
        return;
    } else {
        document.getElementById("usernameError").innerText = "";
    }
    // full name  : không để trống
    if (fullName.trim() === "") {
        document.getElementById("fullNameError").innerText = "Không được để trống";
        return;
    } else {
        document.getElementById("fullNameError").innerText = "";
    }
    // email
    if (email.trim() === "") {
        document.getElementById("emailError").innerText = "Không được để trống";
        return;
    } else if (!validateEmail(email)) {
        document.getElementById("emailError").innerText = "Không đúng định dạng email";
        return;
    } else if (users.findIndex((value) => value.email === email) > -1) {
        document.getElementById("emailError").innerText = "Đã tồn tại email này, vui lòng nhập tên khác";
        return;
    } else {
        document.getElementById("emailError").innerText = "";
    }
    //password
    if (password.trim() === "") {
        document.getElementById("passError").innerText = "Không được để trống";
        return;
    } else if (!validatePassword(password)) {
        document.getElementById("passError").innerText = "Mật khẩu phải ít nhất 6 kí tự bao gồm 1 chữ số";
        return;
    } else {
        document.getElementById("passError").innerText = "";
    }
    // kiểm tra xác nhận mật khẩu
    if (password !== passwordConfirm) {
        document.getElementById("passConfirmError").innerText = "Mật khẩu không trùng khớp";
        return;
    }
    // thực hiện đăng kí : tạo đối tượng user
    let newUser = {
        user_id: getNewId(),
        username,
        email,
        full_name: fullName,
        password,
        role: "USER",
        avatar: "avatar.jpg",
        cart: []
    }
    // thêm newUser vào mảng
    users = [...users, newUser];
    // lưu lên local
    localStorage.setItem("users", JSON.stringify(users));
    // chuyển trang tự động
    location.href = "/user/login.html";
}
// hàm validate email
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
// hàm validate pass 
const validatePassword = (pass) => {
    return String(pass)
        .toLowerCase()
        .match(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/);
}
// hàm tự tăng id
const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < users.length; i++) {
        const u = users[i];
        if (u.user_id > idMax) {
            idMax = u.user_id;
        }
    }
    return idMax + 1;
}




















const swiper = new Swiper('.swiper', {

    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
});
