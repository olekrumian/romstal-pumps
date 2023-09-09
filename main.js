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

// /* First slider pumps start */
const wrapper = document.querySelector('.ready-solution-container')
const carousel = document.querySelector('.slider-solution')
const firstCardWidth = carousel.querySelector(
  '.ready-solution-item'
).offsetWidth
const arrowBtn = document.querySelectorAll('.slider-solution-arrow-wrapper i')
const carouselChildrens = [...carousel.children]

let isDragging = false,
  isAutoPlay = true,
  timeoutId,
  startScrollLeft

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

carousel.classList.add('no-transition')
carousel.scrollLeft = carousel.offsetWidth
carousel.classList.remove('no-transition')

arrowBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStart = (e) => {
  isDragging = true
  carousel.classList.add('dragging')
  startX = e.pageX
  startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
  if (!isDragging) return
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
  clearTimeout(timeoutId)
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
carousel.addEventListener('scroll', infiniteScroll)
/* First slider pumps end */
/* compact-slider */
const sliderCompact = document.querySelector('.compact-item')
const carouselCompact = document.querySelector('.compact-slider')
const firstCardCompactWidth = carouselCompact.querySelector('.card').offsetWidth
const arrowBtnCompact = document.querySelectorAll('.compact-arrow i')
const carouselChildrenCompact = [...carouselCompact.children]

let isDraggingCompact = false,
  startXCompact,
  startScrollLeftCompact

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

arrowBtnCompact.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselCompact.scrollLeft +=
      btn.id === 'left' ? -firstCardWidth : firstCardWidth
  })
})

const dragStartCompact = (e) => {
  isDragging = true
  carouselCompact.classList.add('dragging')
  startXCompact = e.pageX
  startScrollLeftCompact = carouselCompact.scrollLeft
}

const draggingCompact = (e) => {
  if (!isDragging) return
  carouselCompact.scrollLeft =
    startScrollLeftCompact - (e.pageX - startXCompact)
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
}

carouselCompact.addEventListener('mousedown', dragStartCompact)
carouselCompact.addEventListener('mousemove', draggingCompact)
document.addEventListener('mouseup', dragStopCompact)
carouselCompact.addEventListener('scroll', infiniteScrollCompact)
/* end of compact-slider */
/* Start datalist */
/* End datalist */

/* Completed slider */
const sliderPhoto = document.querySelector('.slider-photo')
const carouselCompleted = document.querySelector('.carousel-completed')
const firstCardWidthCarouselCompleted =
  carouselCompleted.querySelector('.card').offsetWidth
const arrowBtnCompleted = document.querySelectorAll('.completed-arrow i')
const carouselChildren = [...carouselCompleted.children]

let isDraggingCompleted = false,
  startXCompleted,
  startScrollLeftCompleted

let cardPerViewCompleted = Math.round(
  carouselCompleted.offsetWidth / firstCardWidthCarouselCompleted
)

carouselChildren
  .slice(-cardPerViewCompleted)
  .reverse()
  .forEach((card) => {
    carouselCompleted.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselChildren.slice(0, cardPerViewCompleted).forEach((card) => {
  carouselCompleted.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselCompleted.classList.add('no-transition')
carouselCompleted.scrollLeft = carouselCompleted.offsetWidth
carouselCompleted.classList.remove('no-transition')

arrowBtnCompleted.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselCompleted.scrollLeft +=
      btn.id === 'left'
        ? -firstCardWidthCarouselCompleted
        : firstCardWidthCarouselCompleted
  })
})

const dragStartCompleted = (e) => {
  isDraggingCompleted = true
  carouselCompleted.classList.add('dragging')
  startXCompleted = e.pageX
  startScrollLeftCompleted = carouselCompleted.scrollLeft
}

const draggingCompleted = (e) => {
  if (!isDraggingCompleted) return
  carouselCompleted.scrollLeft =
    startScrollLeftCompleted - (e.pageX - startXCompleted)
}

const dragStopCompleted = () => {
  isDraggingCompleted = false
  carouselCompleted.classList.remove('dragging')
}

const infiniteScrollCompleted = () => {
  if (carouselCompleted.scrollLeft === 0) {
    carouselCompleted.classList.add('no-transition')
    carouselCompleted.scrollLeft =
      carouselCompleted.scrollWidth - 2 * carouselCompleted.offsetWidth
    carouselCompleted.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselCompleted.scrollLeft) ===
    carouselCompleted.scrollWidth - carouselCompleted.offsetWidth
  ) {
    carouselCompleted.classList.add('no-transition')
    carouselCompleted.scrollLeft = carouselCompleted.offsetWidth
    carouselCompleted.classList.remove('no-transition')
  }
}

carouselCompleted.addEventListener('mousedown', dragStartCompleted)
carouselCompleted.addEventListener('mousemove', draggingCompleted)
document.addEventListener('mouseup', dragStopCompleted)
carouselCompleted.addEventListener('scroll', infiniteScrollCompleted)
// /* End of Completed swiper */

// /* Slider Video  */
const sliderVideo = document.querySelector('.slider-video')
const carouselVideo = document.querySelector('.carousel-video')
const firstCardVideoWidth =
  carouselVideo.querySelector('.card-video').offsetWidth
const arrowVideoBtns = document.querySelectorAll('.video-arrow i')
const carouselVideoChildren = [...carouselVideo.children]

let isDraggingVideo = false,
  startXVideo,
  startScrollLeftVideo

let cardPerViewVideo = Math.round(
  carouselVideo.offsetWidth / firstCardVideoWidth
)

carouselVideoChildren
  .slice(-cardPerViewVideo)
  .reverse()
  .forEach((card) => {
    carouselVideo.insertAdjacentHTML('afterbegin', card.outerHTML)
  })

carouselVideoChildren.slice(0, cardPerViewVideo).forEach((card) => {
  carouselVideo.insertAdjacentHTML('beforeend', card.outerHTML)
})

carouselVideo.classList.add('no-transition')
carouselVideo.scrollLeft = carouselVideo.offsetWidth
carouselVideo.classList.remove('no-transition')

arrowVideoBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    carouselVideo.scrollLeft +=
      btn.id === 'left' ? -firstCardVideoWidth : firstCardVideoWidth
  })
})

const dragStartVideo = (e) => {
  isDraggingVideo = true
  carouselVideo.classList.add('dragging')
  startXVideo = e.pageX
  startScrollLeftVideo = carouselVideo.scrollLeft
}

const draggingVideo = (e) => {
  if (!isDraggingVideo) return
  carouselVideo.scrollLeft = startScrollLeftVideo - (e.pageX - startXVideo)
}

const dragStopVideo = () => {
  isDraggingVideo = false
  carouselVideo.classList.remove('dragging')
}

const infiniteScrollVideo = () => {
  if (carouselVideo.scrollLeft === 0) {
    carouselVideo.classList.add('no-transition')
    carouselVideo.scrollLeft =
      carouselVideo.scrollWidth - 2 * carouselVideo.offsetWidth
    carouselVideo.classList.remove('no-transition')
  } else if (
    Math.ceil(carouselVideo.scrollLeft) ===
    carouselVideo.scrollWidth - carouselVideo.offsetWidth
  ) {
    carouselVideo.classList.add('no-transition')
    carouselVideo.scrollLeft = carouselVideo.offsetWidth
    carouselVideo.classList.remove('no-transition')
  }
}

carouselVideo.addEventListener('mousedown', dragStartVideo)
carouselVideo.addEventListener('mousemove', draggingVideo)
document.addEventListener('mouseup', dragStopVideo)
carouselVideo.addEventListener('scroll', infiniteScrollVideo)
// /* End Of Slider Video */
