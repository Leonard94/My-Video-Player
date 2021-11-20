const video = document.getElementById('video')
const controllers = document.getElementById('controllers')
const play = document.getElementById('play')
const progress = document.getElementById('progressBody')
const progressBar = document.getElementById('progressBar')
const progressTime = document.getElementById('progressTime')

// video.currentTime - время на видео
// video.duration - продолжительность видео
// video.playbackRate - продолжительность видео
// video.play() - запустить видео
// video.pause() - остановить видео
// video.paused - видео на паузе (true\false)
// loadedmetadata: срабатывает после загрузки метаданных мультимедиа (длительность воспроизведения, размеры видео и т.д.)


controllers.addEventListener('click', (e) => {
    // Pressed btn speed
    if (e.target.classList.contains('controller__speed')) {
        video.playbackRate = e.target.getAttribute('data-speed')
    }

    // Pressed btn rewind
    if (e.target.classList.contains('rewind')) video.currentTime += Number(e.target.getAttribute('data-rewind'))

})


// Start or Stop video
const togglePlay = () => {
    let method = video.paused ? 'play' : 'pause'
    video[method]()
}


// Смена иконки после нажатия на toggle
const updateIcon = () => {
    let icon = video.paused ? 'Play' : 'Pause'
    play.textContent = icon
}


const updateTime = (time) => {
    time = Math.floor(time)
    let hours = Math.floor(time / 60 / 60)
    let minutes = Math.floor(time / 60) - hours * 60
    let seconds = time % 60;
    return `${minutes}:${seconds}`
}


const updateProgress = () => {
    let currentProgress = (video.currentTime / video.duration) * 100
    progressBar.style.width = `${currentProgress}%`

    // update current time and total time
    progressTime.textContent = `${updateTime(video.currentTime)} / ${updateTime(video.duration)}`
}

// При нажатии на progressBar
progress.addEventListener('click', (e) => {
    const targetProgress = (e.offsetX / progress.offsetWidth) * 100
    progressBar.style.width = `${targetProgress}%`
    video.currentTime = targetProgress  * video.duration / 100
})

play.addEventListener('click', togglePlay)

video.addEventListener('click', togglePlay)
video.addEventListener('pause', updateIcon)
video.addEventListener('play', updateIcon)
video.addEventListener('timeupdate', updateProgress)


// JavaScript

// todo UpdateTime (Video Duration) обновляется каждый раз наравне с текущим временем
// todo обновлять продолжительность видео после загрузки всех метаданных
// todo можно ли с помощью JS сделать обложку видео на основе любого или определенного кадра? После получения метаданных
// todo добавить возможность открывать на весь экран?


// CSS
// Сделать нормальную вёрстку
// При наведении на иконку звука должен появляться range
// При наведении на скорость воспроизведения, предоставить выбор скорости видео
// Добавить нормальные иконки для всех кнопок
// Сделать адаптив

// Completed
// прикрутить функционал ускорения видео