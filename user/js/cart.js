let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
if (userLogin == null) {
    alert("Vui lòng đăng nhập đề xem giở hàng");
    location.href = "/user/login.html";
}

// { id: 1, name: "Áo nam dáng dài", sum: "140000", phanloai: "Loại B", stock: "14",… }



function showCart() {
    let products = JSON.parse(localStorage.getItem("product")) || [];
    const userLogin = JSON.parse(sessionStorage.getItem("userlogin"));

    let stringHTML = "";
    let total = 0;

    userLogin.cart.forEach(element => {
        const product = products.find(e => e.id == element.idPro);
        total += +product.sum * element.quantity;
        stringHTML +=

            `<tr>
                    <td>${product.id}</td>
                    <td><img src="/user/img/products/${product.img}" alt="#" class="product-image"></td>
                    <td>${product.name}</td>
                    <td>${(product.sum * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td><input type="number" class="quantity-input" id="quantity_${element.idPro}" value="${element.quantity}" min="1" ></td>
                    <td>${(+product.sum * element.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    <td class="action-btns">
                        <button class="update-btn" onclick="handleUpdate(${element.idPro})" >Update</button>
                        <button class="remove-btn" onclick="handleDelete(${element.idPro})" >Remove</button>
                    </td>
                </tr>
    `;
    });
    document.querySelector("tbody").innerHTML = stringHTML;
    //     document.querySelector("tfoot").innerHTML = ` <tr>
    //    <td colspan="8" style="text-align: center;">Tổng tiền : ${total}$</td>
    //  </tr>`;
    document.getElementById("total_All").innerHTML = `${(total * 1).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`

}
showCart();



// XỬ lí xóa
const handleDelete = (idPro) => {
    let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
    if (confirm("Bạn có chắc chắn muốn xóa")) {
        let indexDelete = userLogin.cart.findIndex(ct => ct.idPro == idPro)
        userLogin.cart.splice(indexDelete, 1);
        sessionStorage.setItem("userlogin", JSON.stringify(userLogin))
        showCart();
    }
    location.reload();
}


// hàm sử lí cập nhật
const handleUpdate = (idPro) => {
    // let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
    // lấy ra số lượng cần cập nhật
    let quantity = +document.querySelector(`#quantity_${idPro} `).value
    if (quantity < 1) {
        alert("Số lượng tối thiểu là 1")
        showCart()
        return
    }
    // Láy ra vị trí cần cập nhật
    let indexCartItem = userLogin.cart.findIndex(
        (cartIt) => cartIt.idPro == idPro
    );
    userLogin.cart[indexCartItem].quantity = quantity;
    sessionStorage.setItem("userlogin", JSON.stringify(userLogin))
    showCart();
}



let orders = JSON.parse(localStorage.getItem("orders")) || []

// tạo hóa đơn
const handleCheckOut = () => {
    if (document.querySelector("tbody").innerHTML == "") {
        alert("Bạn đặt ít nhất một đơn hàng")
        return
    }
    const products = JSON.parse(localStorage.getItem("product"))
    let order_id = getNewId(); // id hóa đơn tự tăng
    let user_id = userLogin.user_id; // id người dùng đang đăng nhập

    let orders_details = []; //  danh sách chi tiết hóa đơn
    let total = 0; // tổng tiền
    for (let i = 0; i < userLogin.cart.length; i++) {
        const element = userLogin.cart[i];

        //  tìm sản phẩm theo id
        let product = products.find(p => p.id == element.idPro)
        //tính tổn tiền
        total += +product.sum * element.quantity;
        // mỗi spp trong giỏ hàng sẽ là 1 chi tiết hoa đơn tỏng hóa đơn
        let order_detail = {
            id: element.idPro,
            name: product.name,
            sum: product.sum,
            quantity: element.quantity
        }
        orders_details.push(order_detail);
    }


    let order_at = new Date().toLocaleString();
    let status = 1;
    let note = document.getElementById("note").value;

    // tạo hóa đơn mới
    let newOrder = {
        order_id,
        user_id,
        order_at,
        total,
        status,
        note,
        orders_details
    }

    // console.log(newOrder);
    orders.push(newOrder);
    // lưu vào local
    localStorage.setItem("orders", JSON.stringify(orders));
    // reset giỏ hàng
    userLogin.cart = [];
    sessionStorage.setItem("userlogin", JSON.stringify(userLogin));

    // trước khi đăng xuất thì lưu giỏ hàng vào local
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // tìm vị trí của userlogin
    let userLoginIndex = users.findIndex((user) => user.user_id == userLogin.user_id);

    users[userLoginIndex] = userLogin;
    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users))
    alert("Đơn hàng đã được đặt")
    location.reload();
}
// tạo id tự tăng
const getNewId = () => {
    let idMax = 0;
    for (let i = 0; i < orders.length; i++) {
        const element = orders[i];
        if (idMax < element.order_id) {
            idMax = element.order_id;
        }
    }
    return idMax + 1;
}



