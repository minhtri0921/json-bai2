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

$("button#add").click(async function (e) {
    e.preventDefault();
    let title = $('input[name="title"]').val();
    let description = $('textarea[name="description"]').val();
    let detail = $('textarea[name="detail"]').val();
    let status = $('select[name="status"]').val();

    let formData = {
        title: title,
        description: description,
        detail: detail,
        status: status
    }
    try {
        await axios({
            method: "POST",
            url: 'http://localhost:3004/books',
            data: JSON.stringify(formData),
            headers: { "Content-Type": "application/json" },
        })
        location = 'list.html?msg=1'
    } catch (error) {
        $("p#error").html(`<p>Xảy ra lỗi : ${error}</p>`)
        $("p#error").attr('style', 'color : red')
    }

})

$("button a").click(function () {
    location = 'list.html'
})
