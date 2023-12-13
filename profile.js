// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirecting to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
} else {
    document.querySelector(".name").innerText = `Fornavn: ${sessionStorage.getItem('userName')}`;
    document.querySelector(".email").innerText = `E-mail: ${sessionStorage.getItem('userEmail')}`;
    document.querySelector(".lastname").innerText = `Efternavn: ${sessionStorage.getItem('userLastname')}`;
    //Add ^ to my favorites when done
}

const favoriteList = document.querySelector('.favorite-list')
const userId = sessionStorage.getItem('userId')
const apiURL = `http://localhost:3000/favorites?user_id=${userId}`;

fetch(apiURL, { method: 'GET' })
    .then(response => response.json())
    .then(favoriteData => {

        favoriteList.innerHTML = '';

        if (favoriteData.length > 0) {
            favoriteData.forEach(cafe => {

                const favoriteContainer = document.createElement('div');
                favoriteContainer.classList.add('favorite-container');

                const favoriteInfoElement = document.createElement('div');
                favoriteInfoElement.classList.add('cafe-info');

                favoriteInfoElement.innerHTML = `
                              <p> </p>
                              <p>${cafe.cafe_name}</p>
                              <p> </p>
                              <p>Åbningstid: ${cafe.opening_hours}</p>
                              <p>Lukketid: ${cafe.closing_hours}</p>
                              <p>By: ${cafe.city}</p>
                              <p>Addresse: ${cafe.address}</p>
                              <p>Pris: ${cafe.price_range}</p>
                              <p>Wi-Fi: ${cafe.wifi === 1 ? 'Ja' : 'Nej'}</p>
                              <p>Info: ${cafe.info}</p>
                            `;

                favoriteContainer.appendChild(favoriteInfoElement);

                favoriteList.appendChild(favoriteContainer);
            });
        } else {
            favoriteList.innerHTML = 'No Cafes Favorited';
        }
    })
    .catch(error => {
        console.log('error: ', error);
    });




// Logout functionality
const logoutButton = document.querySelector('#logout-button')
logoutButton.addEventListener('click', function() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userLastname');
    window.location.href = './index.html';
})
