"use strict"

const video = document.getElementById('Video')
const controllers = document.getElementById('Controllers')
const play = document.getElementById('Play')
const speeds = document.querySelectorAll('.speed')
const speedCurrent = document.getElementById('speed-current')
const volume = document.getElementById('volume-body')
const volumeBar = document.getElementById('volume-bar')
const progress = document.getElementById('progress-body')
const progressBar = document.getElementById('progress-bar')
const timeProgress = document.getElementById('time-progress')
const timeDuration = document.getElementById('time-duration')

// video.currentTime - текущее время на видео
// video.duration - продолжительность видео
// video.playbackRate - скорость видео
// video.play() - запустить видео
// video.pause() - остановить видео
// video.paused - видео на паузе (true\false)
// loadedmetadata: срабатывает после загрузки метаданных мультимедиа (длительность воспроизведения, размеры видео и т.д.)


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
    // padStart() - установка минимальной длины строки.
    // Для формта отображения времени 00:00:00, а не 0:0:0
    let hours = (Math.floor(time / 60 / 60)).toString().padStart(2, '0') //
    let minutes = (Math.floor(time / 60) - (hours * 60)).toString().padStart(2, '0')
    let seconds = (time % 60).toString().padStart(2, '0')
    if(hours != '00') return `${hours}:${minutes}:${seconds}` // Показывать и часы
    return `${minutes}:${seconds}`
}

const updateProgress = () => {
    let currentProgress = (video.currentTime / video.duration) * 100
    progressBar.style.width = `${currentProgress}%`

    // update current time and total(duration) time
    timeProgress.textContent = `${updateTime(video.currentTime)}`
}


// При нажатии на volume
volume.addEventListener('click', (e) => {
    // Сделал volume-current не кликабельным в css - pointer-events: none, иначе иногда нажимаем на него
    // Формула: громкость видео = (100 - (нажатая высота в px * 100 / высоту всего элемента) / 100), получаем число от 0 до 1
    let targetVolume = (100 - (e.offsetY * 100 / volume.offsetHeight)) / 100
    video.volume = targetVolume
    // Устаналвиваем высоту volume bar
    volumeBar.style.height = `${targetVolume * 100}%`
    // Изменяем надпись с уровнем громкости
    volumeBar.textContent = `${Math.floor(targetVolume * 100)}`
})

// При нажатии на progressBar
progress.addEventListener('click', (e) => {
    // Убираем кликабельность у класса time в css, иначе при клике на него ширина считается от его
    const targetProgress = (e.offsetX / progress.offsetWidth) * 100
    progressBar.style.width = `${targetProgress}%`
    video.currentTime = targetProgress * video.duration / 100
})

// Слушатель нажатий на клавиатуре
document.addEventListener('keydown', (e) => {
    // Пробел
    if (e.keyCode === 32) togglePlay()

    // Стрелка вправо
    if (e.keyCode === 39) video.currentTime += 20

    // Стрелка влево
    if (e.keyCode === 37) video.currentTime += -10
})

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


play.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)
video.addEventListener('pause', updateIcon)
video.addEventListener('play', updateIcon)
video.addEventListener('timeupdate', updateProgress)
// Когда получили все метаданные
video.addEventListener('loadedmetadata', () => timeDuration.textContent = ` ${updateTime(video.duration)}`)


// JavaScript
// todo добавить возможность открывать на весь экран?
// todo можно ли с помощью JS сделать обложку видео на основе любого или определенного кадра? После получения метаданных

// CSS
// todo Сделать адаптив?


// Completed JS
// Cделать возможность изменять громкость звука
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