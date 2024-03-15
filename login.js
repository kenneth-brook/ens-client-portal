// Function to create a form field
function createFormField(id, type, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.placeholder = placeholder;
    return input;
}

// Function to create a form button
function createFormButton(text) {
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = text;
    return button;
}

// Function to generate the login form
function generateLoginForm() {
    const form = document.createElement('form');
    form.id = 'loginForm';
    const header = document.createElement('p');
    header.className = "formHeader";
    header.innerText = "Please Login To Access Your Emerge-N-See Control Suite Portal";
    form.appendChild(header);
    form.appendChild(createFormField('email', 'email', 'Username'));
    form.appendChild(createFormField('password', 'password', 'Password'));
    form.appendChild(createFormButton('Login'));

    document.getElementById('contentBody').appendChild(form);
    const errorBox = document.createElement('div');
    errorBox.id = "errorBox";
    errorBox.style.width = "100%";
    errorBox.style.textAlign = "center";
    errorBox.style.color = "red";
    form.appendChild(errorBox)
    form.addEventListener('submit', handleLoginSubmit);
}

// Generate the login form when the page loads
generateLoginForm();

function handleLoginSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password,
    };

    fetch('https://client-control.911-ens-services.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        if(data.token) {
            // Store the token and possibly redirect the user
            localStorage.setItem('jwtToken', data.token);
        } else {
            // Handle login failure
            const onError = document.getElementById('errorBox');
            onError.innerText = "Incorrect Email or Password";
        }
    })
    .catch(error => console.error('Error during login:', error));
}