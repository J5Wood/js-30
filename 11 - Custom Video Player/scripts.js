const player = document.querySelector(".viewer")
const toggle = document.querySelector(".toggle")
const progressBar = document.querySelector(".progress")
const filledProgress = document.querySelector(".progress__filled")
const skips = document.querySelectorAll(".player__button")
const sliders = document.querySelectorAll(".player__slider")

let mousedown = false
let doubleClick = false
let fullscreen = false

toggle.addEventListener("click", handleToggleEvent)
player.addEventListener("click", handleClickEvent)
document.addEventListener("keydown", handleSpacePress)
progressBar.addEventListener("click", handleProgressEvent)
progressBar.addEventListener("mousemove", e => mousedown && handleProgressEvent(e))
document.addEventListener("mousedown", () => mousedown = true)
document.addEventListener("mouseup", () => mousedown = false)
document.addEventListener("click", () => fullscreen && handleToggleEvent())
player.addEventListener("play", updateButton)
player.addEventListener("pause", updateButton)
player.addEventListener("timeupdate", updateProgress)
sliders.forEach(slider => slider.addEventListener("change", handleRangeUpdate))
sliders.forEach(slider => slider.addEventListener("mousemove",e => mousedown && handleRangeUpdate(e)))

for(let i = 1; i < skips.length; i++){
    skips[i].addEventListener("click", () => handleSkipEvent(skips[i].dataset.skip))
}

function handleClickEvent() {
    if(doubleClick) {
        setFullscreen()
    } else {
        handleToggleEvent()
        doubleClick = true
        setTimeout(() => doubleClick = false, 300)
    }
}

function setFullscreen() {
    if(document.fullscreen){
        fullscreen = false
        document.exitFullscreen()
    } else {
        fullscreen = true
        player.requestFullscreen()
    }
}

function handleToggleEvent() {
    player.paused ? player.play() : player.pause()
}

function handleSpacePress(e) {
    if(e.code === 'Space') handleToggleEvent()
}

function updateButton(){
    const icon = this.paused ? '⏸' : '▶️'
    toggle.innerHTML = icon
}

function updateProgress() {

    filledProgress.style.flexBasis = `${player.currentTime / player.duration * 100}%`
}

function handleProgressEvent(e) {
    debugger
    const percentage = (e.offsetX / progressBar.offsetWidth).toFixed(2)
    player.currentTime = player.duration * percentage
    updateProgress()
}

function handleSkipEvent(seconds){
    player.currentTime += parseInt(seconds)
    filledProgress.style.flexBasis = `${player.currentTime / player.duration * 100}%`
}

function handleRangeUpdate(e) {
    player[e.target.name] = e.target.value
}