const video = document.getElementById('video')
const controllers = document.getElementById('controllers')
const play = document.getElementById('play')
const speeds = document.querySelectorAll('.speed')
const speedCurrent = document.getElementById('speedCurrent')
const progress = document.getElementById('progressBody')
const progressBar = document.getElementById('progressBar')
const timeProgress = document.getElementById('progressTime')
const timeDuration = document.getElementById('durationTime')

// video.currentTime - текущее время на видео
// video.duration - продолжительность видео
// video.playbackRate - скорость видео
// video.play() - запустить видео
// video.pause() - остановить видео
// video.paused - видео на паузе (true\false)
// loadedmetadata: срабатывает после загрузки метаданных мультимедиа (длительность воспроизведения, размеры видео и т.д.)


controllers.addEventListener('click', (e) => {

    // Pressed speed
    if (e.target.classList.contains('speed')) {
        // убираем класс speed-active у всех speed
        speeds.forEach((speed) => speed.classList.remove('speed-active'))

        // Выставляем скорость видео, указанную в атрибуте data-speed
        video.playbackRate = e.target.getAttribute('data-speed')
        e.target.classList.add('speed-active')

        // Изменяем надпись скорости на controller
        speedCurrent.textContent = e.target.textContent
    }

    // Pressed rewind
    if (e.target.classList.contains('rewind')) video.currentTime += Number(e.target.getAttribute('data-rewind'))
})


// Start or Stop video
const togglePlay = () => {
    let method = video.paused ? 'play' : 'pause'
    video[method]()
}


// Смена иконки после нажатия на toggle
const updateIcon = () => {
    let icon = video.paused ? 'play' : 'pause'
    play.src = `/img/icon__${icon}.svg`
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

    // update current time and total(duration) time
    progressTime.textContent = `${updateTime(video.currentTime)}`
}


// При нажатии на progressBar
progress.addEventListener('click', (e) => {
    const targetProgress = (e.offsetX / progress.offsetWidth) * 100
    progressBar.style.width = `${targetProgress}%`
    video.currentTime = targetProgress * video.duration / 100
})

// Обработчик нажатий на клавиатуре
window.addEventListener('keydown', (e) => {
    // Пробел
    if (e.keyCode === 32) togglePlay()

    // Стрелка вправо
    if (e.keyCode === 39) video.currentTime += 20

    // Стрелка влево
    if (e.keyCode === 37) video.currentTime += -10
})


play.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('pause', updateIcon)
video.addEventListener('play', updateIcon)
video.addEventListener('timeupdate', updateProgress)
// Когда получили метаданные
video.addEventListener('loadedmetadata', () => timeDuration.textContent = ` ${updateTime(video.duration)}`)


// JavaScript
// todo сделать возможность изменять громкость звука
// todo добавить возможность открывать на весь экран?
// todo можно ли с помощью JS сделать обложку видео на основе любого или определенного кадра? После получения метаданных

// CSS
// todo Сделать адаптив?


// Completed JS
// Пробел для пуск \ стоп
// Перемотка при нажатии на стрелку клавиатуры
// При выборе скорости воспроизведения изменять класс на speed-active у drop-down. И изменять current speed
// UpdateTime (Video Duration) обновляется каждый раз наравне с текущим временем. Исправить
// Обновлять продолжительность видео после загрузки всех метаданных
// Прикрутить функционал ускорения видео

// Completed CSS
// При наведении на скорость воспроизведения, предоставить выбор скорости видео
// Добавить нормальные иконки для всех кнопок
// Сделать нормальную вёрстку
// При наведении на иконку звука должен появляться range