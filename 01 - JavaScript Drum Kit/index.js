document.addEventListener("keydown", handleKeyPress)

const keys = document.querySelectorAll('.key')
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition)
})

function handleKeyPress(e){
    console.log(e.keyCode)
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    if(!audio) return;
    let key = document.querySelector(`div[data-key="${e.keyCode}"]`)
    audio.currentTime = 0
    key.classList.add("playing")
    audio.play()
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return;
    this.classList.remove("playing")
}