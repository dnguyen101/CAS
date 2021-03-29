import '@babel/polyfill';
import { login, signup, logout } from './login';
import { bookConsultant } from './stripe';

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logoutBtn = document.querySelector('.logout');

const userTypeField = document.getElementById("userType");
const descriptionInput = document.getElementById("description");
const tagInput = document.getElementById("tag");
const experienceInput = document.getElementById("experience");
const locationInput = document.getElementById("location");
const priceInput = document.getElementById("price");
const descriptionLabel = document.getElementById("descriptionLabel");
const tagLabel = document.getElementById("tagLabel");
const experienceLabel = document.getElementById("experienceLabel");
const locationLabel = document.getElementById("locationLabel");
const priceLabel = document.getElementById("priceLabel");

const bookBtn = document.getElementById('book-consultant');

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        const userType = document.getElementById('userType').value;
        const description = document.getElementById('description').value;
        const tag = document.getElementById('tag').value;
        const experience = document.getElementById('experience').value;
        const location = document.getElementById('location').value;
        const price = document.getElementById('price').value;
        signup(name, email, password, passwordConfirm, userType, description, tag, experience, location, price);
    });

    userTypeField.addEventListener("change", e => {
        if(userTypeField.value === "consultant") {
          descriptionInput.style.display = 'block';
          tagInput.style.display = 'block';
          experienceInput.style.display = 'block';
          locationInput.style.display = 'block';
          priceInput.style.display = 'block';
          descriptionLabel.style.display = 'block';
          tagLabel.style.display = 'block';
          experienceLabel.style.display = 'block';
          locationLabel.style.display = 'block';
          priceLabel.style.display = 'block';
          descriptionInput.setAttribute("required", "");
          tagInput.setAttribute("required", "");
          experienceInput.setAttribute("required", "");
          locationInput.setAttribute("required", "");
          priceInput.setAttribute("required", "");
        } else {
          descriptionInput.style.display = 'none';
          tagInput.style.display = 'none';
          experienceInput.style.display = 'none';
          locationInput.style.display = 'none';
          priceInput.style.display = 'none';
          descriptionLabel.style.display = 'none';
          tagLabel.style.display = 'none';
          experienceLabel.style.display = 'none';
          locationLabel.style.display = 'none';
          priceLabel.style.display = 'none';
          descriptionInput.removeAttribute("required");
          tagInput.removeAttribute("required");
          experienceInput.removeAttribute("required");
          locationInput.removeAttribute("required");
          priceInput.removeAttribute("required");
        }
      });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

if(bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing..';
    const { consultantId } = e.target.dataset;
    bookConsultant(consultantId)
  })
}