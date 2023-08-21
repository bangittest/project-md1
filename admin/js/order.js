const data = JSON.parse(localStorage.getItem("orders")) || []
// let idGlobal = 1
let indexUpdateGlobal = null
const inputstatus = document.getElementById("status")
function Table(c = data) {
    // c = JSON.parse(localStorage.getItem("orders")) || []
    let stringHTML = "";
    c.forEach(e =>
        stringHTML +=
        `
                    <tr>
                        <td>${e.order_id}</td>
                        <td>${e.order_at}</td>
                        <td>${e.total}đ</td>
                        <td>${e.status}</td>
                        
                        <td>
                            <div class="action_col">
                                <button class="btn btn_sua" onclick="toggleForm(${e.order_id})">See</button>
                            </div>
                        </td>
                    </tr>
            `
    )
    document.getElementById("table_body").innerHTML = stringHTML
}
Table()


function toggleForm(id) {
    const data = JSON.parse(localStorage.getItem("orders")) || []
    document.getElementById("form_scope").classList.toggle("hide")
    if (id != undefined) {
        const indexUpdate = data.findIndex(e => e.order_id == id)
        indexUpdateGlobal = indexUpdate
        inputstatus.value = data[indexUpdate].status
    } else {
        indexUpdateGlobal = null
        document.getElementById("form").reset()
    }
}

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("orders")) || []
    if (indexUpdateGlobal != null) {
        data[indexUpdateGlobal].status = inputstatus.value
        indexUpdateGlobal = null
        this.reset()
        toggleForm()
        localStorage.setItem("orders", JSON.stringify(data))
        Table()
        location.reload();
        return
    }
    const users = {
        orders_id: getNewId(),
        status: inputstatus.value,
    }
    data.push(users)
    localStorage.setItem("orders", JSON.stringify(data))
    this.reset()
    toggleForm()
    Table()
    // location.reload();
})


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
    data.sort((a, b) => b.order_id - a.order_id);
    let productPaginate = data.filter((p, index) => (index >= (pageCurrent * count) && index < (pageCurrent + 1) * count))
    Table(productPaginate)
    showPagination()
}
handlePagination();
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

