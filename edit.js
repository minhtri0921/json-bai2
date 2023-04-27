let titleElement = $('input[name="title"]')
let descriptionlement = $('textarea[name="description"]')
let detailElement = $('textarea[name="detail"]')
function handleBlurInput(input) {
    var errorElement = input.siblings(".form-message");
    console.log(errorElement);
    input.blur(function () {
        if (input.val() === '') {
            $(errorElement).attr('style', 'color: red; font-style: italic;');
            $(errorElement).text("Vui lòng nhập");
        } else {
            $(errorElement).text('');
        }
    })
}
handleBlurInput(titleElement)
handleBlurInput(descriptionlement)
handleBlurInput(detailElement)
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
    try {
        let bookEdit = await axios(`http://localhost:3004/books/${id}`)
        bookEdit = bookEdit.data;
        console.log(bookEdit);
        $('input[type="text"]').val(bookEdit.title)
        $('textarea[name="description"]').val(bookEdit.description)
        $('textarea[name="detail"]').val(bookEdit.detail)
        $('select[name="status"]').val(bookEdit.status)
    } catch (error) {
        $("p#error").html(`<p>Xảy ra lỗi : ${error}</p>`)
        $("p#error").attr('style', 'color : red')
    }

    $('button#edit').click(async function (e) {
        e.preventDefault()
        let newTitle = $('input[type="text"]').val()
        let description = $('textarea[name="description"]').val()
        let detail = $('textarea[name="detail"]').val()
        let status = $('select[name="status"]').val()

        let formData = {
            title: newTitle,
            description: description,
            detail: detail,
            status: status
        }

        try {
            await axios({
                method: "PUT",
                url: 'http://localhost:3004/books/' + id,
                data: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            })
            location = 'list.html?msg=2'
        } catch (error) {
            $("p#error2").html(`<p>Xảy ra lỗi : ${error}</p>`)
            $("p#error2").attr('style', 'color : red')
        }
    })

}
getData()



