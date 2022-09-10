// function mousedown(event) {
//     var e = window.event;
//     var obj = e.srcElement;
//     obj.style.color = 'blue';
// }

var titleFocus = true,
    line_number = 0
const title = document.querySelector("#title"),
    lines = document.querySelector("#lines"),
    line_p = lines.getElementsByTagName("p"),
    bgm = document.querySelector("#bgm")
// bgm.controls = true
// console.log(line_p)
function mouseup() {
    if (titleFocus) {
        title.classList.add("titleHidden")
        lines.classList.remove("linesHidden")
        bgm.play()
        // console.log("s")
        titleFocus = false
    } else if (line_number <= 20) {
        line_number++
        // lines.style.top = ""
        // lines.style.top = "calc(50% -" + line_number * 84 + "px)"
        line_p[line_number - 1].classList.remove("focus")
        if (line_number == 7 || line_number == 14 || line_number == 20) {
            line_number++
        }
        lines.setAttribute(
            "style",
            "top: calc(50% - " + line_number * 84 + "px) !important"
        )

        line_p[line_number].classList.add("focus")
    }
}
