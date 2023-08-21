// Laays về danh sách người dùng
let users = JSON.parse(localStorage.getItem('users')) || [];

const handleLogin = () => {
    //lấy ra dữ liệu 
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // xác thực dữ liệu 
    if (username.trim() === "" || password.trim() === "") {
        document.getElementById("error").innerText = "Tên đăng nhập hoặc mật khẩu không đc để trống";
        return;
    }

    // kiểm tra tồn tại 
    let userLogin = checkLogin(username, password)
    if (userLogin == null) {
        document.getElementById("error").innerText = "Tên đăng nhập hoặc mật khẩu không chính xác , vui lòng thử lại";
        return;
    }

    // đăng nhập thành công
    sessionStorage.setItem("userlogin", JSON.stringify(userLogin))

    // kiểm tra quyền
    if (userLogin.role === "ADMIN") {
        // đièu hướng về admin/index
        location.href = "/admin/admin.html"
    } else {
        // điều hướng trang về home 
        location.href = "/main.html"
    }

}

const checkLogin = (username, password, email) => {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if ((user.username === username && user.password === password) || (user.email === email && user.password === password)) {
            return user;
        }
    }
    // không ìm thấy
    return null;
}


