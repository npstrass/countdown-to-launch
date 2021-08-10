const days = document.querySelector('.days')
const hours = document.querySelector('.hours')
const minutes = document.querySelector('.minutes')
const seconds = document.querySelector('.seconds')

let timeLeft = {
    d: 0,
    h: 0,
    m: 0,
    s: 0,
}

let totalSeconds

function init() {
    totalSeconds = Math.floor((new Date('08/19/2021') - new Date()) / 1000)
    setTimeLeft()
    let interval = setInterval(() => {
        if (totalSeconds < 0) {
            clearInterval(interval)
        } 
        countTime()
    }, 1000)
}

function countTime() {
    if (totalSeconds > 0) {
        --timeLeft.s
        if (timeLeft.m >= 0 && timeLeft.s < 0) {
            timeLeft.s = 59
            --timeLeft.m
            if (timeLeft.h >= 0 && timeLeft.m < 0) {
                timeLeft.m = 59
                --timeLeft.h
                if (timeLeft.d >= 0 && timeLeft.h < 0) {
                    timeLeft.h = 23
                    --timeLeft.d
                }
            }
        }
    }

    --totalSeconds
    printTime()
}

function printTime() {
    // days.innerText = timeLeft.d
    // hours.innerText = timeLeft.h
    // minutes.innerText = timeLeft.m
    // seconds.innerText = timeLeft.s

    animateFlip(seconds, timeLeft.s)
}

function animateFlip(element, value) {
    element.querySelector('.top-back span').innerText = value    
    element.querySelector('.bottom-back span').innerText = value  
    
    gsap.to(element.querySelector('.top'), 0.7, {
        rotationX: '-180deg',
        transformPerspective: 300,
        ease: Quart.easeOut,
        onComplete: () => {
            element.querySelector('.top').innerText = value
            element.querySelector('.bottom').innerText = value
        }
    })

    gsap.to(element.querySelector('.top-back'), 0.7, {
        rotation: '0',
        transformPerspective: 300,
        ease: Quart.easeOut,
        clearProps: 'all'
    })
}



function setTimeLeft() {
    timeLeft.d = Math.floor(totalSeconds / (60 * 60 * 24))
    timeLeft.h = Math.floor(totalSeconds / (60 * 60) % 24)
    timeLeft.m = Math.floor(totalSeconds / (60) % 60)
    timeLeft.s = Math.floor(totalSeconds % 60)
}

init()