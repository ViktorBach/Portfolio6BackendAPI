// Get login elements from DOM
const loginUser = document.querySelector('#login-form');
const loginButton = document.querySelector('.log-in');
const signupButton = document.querySelector('.sign-up');
const loginEmail = document.querySelector('.login-email');
const loginPassword = document.querySelector('.login-password');
const loginForm = document.querySelector('#login-form');
const loginUserStatus = document.querySelector('#login-user-status');

// Get create user elements from DOM
const createUser = document.querySelector('#create-form');
const createFirstname = document.querySelector('.create-firstname');
const createLastname = document.querySelector('.create-lastname');
const createEmail = document.querySelector('.create-email');
const createPassword = document.querySelector('.create-password');
const createForm = document.querySelector('#create-form');
const createUserStatus = document.querySelector('#create-user-status');


// Display login input when button is pressed
let pressLogin = true;

loginButton.addEventListener('click', function() {
    if (pressLogin) {
        loginUser.style.display = 'flex';
        loginButton.classList.add('active');
        if (signupButton.classList.contains('active')) {
            signupButton.classList.remove('active')
        }
        createUser.style.display = 'none';
        createUserStatus.style.display = 'none';
        pressLogin = false;
        pressSignup = true;
    } else {
        loginUser.style.display = 'none';
        loginButton.classList.remove('active');
        loginUserStatus.style.display = 'none';
        pressLogin = true;
    }

});

//Display sign up input when button is pressed
let pressSignup = true;

signupButton.addEventListener('click', function() {
    if (pressSignup) {
        createUser.style.display = 'flex';
        signupButton.classList.add('active');
        if (loginButton.classList.contains('active')) {
            loginButton.classList.remove('active')
        }
        loginUser.style.display = 'none';
        loginUserStatus.style.display = 'none'
        pressSignup = false;
        pressLogin = true;
    } else {
        createUser.style.display = 'none';
        signupButton.classList.remove('active');
        createUserStatus.style.display = 'none';
        pressSignup = true;
    }
});


// Login user
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form behaviour of refreshing site

    loginUserStatus.style.display = 'none';

    displayLoader(true, loginForm);

    const loginObject = {
        email: loginEmail.value,
        password: loginPassword.value
    };

    fetch(
        `http://localhost:3000/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginObject)
        }
    )
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('userEmail', data.email);
                sessionStorage.setItem('userName', data.name);
                sessionStorage.setItem('userLastname', data.lastname);
                sessionStorage.setItem('userId', data.userId);
                console.log("Logged in! Welcome " + data.name);
                loginUserStatus.style.display = 'none';
                displayLoader(false, loginForm);
                window.location.href = './cafelist.html';
            } else {
                console.log("Login failed. Reason: " + data.message);
                loginUserStatus.textContent = data.message;
                loginUserStatus.style.display = 'block';
                displayLoader(false, loginForm);
            }
        })
        .catch(error => {
            console.error('Error: ', error.message);
            displayLoader(false, loginForm);
            loginUserStatus.style.display = 'block';
            loginUserStatus.textContent = 'Netværks fejl - kan ikke få forbindelse til login serveren';
        });
})

// Create new user
createForm.addEventListener('submit', function (event){
    event.preventDefault(); // Prevent default form behaviour of refreshing site

    createUserStatus.style.display = 'none';

    displayLoader(true, createForm);

    const createAccountObject = {
        firstname: createFirstname.value,
        lastname: createLastname.value,
        email: createEmail.value,
        password: createPassword.value
    };

    fetch(
        `http://localhost:3000/createuser`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createAccountObject)
        }
    )
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message);
                createUserStatus.textContent = data.message;
                createUserStatus.style.display = 'block';
                displayLoader(false, createForm);
            } else {
                console.log(data.message);
                createUserStatus.textContent = data.message;
                createUserStatus.style.display = 'block';
                displayLoader(false, createForm);
            }
        })
        .catch(error => {
            console.log('Error: ', error);
            displayLoader(false, createForm);
            createUserStatus.textContent = 'Netværks fejl - kan ikke få forbindelse til bruger serveren';
            createUserStatus.style.display = 'block';
        })


})

// Loading section
const loader = document.createElement('div');
loader.classList.add('loader', 'hidden');

function displayLoader(visibility, section) {
    section.appendChild(loader);
    if (visibility) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}
