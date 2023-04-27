function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

let msg = findGetParameter('msg');

async function getData() {
    if (msg === '1') {
        $("span#msg").html(`<p style="color:green">Thêm thành công</p>`)

    } else if (msg === '2') {
        $("span#msg").html(`<p style="color:green">Sửa thành công</p>`)
    }

    let heading = `<tr>
    <th>id</th>
    <th>title</th>
    <th>description</th>
    <th>detail</th>
    <th>status</th>
    <th>function</th>
</tr>`
    try {
        let listBook = await axios('http://localhost:3004/books')
        listBook = listBook.data
        console.log(listBook);
        function renderBooks(book) {
            return `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.description}</td>
            <td>${book.detail}</td>
            <td>${book.status}</td>
            <td><a href="edit.html?id=${book.id}" ">Sửa</a> <a href="javascript: void(0)" onclick="remove(${book.id})" >Xóa</a></td>
            </tr>`
        }
        let str = ''
        function display(listBook) {
            for (const book of listBook) {
                str += renderBooks(book)
            }
            $("table#list").html(heading + str)

        }
        display(listBook)
    } catch (error) {
        $("p#error").html(`<p>Xảy ra lỗi : ${error}</p>`)
        $("p#error").attr('style', 'color : red')
    }


}
getData()
async function remove(id) {

    console.log(id);
    let yon = window.confirm("Bạn có muốn xóa sách này ? ")

    if (yon === true) {
        console.log(123);
        try {
            await axios({
                method: "DELETE",
                url: 'http://localhost:3004/books' + "/" + id,

                headers: { "Content-Type": "application/json" },
            })

            $("span#msg").html("Xóa thành công")
            $("span#msg").attr("style", "color:green")

        } catch (error) {
            $("p#error").html(`<p>Xảy ra lỗi : ${error}</p>`)
            $("p#error").attr('style', 'color : red')
        }

        getData()
    }
}


