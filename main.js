var titleFocus = true,
    line_number = 0,
    parameters,
    line_p,
    emptyLines = [],
    maxLine,
    halfHeight = window.innerHeight / 2,
    isFullScreen = false,
    playMusic

const title = document.querySelector("#title"),
    lines = document.querySelector("#lines"),
    bgm = document.querySelector("#bgm"),
    root = document.documentElement

window.onload = function () {
    let url = "Configure.json"
    let request = new XMLHttpRequest()
    request.open("get", url)
    request.send(null)
    request.onload = function () {
        if (request.status == 200)
            var parameters = JSON.parse(request.responseText)

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

        //! music

        if (parameters.music.enable) {
            playMusic = true
            stopMusic = parameters.music.stop
        }
    }
}

function nextLine() {
    if (titleFocus) {
        title.classList.add("titleHidden")
        lines.classList.remove("linesHidden")
        if (playMusic) {
            bgm.play()
        }
        line_p[0].classList.add("focus")
        titleFocus = false
    } else if (line_number < maxLine) {
        line_number++
        line_p[line_number - 1].classList.remove("focus")
        if (emptyLines.includes(line_number)) {
            line_number++
        }
        if (playMusic && line_number == stopMusic) {
            console.log("s")
            let countdown = 49,
                reduceSound = setInterval(() => {
                    bgm.volume = countdown / 50
                    if (countdown == 3) {
                        clearInterval(reduceSound)
                    }
                    countdown--
                }, 20)
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
