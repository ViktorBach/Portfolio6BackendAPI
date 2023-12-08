
const loginButton = document.querySelector('.log-in')
const signupButton = document.querySelector('.sign-up')
const loginEmail = document.querySelector('.login-email');
const loginPassword = document.querySelector('.login-password');
const okButton = document.querySelector('.login-button');
const createFirstname = document.querySelector('.create-firstname');
const createLastname = document.querySelector('.create-lastname');
const createEmail = document.querySelector('.create-email');
const createPassword = document.querySelector('.create-password')
const createButton = document.querySelector('.create-button');


//Display login input when button is pressed
let pressLogin = true;

loginButton.addEventListener('click', function() {
    if (pressLogin) {
        loginEmail.style.display = 'block';
        loginPassword.style.display = 'block';
        okButton.style.display = 'block';
        loginButton.classList.add('active');
    } else {
        loginEmail.style.display = 'none';
        loginPassword.style.display = 'none';
        okButton.style.display = 'none';
        loginButton.classList.remove('active');
    }
    pressLogin = !pressLogin;
});

//Display sign up input when button is pressed
let pressSignup = true;

signupButton.addEventListener('click', function() {
    if (pressSignup) {
        createFirstname.style.display = 'block';
        createLastname.style.display = 'block';
        createEmail.style.display = 'block';
        createPassword.style.display = 'block';
        createButton.style.display = 'block';
        signupButton.classList.add('active');
    } else {
        createFirstname.style.display = 'none';
        createLastname.style.display = 'none';
        createEmail.style.display = 'none';
        createPassword.style.display = 'none';
        createButton.style.display = 'none';
        signupButton.classList.remove('active');
    }
    pressSignup = !pressSignup;
});


// Login user
okButton.addEventListener('click', function() {
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
                console.log("Logged in! Welcome " + data.name);
                window.location.href = './cafelist.html';
            } else {
                console.log("Login failed. Reason: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error: ', error.message);
        });
})

// Create new user
createButton.addEventListener('click', function (){
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
            } else {
                console.log(data.message);
            }
        })
})
