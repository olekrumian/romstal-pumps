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
const callFormInput = document.querySelectorAll('.call-form-input')

callFormInput.forEach((element) => {
  element.addEventListener('keypress', (e) => {
    let newValue = e.target.value
    if (!newValue.startsWith('+38')) {
      newValue = `+38${newValue}`
      e.target.value = newValue
    }
  })
})
/* End of Call Form */

document.addEventListener('DOMContentLoaded', () => {
  date.innerHTML = `Romstal Ukraine © ${new Date().getFullYear()}`
})

function scrollToSection(e, offset) {
  e.preventDefault()

  const targetId = e.target.getAttribute('href')
  const targetSection = document.querySelector(targetId)

  if (targetSection) {
    const targetPosition = targetSection.offsetTop + offset
    window.scrollTo({
      top: targetPosition,
    })
  }

  if (visibility) {
    navToggle.setAttribute('aria-expanded', 'false')
    navigation.setAttribute('data-visible', false)
    navToggle.style.background = `url('./assets/icon/hamburger.svg') no-repeat center`
    document.body.style.overflow = ''
  }
}

function scrollToCall(sectionId, offset) {
  const section = document.getElementById(sectionId)
  const topPos =
    section.getBoundingClientRect().top + window.pageYOffset + offset
  window.scrollTo({ top: topPos })

  if (visibility) {
    navToggle.setAttribute('aria-expanded', 'false')
    navigation.setAttribute('data-visible', false)
    navToggle.style.background = `url('./assets/icon/hamburger.svg') no-repeat center`
    document.body.style.overflow = ''
  }
}
navigationLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    scrollToSection(e, -83)
  })
})

/* First slider pumps start */
const wrapper = document.querySelector('.ready-solution-container')
const carousel = document.querySelector('.slider-solution')
const firstCardWidth = carousel.querySelector(
  '.ready-solution-item'
).offsetWidth
const arrowBtns = document.querySelectorAll('.slider-arrow-wrapper i')
const carouselChildrens = [...carousel.children]

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add('no-transition')
carousel.scrollLeft = carousel.offsetWidth
carousel.classList.remove('no-transition')

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStart = (e) => {
  isDragging = true
  carousel.classList.add('dragging')
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX
  startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
  if (!isDragging) return // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
  isDragging = false
  carousel.classList.remove('dragging')
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth
    carousel.classList.remove('no-transition')
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add('no-transition')
    carousel.scrollLeft = carousel.offsetWidth
    carousel.classList.remove('no-transition')
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId)
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
carousel.addEventListener('scroll', infiniteScroll)
wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId))
/* First slider pumps end */
/* compact-slider */
const sliderCompact = document.querySelector('.compact-item')
const carouselCompact = document.querySelector('.compact-slider')
const firstCardCompactWidth = carouselCompact.querySelector('.card').offsetWidth
const arrowBtnsCompact = document.querySelectorAll('.turn-btn-compact')
const carouselChildrenCompact = [...carouselCompact.children]

let isDraggingCompact = false,
  startXCompact,
  startScrollLeftCompact,
  timeoutIdCompact

let cardPerViewCompact = Math.round(
  carouselCompact.offsetWidth / firstCardWidth
)

carouselChildrenCompact
  .slice(-cardPerViewCompact)
  .reverse()
  .forEach((card) => {
    carouselCompact.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildrenCompact.slice(0, cardPerViewCompact).forEach((card) => {
  carouselCompact.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselCompact.classList.add('no-transition')
carouselCompact.scrollLeft = carouselCompact.offsetWidth
carouselCompact.classList.remove('no-transition')

arrowBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselCompact.scrollLeft +=
      btn.id === 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStartCompact = (e) => {
  isDragging = true
  carouselCompact.classList.add('dragging')
  startX = e.pageX
  startScrollLeft = carouselCompact.scrollLeft
}

const draggingCompact = (e) => {
  if (!isDragging) return
  carouselCompact.scrollLeft = startScrollLeft - (e.pageX - startX)
}

const dragStopCompact = () => {
  isDragging = false
  carouselCompact.classList.remove('dragging')
}

const infiniteScrollCompact = () => {
  if (carouselCompact.scrollLeft === 0) {
    carouselCompact.classList.add('no-transition')
    carouselCompact.scrollLeft =
      carouselCompact.scrollWidth - 2 * carouselCompact.offsetWidth
    carouselCompact.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselCompact.scrollLeft) ===
    carouselCompact.scrollWidth - carouselCompact.offsetWidth
  ) {
    carouselCompact.classList.add('no-transition')
    carouselCompact.scrollLeft = carouselCompact.offsetWidth
    carouselCompact.classList.remove('no-transition')
  }

  clearTimeout(timeoutId)
}

carouselCompact.addEventListener('mousedown', dragStartCompact)
carouselCompact.addEventListener('mousemove', draggingCompact)
document.addEventListener('mouseup', dragStopCompact)
carouselCompact.addEventListener('scroll', infiniteScrollCompact)
sliderCompact.addEventListener('mouseenter', () => clearTimeout(timeoutId))
/* end of compact-slider */
/* Start datalist */
/* End datalist */

/* Completed slider */
/* End of Completed swiper */
