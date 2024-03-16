document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const requiredInputs = form.querySelectorAll('input[required]');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');
    const phoneInput = document.getElementById('phone');
    const fullNameInput = document.getElementById('fullName');
    Inputmask({ "mask": "+7 (999) 999-99-99" }).mask(phoneInput);
    requiredInputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
            checkAllFields();
        });
    });
    fullNameInput.addEventListener('input', () => {
        validateFullName(fullNameInput);
        checkAllFields();
    });
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (validateFullName(fullNameInput) && checkAllFields()) {
            successMessage.style.display = 'block';
        } else {
            successMessage.style.display = 'none';
        }
    });
    form.addEventListener('reset', () => {
        submitButton.disabled = true;
        successMessage.style.display = 'none';
        requiredInputs.forEach(input => {
            input.parentElement.classList.remove('invalid');
            input.nextElementSibling.style.display = 'none';
        });
    });
});

function validateInput(input) {
    if (input.id === 'fullName') {
        validateFullName(input);
    } else {
        if (input.checkValidity()) {
            input.parentElement.classList.remove('invalid');
            input.nextElementSibling.style.display = 'none';
        } else {
            input.parentElement.classList.add('invalid');
            input.nextElementSibling.style.display = 'block';
        }
    }
}

function validateFullName(input) {
    const fullNamePattern = /^[а-яА-ЯёЁa-zA-Z-]+\s+[а-яА-ЯёЁa-zA-Z-]+\s+[а-яА-ЯёЁa-zA-Z-]+$/;
    if (fullNamePattern.test(input.value.trim())) {
        input.parentElement.classList.remove('invalid');
        input.nextElementSibling.style.display = 'none';
        return true;
    } else {
        input.parentElement.classList.add('invalid');
        input.nextElementSibling.style.display = 'block';
        input.nextElementSibling.textContent = 'Введите корректное ФИО';
        return false;
    }
}

function checkAllFields() {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');
    const isValid = form.checkValidity();
    submitButton.disabled = !isValid;
    return isValid;
}
