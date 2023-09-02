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
class DataList {
  constructor(containerId, inputId, listId, options) {
    this.containerId = containerId
    this.inputId = inputId
    this.listId = listId
    this.options = options
  }

  create(filter = '') {
    const list = document.getElementById(this.listId)
    const filterOptions = this.options.filter(
      (d) => filter === '' || d.text.includes(filter)
    )

    if (filterOptions.length === 0) {
      list.classList.remove('active')
    } else {
      list.classList.add('active')
    }

    list.innerHTML = filterOptions
      .map((o) => `<li id=${o.value}>${o.text}</li>`)
      .join('')
  }

  addListeners(datalist) {
    const container = document.getElementById(this.containerId)
    const input = document.getElementById(this.inputId)
    const list = document.getElementById(this.listId)
    container.addEventListener('click', (e) => {
      if (e.target.id === this.inputId) {
        container.classList.toggle('active')
      } else if (e.target.id === 'datalist-icon') {
        container.classList.toggle('active')
        input.focus()
      }
    })

    input.addEventListener('input', function (e) {
      if (!container.classList.contains('active')) {
        container.classList.add('active')
      }

      datalist.create(input.value)
    })

    list.addEventListener('click', function (e) {
      if (e.target.nodeName.toLocaleLowerCase() === 'li') {
        input.value = e.target.innerText
        container.classList.remove('active')
      }
    })
  }
}

const data = [
  { value: '1', text: 'Низька (5 см)' },
  { value: '2', text: 'Середня (10 см )' },
  { value: '3', text: 'Висока (більше 10 см )' },
]

const datalist = new DataList('datalist', 'datalist-input', 'datalist-ul', data)
datalist.create()
datalist.addListeners(datalist)

/* End datalist */
