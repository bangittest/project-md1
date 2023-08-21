// thêm sản phẩm vào giỏ hàng
const addToCart = (idPro) => {
    let userLogin = JSON.parse(sessionStorage.getItem("userlogin"));
    if (userLogin == null) {
        alert("Vui lòng đăng nhập đề xem giở hàng");
        location.href = "/user/login.html";
    }
    // lấy ra số lượng mua
    let quantity = +document.querySelector(".pro-qty > input").value;

    // nếu sp đã tồn tại trong giỏ hàng thì tăng số lượng
    let indexCartItem = userLogin.cart.findIndex(
        (cartIt) => cartIt.idProduct == idPro
    );
    if (indexCartItem > -1) {
        // đã tồn tại
        userLogin.cart[indexCartItem].quantity += quantity;
    } else {
        // chưa tồn tại , thêm mới
        let cartItem = {
            idPro: idPro,
            quantity: quantity,
        };
        userLogin.cart.push(cartItem);
    }
    sessionStorage.setItem("userlogin", JSON.stringify(userLogin));
    location.href = "/user/cart.html";
};

