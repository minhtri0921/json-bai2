let listBooks = []

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

let id = findGetParameter('id');
async function getData() {
    let bookEdit = await axios(`http://localhost:3004/books/${id}`)
    bookEdit = bookEdit.data;
    console.log(bookEdit);
    $('input[type="text"]').val(bookEdit.title)
    $('textarea[name="description"]').val(bookEdit.description)
    $('textarea[name="detail"]').val(bookEdit.detail)
    $('select[name="status"]').val(bookEdit.status)

    $('button#edit').click(async function (e) {
        e.preventDefault()
        let newTitle = $('input[type="text"]').val()
        let description = $('textarea[name="description"]').val()
        let detail = $('textarea[name="detail"]').val()
        let status = $('select[name="status"]').val()

        let formData = [
            {
                title: newTitle,
                description: description,
                detail: detail,
                status: status
            }
        ]
        console.log(formData);

        await axios({
            method: "PUT",
            url: 'http://localhost:3004/books/' + id,
            data: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        })
    })
}
getData()



