const form = document.forms[0]
const nameField = document.querySelector('#name')
const photoLinkField = document.querySelector('#link')
const emailField = document.querySelector('#email')
const introField = document.querySelector('#intro')
const alertField = document.querySelector('.alert')
const myNameCard = document.querySelector('#output-namecard')
const feedback = document.querySelector('.feedback')

// Set event listeners
introField.addEventListener('input', displayFieldLength)
form.addEventListener('submit', checkForm)

function displayFieldLength(event) {
  if (event.target.id === 'intro') {
    let introLength = event.target.value.length
    if (introLength > 500) {
      feedback.innerHTML = `Oops... ${introLength} characters! Maximum is 500.`
      feedback.classList.remove('text-warning')
      feedback.classList.add('text-danger')
    } else {
      feedback.innerHTML = `${500 - introLength} remaining characters`
      feedback.classList.remove('text-danger')
      feedback.classList.add('text-warning')
    }
  }
}

function checkForm(event) {
  event.preventDefault()
  // Use default placeholder if no link is specified
  if (photoLinkField.value === '') {
    photoLinkField.value = 'http://via.placeholder.com/200'
  }

  if ((nameField.value.length > 0) && (photoLinkField.value.length >= 0) && (validateEmail(emailField.value))) {
    if (introField.value.length > 500) {
      alertField.innerText = 'More than 500 characters in introduction!'
      alertField.classList.add('alert-danger')
      introField.classList.add('border', 'border-danger')
    } else if (introField.value.length === 0) {
      alertField.innerText = 'Please complete the introduction.'
      alertField.classList.add('alert-danger')
      introField.classList.add('border', 'border-danger')
    } else {
      alertField.innerText = ''
      alertField.classList.remove('alert-danger')
      introField.classList.remove('border', 'border-danger')
      displayNamecard()
      resetForm()
      // form.submit()
    }
  } else {
    console.log('did not pass check form')
  }
}

function validateEmail(email) {
  let pattern = /^[\w\-]+\@[\w\-]+(\.[\w\-]+)+$/
  return pattern.test(String(email).toLowerCase())
}

function displayNamecard() {
  setContent()
  setThemeColor()
}

function resetForm() {
  nameField.value = ''
  photoLinkField.value = ''
  emailField.value = ''
  introField.value = ''
  feedback.innerText = '500 remaining characters'
  feedback.className = 'feedback small text-primary'
}

function setContent() {
  const h2 = document.querySelector('#output-namecard').previousElementSibling
  h2.innerText = 'My Namecard'
  myNameCard.innerHTML = `
    <div class="clearfix p-4 border rounded-top">
      <img src="${photoLinkField.value}" alt="my-photo" class="float-right img-thumbnail ml-3 mb-2" id="my-photo" width="200">
      <h3 id="my-name" class="text-uppercase mb-3">${nameField.value}</h3>
      <p id="my-email" class="font-italic mb-3">${emailField.value}</p>
      <p id="my-intro" class="text-justify">${introField.value}</p>
    </div>
  `
}

function setThemeColor() {
  if (document.getElementById('lightOption').checked) {
    myNameCard.children[0].classList.add('whiteboard')
    myNameCard.children[0].classList.remove('blackboard')
    // myNameCard.children[0].classList.add('bg-light', 'text-dark')
    // myNameCard.children[0].classList.remove('bg-dark', 'text-light')
  } else if (document.getElementById('darkOption').checked) {
    myNameCard.children[0].classList.add('blackboard')
    myNameCard.children[0].classList.remove('whiteboard')
  }
}
