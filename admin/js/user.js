
const data = JSON.parse(localStorage.getItem("users")) || []
// let idGlobal = 1
let indexUpdateGlobal = null
const inputrole = document.getElementById("role")
function Table(c = data) {
    // c = JSON.parse(localStorage.getItem("users")) || []
    let stringHTML = "";
    c.forEach(e =>
        stringHTML +=
        `
                    <tr>
                        <td>${e.user_id}</td>
                        <td>${e.username}</td>
                        <td>${e.email}</td>
                        <td>${e.full_name}</td>
                        <td>${e.password}</td>
                        <td>${e.role}</td>
                        <td>
                            <div class="action_col">
                                <button class="btn btn_sua" onclick="toggleForm(${e.user_id})">See</button>
                                <button class="btn btn_xoa" onclick="deleteProduct(${e.user_id})">Delete</button>
                            </div>
                        </td>
                    </tr>
            `
    )
    document.getElementById("table_body").innerHTML = stringHTML
}
Table()


function toggleForm(id) {
    const data = JSON.parse(localStorage.getItem("users")) || []
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = data.findIndex(e => e.user_id == id)
        indexUpdateGlobal = indexUpdate
        inputrole.value = data[indexUpdate].role
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("users")) || []
    if (indexUpdateGlobal != null) {
        data[indexUpdateGlobal].role = inputrole.value
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        localStorage.setItem("users", JSON.stringify(data))
        Table()
        location.reload();
        return
    }
    const users = {
        user_id: getNewId(),
        role: inputrole.value,
    }
    // idGlobal++
    data.push(users)
    localStorage.setItem("users", JSON.stringify(data))
    this.reset()
    toggleForm()
    Table()
    location.reload();
})

function deleteProduct(id) {
    const data = JSON.parse(localStorage.getItem("users")) || []
    const indexDelete = data.findIndex(e => e.user_id == id)
    const result = confirm(`Delete ${data[indexDelete].name}`)
    if (result) {
        data.splice(indexDelete, 1)
    }
    localStorage.setItem("users", JSON.stringify(data))
    Table()
    location.reload()
}

function checkSearch() {
    let text = document.getElementById("search").value;
    let foundStudent = data.filter(stu => stu.username.toLowerCase().includes(text.trim().toLowerCase()));
    Table(foundStudent);
}
// logic id tự tăng
function getNewId() {
    let idMax = 0;
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (idMax < element.user_id) {
            idMax = element.user_id
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
    data.sort((a, b) => b.user_id - a.user_id);
    let productPaginate = data.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    Table(productPaginate)
    showPagination()
}
handlePagination();

