const data = JSON.parse(localStorage.getItem("product")) || []
let indexUpdateGlobal = null
const inputName = document.getElementById("name")
const inputSum = document.getElementById("sum")
const inputphanLoai = document.getElementById("phanloai")
const inputstock = document.getElementById("stock")
const inputdescription = document.getElementById("description")
//hàm vẽ
function Table(c = data) {
    // c.sort((a, b) => b.id - a.id);
    // c = JSON.parse(localStorage.getItem("product")) || []
    let stringHTML = "";
    c.forEach(e => stringHTML +=
        `
                <tr>
                    <td>${e.id}</td>
                    <td>${e.name}</td>
                    <td><img src="img/products/${e.img}" width"100" height="100"  style="object-fit:cover"></td>
                    <td>${e.sum}vnd</td>
                    <td>${e.phanloai}</td>
                    <td>${e.stock}</td>
                    <td>${e.description}</td>
                    <td>
                        <div class="action_col">
                            <button class="btn btn_sua" onclick="toggleForm(${e.id})">Edit</button>
                             <button class="btn btn_xoa" onclick="deleteProduct(${e.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `
    )
    document.getElementById("table_body").innerHTML = stringHTML
}
Table()
// location.reload()
function toggleForm(id) {
    const data = JSON.parse(localStorage.getItem("product")) || []
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = data.findIndex(e => e.id == id)
        indexUpdateGlobal = indexUpdate
        inputName.value = data[indexUpdate].name
        inputSum.value = data[indexUpdate].sum
        inputphanLoai.value = data[indexUpdate].phanloai
        inputstock.value = data[indexUpdate].stock
        inputdescription.value = data[indexUpdate].description
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}


document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    //update
    const data = JSON.parse(localStorage.getItem("product")) || []
    if (indexUpdateGlobal != null) {
        let img = document.getElementById("image").value
        img = img.split("\\")
        img = img[img.length - 1]
        data[indexUpdateGlobal].name = inputName.value
        data[indexUpdateGlobal].sum = inputSum.value
        data[indexUpdateGlobal].phanloai = inputphanLoai.value
        data[indexUpdateGlobal].stock = inputstock.value
        data[indexUpdateGlobal].description = inputdescription.value
        data[indexUpdateGlobal].img = img
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        localStorage.setItem("product", JSON.stringify(data))
        Table()
        return
    }//thêm
    let imax = getNewId()
    let img = document.getElementById("image").value
    img = img.split("\\")
    img = img[img.length - 1]
    const product = {
        id: imax,
        name: inputName.value,
        sum: inputSum.value,
        phanloai: inputphanLoai.value,
        stock: inputstock.value,
        description: inputdescription.value,
        img: img,
    }
    data.push(product)
    localStorage.setItem("product", JSON.stringify(data))
    this.reset()
    toggleForm()
    Table()
    location.reload()
})
//xóa 1 phần tử
function deleteProduct(id) {
    const data = JSON.parse(localStorage.getItem("product")) || []
    const indexDelete = data.findIndex(e => e.id == id)
    const result = confirm(`Delete ${data[indexDelete].name}`)
    if (result) {
        data.splice(indexDelete, 1)
    }
    localStorage.setItem("product", JSON.stringify(data))
    Table()
    location.reload()
}
//seach
function checkSearch() {
    let text = document.getElementById("search").value;
    let foundStudent = data.filter(stu => stu.name.toLowerCase().includes(text.trim().toLowerCase()));
    Table(foundStudent);
    // location.reload()
}

// id tự tăng
function getNewId() {
    let idMax = 0;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (idMax < element.id) {
            idMax = element.id
        }
    }
    return idMax + 1;
}


// const getCategoryNameByCategoryId = (id) => {
//     // tim danh muc theo id
//     // returrn vee teen 
//     return categories.find((cat) => cat.id == id).name;
// };
// tính toán tổng số trang ;
let totalProduct = data.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalProduct / count); // tổng số trang
// console.log(totalPage);

// đổ ra giao diện
const showPagination = () => {
    let links = "";
    for (let i = 0; i < totalPage; i++) {
        links += `<li class="page-item ${i == pageCurrent ? 'active' : ''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i + 1}</a></li>`
    }

    document.querySelector(".pagination").innerHTML = `
${links}`
}

// phần trang  : số trang hiện tại / số phần tử trên 1 trang
const handlePagination = (page = 0) => {
    pageCurrent = page
    data.sort((a, b) => b.id - a.id);
    let productPaginate = data.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    Table(productPaginate)
    showPagination()
}
handlePagination();



function confirmLogout() {
    let result = confirm("bạn có chắc chắn muốn đăng xuất không");
    if (result) {
        // Thực hiện thao tác đăng xuất tại đây
        alert("Đăng xuất thành công!");
        window.location.href = "../admin/adminlogin.html"
    }

}

function toggleLogoutMenu(avatar) {
    avatar.classList.toggle("active");
}
