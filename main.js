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

request.forEach((item) => {
  item.addEventListener('click', () => {
    scrollToCall('callForm', -83)
  })
})

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

/* Sliders */
function setupSlider(carouselSelector, cardSelector, arrowSelectors) {
  const carousel = document.querySelector(carouselSelector)
  const firstCardWidth = carousel.querySelector(cardSelector).offsetWidth
  const arrowBtns = document.querySelectorAll(arrowSelectors)
  const carouselChildren = [...carousel.children]

  let isDragging = false
  let startX, startScrollLeft

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

  carouselChildren
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
    })

  carouselChildren.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML)
  })

  carousel.classList.add('no-transition')
  carousel.scrollLeft = carousel.offsetWidth
  carousel.classList.remove('no-transition')

  arrowBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      carousel.scrollLeft +=
        btn.id === 'left' ? -firstCardWidth : firstCardWidth
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
    if (carousel.scrollLeft === 0) {
      carousel.classList.add('no-transition')
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth
      carousel.classList.remove('no-transition')
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add('no-transition')
      carousel.scrollLeft = carousel.offsetWidth
      carousel.classList.remove('no-transition')
    }
  }

  carousel.addEventListener('mousedown', dragStart)
  carousel.addEventListener('mousemove', dragging)
  document.addEventListener('mouseup', dragStop)
  carousel.addEventListener('scroll', infiniteScroll)
}

// Usage
setupSlider('.slider-solution', '.card', '.solution-arrow i')
setupSlider('.compact-slider', '.card', '.compact-arrow i')
setupSlider('.carousel-completed', '.card', '.completed-arrow i')
setupSlider('.carousel-video', '.card-video', '.video-arrow i')
/* End of Sliders */
