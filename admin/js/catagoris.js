const data = JSON.parse(localStorage.getItem("categories")) || []
let indexUpdateGlobal = null
const inputName = document.getElementById("name")
const inputdescription = document.getElementById("description")
//hàm vẽ
function Table(c = data) {
    // c.sort((a, b) => b.id - a.id);
    c = JSON.parse(localStorage.getItem("categories")) || []
    let stringHTML = "";
    c.forEach(e => stringHTML +=
        `
                <tr>
                    <td>${e.id}</td>
                    <td>${e.name}</td>
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
    const data = JSON.parse(localStorage.getItem("categories")) || []
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = data.findIndex(e => e.id == id)
        indexUpdateGlobal = indexUpdate
        inputName.value = data[indexUpdate].name
        inputdescription.value = data[indexUpdate].description
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}


document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    //update
    const data = JSON.parse(localStorage.getItem("categories")) || []
    if (indexUpdateGlobal != null) {
        data[indexUpdateGlobal].name = inputName.value
        data[indexUpdateGlobal].description = inputdescription.value
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        localStorage.setItem("categories", JSON.stringify(data))
        Table()
        return
    }//thêm
    let imax = getNewId()
    const product = {
        id: imax,
        name: inputName.value,
        description: inputdescription.value,
    }
    data.push(product)
    localStorage.setItem("categories", JSON.stringify(data))
    this.reset()
    toggleForm()
    Table()
    location.reload()
})
//xóa 1 phần tử
function deleteProduct(id) {
    const data = JSON.parse(localStorage.getItem("categories")) || []
    const indexDelete = data.findIndex(e => e.id == id)
    const result = confirm(`Delete ${data[indexDelete].name}`)
    if (result) {
        data.splice(indexDelete, 1)
    }
    localStorage.setItem("categories", JSON.stringify(data))
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