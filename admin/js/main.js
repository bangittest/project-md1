let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
if (userLogin != null && userLogin.role == "ADMIN") {
    document.getElementById("username").innerText = userLogin.username;
    document.getElementById("avatar").src = `../user/img/${userLogin.avatar}`;
} else {
    // nếu không có quyền
    location.href = "/403.html"
}
