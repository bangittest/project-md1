
// lấy ra tài khoản đăng nhập hiện tại
let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
// lấy ra vị trí cần chèn tên và avatar
let divs = document.getElementsByClassName("account");
// kiẻm tra sự tồn tại
if (userLogin != null) { // nếu có tài khoản đăng nhập
    for (let i = 0; i < divs.length; i++) {
        const element = divs[i];
        element.innerHTML = `
        <div class="dropdown">
            <button id="btn_toggle_menu" class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img width="30" height="30" style="border-radius:50%; object-fit : cover" src="./user/img/${userLogin.avatar}" alt="">
                <span>${userLogin.username}</span>
            </button>
            <ul id="dropdown-menu_hidenz" class="dropdown-menu hidenz" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#">Profile</a></li>
              
                <li><a class="dropdown-item" onclick="handlelLogout()" href="#">Log Out</a></li>
            </ul>
         </div>
         `
    }

} else { // chưa có tài khoản đăng nhập
    for (let i = 0; i < divs.length; i++) {
        const element = divs[i];
        element.innerHTML = `<a href="./user/login.html"><i class="fa fa-user"></i> Login</a>`
    }
}

const handlelLogout = () => {
    //trước khi đăng xuất thì lưu giỏ hàng vào local
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // tìm vị trí của userlogin
    let userLoginIndex = users.findIndex((user) => user.user_id == userLogin.user_id);

    users[userLoginIndex] = userLogin;
    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users))

    // thực hiện đăng xuất tài khoản

    sessionStorage.removeItem("userlogin");
    // load lại trang
    location.reload();
}
// handlelLogout()
// localStorage.setItem("products", JSON.stringify([]))
// let arr = [
//     { name: "Bàn Học Bàn GameMing", price: 129998, selled: 297, img: "home3.jpg" }
// ]

// let str = ""
// for (let i = 0; i < 10; i++) {
//     const e = products[i];
//     str += `
//chọn mặc định giá trị in ra



// danh sách phân trang
let products = JSON.parse(localStorage.getItem("product"))
let arrC = []
let arrB = []
let arrA = []
products.forEach(e => {
    if (e.phanloai == "Loại C") {
        arrC.push(e)
    }
    else if (e.phanloai == "Loại B") {
        arrB.push(e)
    } else {
        arrA.push(e)
    }
})
// console.log(arr);
// products.push(...arr)
// localStorage.setItem("product", JSON.stringify(products))
print2()
function print2() {
    let str2 = ""
    for (let i = 0; i < 8; i++) {
        const e = products[i];
        str2 += `<div class="item">
                                    <div class="media">
                                        <div class="thumbnail object-cover">
                                            <a href="#">
                                                <img src="user/img/products/${e.img}" alt="">
                                            </a>
                                        </div>
                                        <div class="hoverable">
                                            <ul>
                                                <li class="active"><a href="#"><i class="ri-heart-line"></i></a>
                                                </li>
                                                <li><a href=""><i class="ri-eye-line"></i></a></li>
                                                <li><a href=""><i class="ri-shuffle-line"></i></a></li>
                                            </ul>
                                        </div>
                                        <div class="discount circle flexcenter"><span>33%</span></div>
                                    </div>
                                    <div class="content">
                                         <h4 class="main-links" onclick="hanDoclick(${e.id})"><a href = "#">${e.name}</a>
                                        </h4>
                                        <div class="price">
                                            <span class="current">${e.sum}đ</span>
                            <span class="normal mini-text">${Math.round(e.sum) * 1.2}₫</span>
                                        </div>
                                        <div class="mini-text">
                                            <p>297 Đã bán</p>
                                            <p>Miễn phí vận chuyển</p>
                                        </div>
                                    </div>
                                </div>`
    }
    document.getElementById("rowproductsmini").innerHTML = ""
    document.getElementById("rowproductsmini").innerHTML = str2
}
// ${ +e.sum + 10000 + Math.round(Math.random() * 30000) }
function print(arr = products) {
    let str = ""
    // forEach duyệt 1 mảng cụ thể
    arr.forEach(e =>
        str += `<div class="row products mini">
                <div class="item">
                    <div class="media">
                        <div class="thumbnail object-cover">
                            <a>
                                <img src="user/img/products/${e.img}" alt="">
                            </a>
                        </div>
                        <div class="hoverable">
                            <ul>
                                <li class="active"><a href="#"><i class="ri-heart-line"></i></a>
                                </li>
                                <li><a href=""><i class="ri-eye-line"></i></a></li>
                                <li><a href=""><i class="ri-shuffle-line"></i></a></li>
                            </ul>
                        </div>
                        <div class="discount circle flexcenter"><span>SALE</span></div>
                    </div>
                    <div class="content">
                        <h3 class="main-links" onclick="hanDoclick(${e.id})"><a href = "#">${e.name}</a>
                        </h3>
                        <div class="price">
                            <span class="current">${e.sum}đ</span>
                            <span class="normal mini-text">${Math.round(e.sum) * 1.2}₫</span>
                        </div>
                        <div class="mini-text">
                            
                            <p>Miễn phí vận chuyển</p>
                        </div>

                    </div>
                </div>
            </div>`
    );
    document.getElementById("product1111").innerHTML = ""
    document.getElementById("product1111").innerHTML = str
}
print()

function hanDoclick(id) {
    sessionStorage.setItem("producdetail", JSON.stringify(id))
    window.location.href = "user/description.html"
}

function checkSearch() {
    let text = document.getElementById("search").value;
    let foundStudent = products.filter(stu => stu.name.toLowerCase().includes(text.trim().toLowerCase()));
    print(foundStudent)
    location.href = "#another"
}
document.getElementById("search").addEventListener("keydown", (e) => {
    if (e.keyCode == 13) {
        checkSearch()
    }
})




const swiper = new Swiper('.swiper', {

    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
});


document.getElementById("btn_toggle_menu").addEventListener("click", function (e) {
    document.getElementById("dropdown-menu_hidenz").classList.toggle("hidenz")
})