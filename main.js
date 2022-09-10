var titleFocus = true,
    line_number = 0,
    parameters,
    line_p,
    emptyLines = [],
    maxLine,
    halfHeight = window.innerHeight / 2,
    isFullScreen = false,
    playMusic,
    parameters = {
        colors: [
            "29, 29, 31",
            "22, 33, 62",
            "250, 47, 181",
            "83, 52, 131",
            "233, 69, 96",
            "15, 52, 96",
        ],
        info: {
            title: "向&ensp;北&ensp;方",
            maker: "舒&ensp;婷",
        },
        lines: [
            "一朵初夏的蔷薇",
            "划过波浪的琴弦",
            "向不可及的水平远航",
            "乌云像癣一样",
            "布满天空的颜面",
            "鸥群",
            "却为她铺开洁白的翅膀",
            "",
            "去吧",
            "我愿望的小太阳",
            "如果你沉没了",
            "就睡在大海的胸膛",
            "在水母银色的帐顶",
            "永远有绿色的波涛喧响",
            "",
            "让我也漂去吧",
            "让阳光熨贴的风",
            "把我轻轻吹送",
            "顺着温暖的海流",
            "漂向北方",
            "",
            "小组成员<br>孟轩聪&emsp;裴梓辰<br>卜梓航&emsp;葛婉怡",
        ],
        style: {
            l21: "font-size: 27pt;line-height: 1.5em",
        },
        blur: "0px",
        music: {
            enable: true,
            stop: 21,
        },
    }

const title = document.querySelector("#title"),
    lines = document.querySelector("#lines"),
    bgm = document.querySelector("#bgm"),
    root = document.documentElement

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
        "</div><p>——&ensp;" +
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
