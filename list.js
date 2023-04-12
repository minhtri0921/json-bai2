async function getData() {

    let heading = `<tr>
    <th>id</th>
    <th>title</th>
    <th>description</th>
    <th>detail</th>
    <th>status</th>
    <th>function</th>
</tr>`
    let listBook = await axios('http://localhost:3004/books')
    listBook = listBook.data

    function renderBooks(book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.description}</td>
        <td>${book.detail}</td>
        <td>${book.status}</td>
        <td><a href="edit.html?id=${book.id}" ">Sửa</a> <a href="" onclick="return confirm('Bạn có chắc chắn muốn xóa không?')" >Xóa</a></td>
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

}
getData()
$("a#editLink").click(function () {
    location = 'edit.html'
})


