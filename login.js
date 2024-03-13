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
    form.appendChild(createFormField('loginUsername', 'text', 'Username'));
    form.appendChild(createFormField('loginPassword', 'password', 'Password'));
    form.appendChild(createFormButton('Login'));

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        loginUser(username, password);
    });

    document.getElementById('contentBody').appendChild(form);
}

// Function for logging in a user
function loginUser(username, password) {
    fetch('https://caosr3fgr9.execute-api.us-east-2.amazonaws.com/default/client-portal/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle login success (e.g., storing the received JWT, redirecting the user)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Generate the login form when the page loads
generateLoginForm();