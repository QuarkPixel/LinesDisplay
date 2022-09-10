// function mousedown(event) {
//     var e = window.event;
//     var obj = e.srcElement;
//     obj.style.color = 'blue';
// }

// function closure(fn) {return function() {fn.apply(this, arguments);}

var titleFocus = true,
    line_number = 0,
    parameters,
    line_p,
    emptyLines = [],
    maxLine,
    halfHeight = window.innerHeight / 2,
    isFullScreen = false

const title = document.querySelector("#title"),
    lines = document.querySelector("#lines"),
    bgm = document.querySelector("#bgm"),
    root = document.documentElement

window.onload = function () {
    let url =
        "Lines.json" /*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
    let request = new XMLHttpRequest()
    request.open("get", url) /*设置请求方法与路径*/
    request.send(null) /*不发送数据到服务器*/
    request.onload = function () {
        if (request.status == 200)
            var parameters = JSON.parse(request.responseText)
        for (var i = 0; i < parameters.length; i++) {
            console.log(parameters[i].name)
        }

        //! color
        root.style.setProperty("--colorBG", parameters.colors[0])
        root.style.setProperty("--colorI", parameters.colors[1])
        root.style.setProperty("--colorII", parameters.colors[2])
        root.style.setProperty("--colorIII", parameters.colors[3])
        root.style.setProperty("--colorVI", parameters.colors[4])
        root.style.setProperty("--colorV", parameters.colors[5])

        //! blur
        root.style.setProperty("--blurValue", parameters.blur)

        //! title&maker
        if (parameters.info.maker) {
            title.innerHTML =
                "<div>" +
                parameters.info.title +
                "</div><p>" +
                parameters.info.maker +
                "</p>"
        } else {
            title.innerHTML = "<div>" + parameters.info.title + "</div>"
        }

        //! lines
        let linesHTML = ""
        maxLine = parameters.lines.length - 1
        for (var i = 0; i < parameters.lines.length; i++) {
            linesHTML += "<p>" + parameters.lines[i] + "</p>"
            if (!parameters.lines[i]) {
                // console.log(i)
                emptyLines.push(i)
            }
        }
        lines.innerHTML = linesHTML
        line_p = lines.getElementsByTagName("p")
        Object.keys(parameters.style).forEach(function (key) {
            line_p[Number(key.slice(1, key.length))].setAttribute(
                "style",
                parameters.style[key]
            )
        })
    }
}

function nextLine() {
    if (titleFocus) {
        title.classList.add("titleHidden")
        lines.classList.remove("linesHidden")
        bgm.play()
        line_p[0].classList.add("focus")
        titleFocus = false
    } else if (line_number < maxLine) {
        line_number++
        line_p[line_number - 1].classList.remove("focus")
        if (emptyLines.includes(line_number)) {
            line_number++
        }
        lines.setAttribute(
            "style",
            "top: " + (halfHeight - line_number * 84) + "px !important"
        )

        line_p[line_number].classList.add("focus")
    }
}

function lastLine() {
    if (line_number > 0) {
        line_number--
        line_p[line_number + 1].classList.remove("focus")
        if (emptyLines.includes(line_number)) {
            line_number--
        }
        lines.setAttribute(
            "style",
            "top: " + (halfHeight - line_number * 84) + "px !important"
        )

        line_p[line_number].classList.add("focus")
    }
}

document.addEventListener("keyup", (e) => {
    if (e.key == "ArrowUp" || e.key == "ArrowLeft") {
        lastLine()
    } else if (
        e.key == "ArrowDown" ||
        e.key == "ArrowRight" ||
        e.key == "Enter"
    ) {
        nextLine()
    }
})

// document.addEventListener(
//     "mousewheel",
//     function (event) {
//         console.log(event.wheelDelta > 0)
//     },
//     false
// )

function whichButton(event) {
    var btnNum = event.button
    if (btnNum == 2) {
        lastLine()
    } else if (btnNum == 0) {
        nextLine()
    } else if (btnNum == 1) {
        if (isFullScreen) {
            exitFullscreen()
            isFullScreen = false
        } else {
            launchFullScreen()
            isFullScreen = true
        }
    }
}

// 禁用右键菜单
document.oncontextmenu = function () {
    return false
}

//// 判断各种浏览器，找到正确的方法
function launchFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen()
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}
