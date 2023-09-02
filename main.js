const navigation = document.querySelector('.navigation')
const navToggle = document.querySelector('.mobile-nav-toggle')
const date = document.querySelector('.footer-copyright')
const request = document.querySelectorAll('.leaveRequest')
const navigationLinks = document.querySelectorAll('.nav-link')

const visibility = navigation.getAttribute('data-visible')

navToggle.addEventListener('click', () => {
  const visibility = navigation.getAttribute('data-visible')
  if (visibility === 'false') {
    navigation.setAttribute('data-visible', true)
    navToggle.setAttribute('aria-expended', true)
    navToggle.style.background = `url('./assets/icon/hamburger_close.svg') no-repeat center`
    document.body.style.overflow = 'hidden'
  } else {
    navigation.setAttribute('data-visible', false)
    navToggle.setAttribute('aria-expended', false)
    navToggle.style.background = `url('./assets/icon/hamburger.svg') no-repeat center`
    document.body.style.overflow = ''
  }
})

document.addEventListener('DOMContentLoaded', () => {
  date.innerHTML = `Romstal Ukraine © ${new Date().getFullYear()}`
})

/* First slider pumps start */
const slider = document.querySelector('.slider')
const sliderDots = document.querySelectorAll('.slider-dot')

let currentIndex = 0
let startX = 0
let isDragging = false

function moveToSlide(index) {
  currentIndex = index
  const translateX = -currentIndex * 100 + '%'
  slider.style.transform = `translateX(${translateX})`

  // Update the active dot
  sliderDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex)
  })
}

sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    moveToSlide(index)
  })
})

slider.addEventListener('mousedown', (e) => {
  isDragging = true
  startX = e.clientX
})

slider.addEventListener('touchstart', (e) => {
  isDragging = true
  startX = e.touches[0].clientX
})

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return
  const offsetX = e.clientX - startX
  const translateX = -currentIndex * 100 + offsetX + '%'
  slider.style.transform = `translateX(${translateX})`
})

slider.addEventListener('touchmove', (e) => {
  if (!isDragging) return
  const offsetX = e.touches[0].clientX - startX
  const translateX = -currentIndex * 100 + offsetX + '%'
  slider.style.transform = `translateX(${translateX})`
})

slider.addEventListener('mouseup', () => {
  isDragging = false
  const threshold = 100 // Adjust the threshold as needed
  if (Math.abs(startX - event.clientX) > threshold) {
    if (startX < event.clientX) {
      if (currentIndex > 0) {
        moveToSlide(currentIndex - 1)
      }
    } else {
      if (currentIndex < sliderDots.length - 1) {
        moveToSlide(currentIndex + 1)
      }
    }
  } else {
    moveToSlide(currentIndex)
  }
})

slider.addEventListener('touchend', () => {
  isDragging = false
  moveToSlide(currentIndex)
})

slider.addEventListener('mouseleave', () => {
  isDragging = false
  moveToSlide(currentIndex)
})

/* First slider pumps end */
