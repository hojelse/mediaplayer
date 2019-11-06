// const audioElement = document.createElement("audio")
// audioElement.src = "Dreamland.mp3"

const audioElement = document.querySelector("audio")

// const playBtn = document.querySelector(".play")
// playBtn.onclick = function(e) {
//   audioElement.play()
// }

// const pauseBtn = document.querySelector(".pause")
// pauseBtn.onclick = function(e) {
//   audioElement.pause()
// }

if ("mediaSession" in navigator) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: "Lorem ipsum dolor sit amet",
    artist: "Radio Modem",
    album: "DNA",
    artwork: [{ src: "dna.png", type: "image/png" }]
  })

  navigator.mediaSession.setActionHandler("play", function() {
    audioElement.play()
    play_1()
  })
  navigator.mediaSession.setActionHandler("pause", function() {
    audioElement.pause()
    pause()
  })
  navigator.mediaSession.setActionHandler("seekbackward", function() {})
  navigator.mediaSession.setActionHandler("seekforward", function() {})
  // navigator.mediaSession.setActionHandler("previoustrack", function() {})
  // navigator.mediaSession.setActionHandler("nexttrack", function() {})
}

const wrap = document.querySelector(".wrap")

// playBtn.addEventListener("click", e => play_1())
// pauseBtn.addEventListener("click", e => pause())

// let playing = false
// audioElement.addEventListener("playing", e => {
//   playing = true
// })
// audioElement.addEventListener("pause", e => {
//   playing = false
// })

function toggle() {
  if (audioElement.paused) {
    const record = document.getElementById("record")
    const anchor = document.getElementById("anchor")
    const pointer = document.getElementById("pointer")

    record.classList.toggle("record-on")
    anchor.classList.toggle("anchor-on")
    pointer.classList.toggle("pointer-on")
    wrap.classList.toggle("wrap-on")
  } else {
    const record = document.getElementById("record")
    const anchor = document.getElementById("anchor")
    const pointer = document.getElementById("pointer")

    record.classList.remove("record-on")
    anchor.classList.remove("anchor-on")
    pointer.classList.remove("pointer-on")
    wrap.classList.remove("wrap-on")
  }
}

function play_1() {
  if (audioElement.paused) {
    const record = document.getElementById("record")
    const anchor = document.getElementById("anchor")
    const pointer = document.getElementById("pointer")

    record.classList.add("record-on")
    anchor.classList.add("anchor-on")
    pointer.classList.add("pointer-on")
    wrap.classList.add("wrap-on")
  }
}

function pause() {
  if (!audioElement.paused) {
    const record = document.getElementById("record")
    const anchor = document.getElementById("anchor")
    const pointer = document.getElementById("pointer")

    record.classList.remove("record-on")
    anchor.classList.remove("anchor-on")
    pointer.classList.remove("pointer-on")
    wrap.classList.remove("wrap-on")
  }
}

audioElement.addEventListener("loadeddata", e => {
  document.querySelector(".length").innerHTML =
    Math.floor(audioElement.duration / 60) +
    ":" +
    leadZero(Math.floor(audioElement.duration), 2)
})

audioElement.addEventListener("timeupdate", e => {
  document.querySelector(".time").innerHTML =
    Math.floor(audioElement.currentTime / 60) +
    ":" +
    leadZero(Math.floor(audioElement.currentTime), 2)
})

let progress_2 = document.querySelector(".progress-2")
audioElement.addEventListener("timeupdate", e => {
  progress_2.setAttribute(
    "style",
    "width:" +
      ((audioElement.currentTime / audioElement.duration) * 200 + 4) +
      "px"
  )
})

// function pad(n, width, z) {
//   z = z || "0"
//   n = n + ""
//   return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
// }

// const leadZero = n => n < 10 ? `0${n}` : n

function leadZero(n) {
  return n < 10 ? `0${n}` : n
}

let progress = document.querySelector(".progress")
let newTime = audioElement.currentTime
progress.addEventListener("mousedown", e => {
  let diff = e.pageX - progress.offsetLeft
  if (diff >= 0 && diff < 200) {
    newTime = diff
  }
  audioElement.currentTime = (diff / 200) * audioElement.duration
})
progress.addEventListener("mousemove", e => {})
document.addEventListener("mouseup", e => {})

document.querySelector("#toggle").addEventListener("mousedown", e => {
  if (audioElement.paused) {
    audioElement.play()
    play_1()
    // Transform button to play state
    e.currentTarget.children[0].setAttribute("d", "M5,2.5 l 10,0 0,35 -10,0z")
    e.currentTarget.children[1].setAttribute("d", "M25,2.5 l 10,0 0,35 -10,0z")

    //Transform Vinyl
    const record = document.getElementById("record")
    const anchor = document.getElementById("anchor")
    const pointer = document.getElementById("pointer")
    record.classList.add("record-on")
    anchor.classList.add("anchor-on")
    pointer.classList.add("pointer-on")
    wrap.classList.add("wrap-on")
  } else {
    audioElement.pause()
    pause()
    // transform button to pause state
    e.currentTarget.children[0].setAttribute(
      "d",
      "M2.5,0 l 17.5,10 0,20 -17.5,10 z"
    )
    e.currentTarget.children[1].setAttribute("d", "M20,10 l 20,10 -20,10 z")

    //Transform Vinyl
    const record = document.getElementById("record")
    const anchor = document.getElementById("anchor")
    const pointer = document.getElementById("pointer")
    record.classList.remove("record-on")
    anchor.classList.remove("anchor-on")
    pointer.classList.remove("pointer-on")
    wrap.classList.remove("wrap-on")
  }
})
