// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirectiing to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
}


//Create new cafe
const newCafeName = document.querySelector('#cafe-name');
const newCafeAddress = document.querySelector('#cafe-address');
const newCafeCity = document.querySelector('#cafe-city');
const newCafeOpen = document.querySelector('#cafe-open');
const newCafeClose = document.querySelector('#cafe-close');
const newCafePrice = document.querySelector('#cafe-price');
const newCafeWifi = document.querySelector('#cafe-wifi');
const newCafeInfo = document.querySelector('#cafe-info');
const createButton = document.querySelector('.create-cafe');

createButton.addEventListener('click', function (){
    const createCafeObject = {
        name: newCafeName.value,
        address: newCafeAddress.value,
        city: newCafeCity.value,
        open: newCafeOpen.value,
        close: newCafeClose.value,
        price: newCafePrice.value,
        wifi: newCafeWifi.value,
        info: newCafeInfo.value
    };
    console.log(createCafeObject);
    fetch(
        `http://localhost:3000/new/cafe`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createCafeObject)
        }
    )
        .then(response => response.json())
        .then(data => {
            if (!data) {
                console.log("Your cafe is already in our website!");
            } else {
                console.log("Cafe successfully created! Thank you for sharing!");
            }
        })
})

// Logout functionality
const logoutButton = document.querySelector('#logout-button')
logoutButton.addEventListener('click', function() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userLastname');
    window.location.href = './index.html';
})
