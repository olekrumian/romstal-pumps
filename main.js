const navigation = document.querySelector('.navigation')
const navToggle = document.querySelector('.mobile-nav-toggle')
const date = document.querySelector('.footer-copyright')
const request = document.querySelectorAll('.leaveRequest')
const navigationLinks = document.querySelectorAll('.nav-link')
const visibility = navigation.getAttribute('data-visible')

document.addEventListener('DOMContentLoaded', () => {
  date.innerHTML = `Romstal Ukraine © ${new Date().getFullYear()}`
})

/* Navigation */
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
/* End of Navigation */
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

  carouselChildren.forEach((card) => {
    card.addEventListener('click', openFullScreen)
  })

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

setupSlider('.slider-solution', '.card', '.solution-arrow i')
setupSlider('.compact-slider', '.card', '.compact-arrow i')
setupSlider('.carousel-completed', '.card', '.completed-arrow i')
setupSlider('.carousel-video', '.card-video', '.video-arrow i')
/* End of Sliders */

/* Solution */
const isolationSelect = document.getElementById('isolation')
const square = document.getElementById('square')
const result = document.querySelector('.selection-item-result')
const resultWrapper = document.querySelector('.result-form')

const romstalPumps = [
  {
    img: './assets/img/pumps.png',
    name: 'romstal ecoheat',
    power: 8,
    url: 'https://romstal.ua/uk/product/19838-teplovoj-nasos-vozdukh-voda-dlja-otoplenyja-okhlazhdenyja-romstal-ecoheat-8-kw',
  },
  {
    img: './assets/img/pumps.png',
    name: 'romstal ecoheat',
    power: 12,
    url: 'https://romstal.ua/uk/product/19837-teplovoj-nasos-vozdukh-voda-dlja-otoplenyja-okhlazhdenyja-romstal-ecoheat-12kvt',
  },
  {
    img: './assets/img/pumps.png',
    name: 'romstal ecoheat',
    power: 16,
    url: 'https://romstal.ua/uk/product/19801-teplovyj-nasos-povitrja-voda-dlja-opalennja-okholodzhennja-romstal-ecoheat-15-5kw',
  },
  {
    img: './assets/img/pumps30.png',
    name: 'romstal ecoheat',
    power: 30,
    url: 'https://romstal.ua/uk/product/33121-teplovoy-nasos-m-thermal-a-series-monoblok-mhc-v30w-d2rn8-30kvt',
  },
]

function updateResult() {
  const withoutIsolation = parseFloat(isolationSelect.value)
  const squareValue = parseFloat(square.value)

  if (isNaN(withoutIsolation) || isNaN(squareValue)) {
    result.textContent = 0
    resultWrapper.innerHTML = `
      <div class="result-form-info">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
          <path
            d="M12.5 8.71143V12.7114M12.5 16.7114H12.51M12.5 3.71143C19.7 3.71143 21.5 5.51143 21.5 12.7114C21.5 19.9114 19.7 21.7114 12.5 21.7114C5.3 21.7114 3.5 19.9114 3.5 12.7114C3.5 5.51143 5.3 3.71143 12.5 3.71143Z"
            stroke="#929292" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p>Заповніть форму для підбіру теплового насоса</p>
      </div>`
    resultWrapper.style.border = '0.1rem solid var(--grey300)'
    return
  }

  const newValue = withoutIsolation * squareValue
  result.textContent = `${newValue} ВТ`

  let selectedPumpIndex

  if (squareValue <= 130) {
    selectedPumpIndex = 0
  } else if (squareValue > 130 && squareValue <= 190) {
    selectedPumpIndex = 1
  } else if (squareValue > 190 && squareValue <= 270) {
    selectedPumpIndex = 2
  } else if (squareValue > 270 && squareValue <= 500) {
    selectedPumpIndex = 3
  } else {
    selectedPumpIndex = 3
  }

  const selectedPump = romstalPumps[selectedPumpIndex]

  resultWrapper.innerHTML = `
    <div class="pump-item">
      <img class="pump-item-img" src="${selectedPump.img}" alt="${selectedPump.name}">
      <h3 class="pump-item-title">${selectedPump.name}</h3>
      <p class="pump-item-power">${selectedPump.power} кВт</p>
      <a class="item-button" href="${selectedPump.url}">Детальніше</a>
        <div class="item-top-seller">
            <img src="./assets/icon/alert-square-rounded.svg" alt="">
            <p>Рекомендуємо</p>
        </div>
    </div>
  `

  resultWrapper.style.border = 'none'
}

isolationSelect.addEventListener('change', updateResult)
square.addEventListener('input', updateResult)

square.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault()
  }
})
/* End of Solution */

/* fullScreen slider */

function openFullScreen() {
  if (window.matchMedia('(max-width: 577px)').matches) {
    carouselChildren.forEach((card) => {
      card.addEventListener('click', openFullScreen)
    })
  }
  const clickedCard = this

  const parentCarousel = clickedCard.closest('.carousel-completed')
  if (!parentCarousel) {
    return
  }
  document.body.style.overflow = 'hidden'
  const fullScreenCard = clickedCard.cloneNode(true)
  fullScreenCard.classList.add('full-screen-card')

  const closeButton = document.createElement('button')
  closeButton.classList.add('close-gallery-button')
  closeButton.addEventListener('click', closeFullScreen)

  const fullScreenContainer = document.createElement('div')
  fullScreenContainer.classList.add('full-screen-container')
  fullScreenContainer.appendChild(fullScreenCard)
  fullScreenCard.appendChild(closeButton)

  document.body.appendChild(fullScreenContainer)
  document.addEventListener('keydown', handleKeyDown)
}

function closeFullScreen() {
  const fullScreenContainer = document.querySelector('.full-screen-container')

  document.body.removeChild(fullScreenContainer)
  document.body.style.overflow = ''

  document.removeEventListener('keydown', handleKeyDown)
}

function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeFullScreen()
  }
}
/* End of fullScreen slider */
