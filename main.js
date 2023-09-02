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

/* Call Form */
const callFormInput = document.querySelector('.call-form-input')

callFormInput.addEventListener('keypress', (e) => {
  let newValue = e.target.value
  if (!newValue.startsWith('+38')) {
    newValue = `+38${newValue}`
  }
  callFormInput.value = newValue
})
/* End of Call Form */

// document.addEventListener('DOMContentLoaded', () => {
//   date.innerHTML = `Romstal Ukraine © ${new Date().getFullYear()}`
// })

/* First slider pumps start */
// const slider = document.querySelector('.ready-solution-wrapper')
// const sliderDots = document.querySelectorAll('.slider-dot')

// let currentIndex = 0

// function moveToSlide(index) {
//   currentIndex = index
//   const translateX = -currentIndex * 100 + '%'
//   slider.style.transform = `translateX(${translateX})`

//   // Update the active dot
//   sliderDots.forEach((dot, i) => {
//     dot.classList.toggle('slider-dot-active', i === currentIndex)
//   })
// }

// sliderDots.forEach((dot, index) => {
//   dot.addEventListener('click', () => {
//     moveToSlide(index)
//   })
// })

// // Initial setup
// moveToSlide(currentIndex)

/* First slider pumps end */

/* Start datalist */

/* End datalist */
