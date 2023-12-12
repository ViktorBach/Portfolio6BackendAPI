
const loginUser = document.querySelector('.login')
const loginButton = document.querySelector('.log-in')
const signupButton = document.querySelector('.sign-up')
const loginEmail = document.querySelector('.login-email');
const loginPassword = document.querySelector('.login-password');
const okButton = document.querySelector('.login-button');
const loginUserStatus = document.querySelector('#login-user-status');

const createUser = document.querySelector('.create');
const createFirstname = document.querySelector('.create-firstname');
const createLastname = document.querySelector('.create-lastname');
const createEmail = document.querySelector('.create-email');
const createPassword = document.querySelector('.create-password')
const createButton = document.querySelector('.create-button');
const createUserStatus = document.querySelector('#create-user-status');


//Display login input when button is pressed
let pressLogin = true;

loginButton.addEventListener('click', function() {
    if (pressLogin) {
        loginUser.style.display = 'flex';
        loginButton.classList.add('active');
        if (signupButton.classList.contains('active')) {
            signupButton.classList.remove('active')
        }
        createUser.style.display = 'none';
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
                sessionStorage.setItem('userLastname', data.lastname);
                sessionStorage.setItem('userId', data.userId);
                console.log("Logged in! Welcome " + data.name);
                loginUserStatus.style.display = 'none';
                window.location.href = './cafelist.html';
            } else {
                console.log("Login failed. Reason: " + data.message);
                loginUserStatus.textContent = data.message;
                loginUserStatus.style.display = 'block';
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
                createUserStatus.textContent = data.message;
                createUserStatus.style.display = 'block';
            } else {
                console.log(data.message);
                createUserStatus.textContent = data.message;
                createUserStatus.style.display = 'block';
            }
        })
        .catch(error => {
            console.log('Error: ', error);
        })


})
