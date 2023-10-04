const modal = document.getElementById("contact_modal");
const closeContact = document.getElementsByClassName('closeContact')[0];
const contactButton = document.querySelector('.contact_button')



contactButton.addEventListener('click', () => {
  modal.style.display = 'block';
  const main = document.querySelector('main');
  const elementsInsideMain = main.querySelectorAll('*');
  const header = document.querySelector('header');
const elementsInsideHeader = header.querySelectorAll('*');

elementsInsideHeader.forEach((element) => {
  element.setAttribute('tabindex', '-1');
  element.setAttribute('aria-hidden', 'true')
});
  elementsInsideMain.forEach((element) => {
    element.setAttribute('tabindex', '-1');
    element.setAttribute('aria-hidden', 'true')
  });
});

  closeContact.addEventListener('click', () => {
    closeModal();
  });

  closeContact.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'|| event.key === 'Escape') {
      closeModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

function closeModal() {
    modal.style.display = "none";
    const main = document.querySelector('main');
    const elementsInsideMain = main.querySelectorAll('*');
    const header = document.querySelector('header');
  const elementsInsideHeader = header.querySelectorAll('*');
  
  elementsInsideHeader.forEach((element) => {
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-hidden', 'false')
  });
    elementsInsideMain.forEach((element) => {
      element.setAttribute('tabindex', '0');
      element.setAttribute('aria-hidden', 'false')
    });
  };


const firstNameInput = document.getElementById('first-name');
const firstNameError = document.getElementById('first-name-error');

const lastNameInput = document.getElementById('last-name');
const lastNameError = document.getElementById('last-name-error');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

const messageInput = document.getElementById('message');
const messageError = document.getElementById('message-error');

const btn_submit = document.getElementsByClassName('contact_button_submit')


const regexName = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexMessage = /^[A-Za-z]{50,150}$/



function validForm() {
    const firstNameValue = firstNameInput.value.trim();
    const lastNameValue = lastNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();
  
    const isFirstNameValid = regexName.test(firstNameValue);
    const isLastNameValid = regexName.test(lastNameValue);
    const isEmailValid = regexEmail.test(emailValue);
    const isMessageValid = regexMessage.test(messageValue);
  
    if (!isFirstNameValid) {
      firstNameError.textContent = 'Le prénom doit contenir entre 3 à 15 lettres sans caractères spéciaux.';
      firstNameError.style.display = 'block';
    } else {
      firstNameError.textContent = '';
      firstNameError.style.display = 'none';
    }
  
    if (!isLastNameValid) {
      lastNameError.textContent = 'Le nom doit contenir entre 3 à 15 lettres sans caractères spéciaux.';
      lastNameError.style.display = 'block';
    } else {
      lastNameError.textContent = '';
      lastNameError.style.display = 'none';
    }
  
    if (!isEmailValid) {
      emailError.textContent = 'Veuillez renseigner une adresse mail valide.';
      emailError.style.display = 'block';
    } else {
      emailError.textContent = '';
      emailError.style.display = 'none';
    }
  
    if (!isMessageValid) {
      messageError.textContent = 'Le message doit contenir entre 50 et 150 lettres.';
      messageError.style.display = 'block';
    } else {
      messageError.textContent = '';
      messageError.style.display = 'none';
    }
  
    if (isFirstNameValid && isLastNameValid && isEmailValid && isMessageValid) {
      console.log('Prénom:', firstNameValue);
      console.log('Nom:', lastNameValue);
      console.log('Email:', emailValue);
      console.log('Message:', messageValue);
  
      
    } else {
      console.log('Le formulaire n\'a pas été soumis en raison de champs invalides.');
    }
  }
  
  btn_submit[0].addEventListener('click', function(event) {
    event.preventDefault(); 
    validForm(); 
  });
  
