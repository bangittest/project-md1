
const usLogin = JSON.parse(sessionStorage.getItem("userlogin"))
if (usLogin.role.toLowerCase() != "admin") {
    location.href = "../index.html"
}
function confirmLogout() {
    let result = confirm("Bạn có muốn thoát không");
    if (result) {
        // Thực hiện thao tác đăng xuất tại đây
        alert("Đăng xuất thành công!");
        window.location.href = "/user/login.html"
    }
}

function toggleLogoutMenu(avatar) {
    avatar.classList.toggle("active");
    this.reset()
}







let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
if (userLogin != null && userLogin.role == "ADMIN") {
    document.getElementById("username").innerText = userLogin.username;
    document.getElementById("avatar").src = `../user/img/${userLogin.avatar}`;
} else {
    // nếu không có quyền
    location.href = "/403.html"
}
