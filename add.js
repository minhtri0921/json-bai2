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
    await axios({
        method: "POST",
        url: 'http://localhost:3004/books',
        data: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
    })
    location = 'list.html'

})

$("button a").click(function () {
    location = 'list.html'
})



// let nameElement = $("input#title")
// let descriptionElement = $("input#description")
// let detailElement = $("input#detail")
// function handleBlurInput(input) {
//     var errorElement = $(".form-message")
//     input.blur(function () {
//         if (input.val() === '') {
//             let errorMesagge = "Vui lòng nhập"
//             $(errorElement).attr('style', 'color: red; font-style: italic;');
//             $(errorElement).text(errorMesagge);
//         } else {
//             $(errorElement).text('');
//         }
//     })
// }
// handleBlurInput(nameElement)
// handleBlurInput(typeElement)