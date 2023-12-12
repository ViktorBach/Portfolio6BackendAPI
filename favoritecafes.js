// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirectiing to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
}

const allCafesList = document.querySelector('.all-cafes');

const detailsURL = 'http://localhost:3000/details'
const favoritesURL = 'http://localhost:3000/new/favorite'
const deleteFavoritesURL = 'http://localhost:3000/delete/favorite'

fetch(detailsURL, { method: 'GET' })
    .then(response => response.json())
    .then(cafeData => {

        allCafesList.innerHTML = '';

        if (cafeData.length > 0) {
            cafeData.forEach(cafe => {

                const allCafesContainer = document.createElement('div');
                allCafesContainer.classList.add('all-cafes-container');

                const allCafesCafeInfo = document.createElement('div');
                allCafesCafeInfo.classList.add('all-cafes-info');

                allCafesCafeInfo.innerHTML = `
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
                //Add rating option
                const ratingsWrapper = document.createElement('div');
                ratingsWrapper.classList.add('ratings-wrapper');

                const ratings = document.createElement('div');
                ratings.classList.add('ratings');

                ratings.innerHTML = `
                <span data-rating="5">&#9733;</span>
                <span data-rating="4">&#9733;</span>
                <span data-rating="3">&#9733;</span>
                <span data-rating="2">&#9733;</span>
                <span data-rating="1">&#9733;</span>
                `

                const coffeeButton = document.createElement('div');
                coffeeButton.classList.add('coffee-button')
                coffeeButton.classList.add('unfavorite')
                coffeeButton.innerHTML = '☕️'

                coffeeButton.addEventListener('click', () => {
                    if (coffeeButton.classList.contains('unfavorite')) {
                        coffeeButton.classList.remove('unfavorite');
                        allCafesList.insertBefore(allCafesContainer, allCafesList.firstChild);
                        console.log(JSON.stringify({
                            user_id: sessionStorage.getItem('userId'),
                            cafe_id: cafe.cafe_id,
                        }))
                        fetch(favoritesURL, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                user_id: sessionStorage.getItem('userId'),
                                cafe_id: cafe.cafe_id,
                            })
                        })
                            .then(response => response.json())
                            .then(favouritesData => {
                                console.log(favouritesData);
                                if (!favouritesData) {
                                    console.log("This cafe is already favorited!");
                                } else {
                                    console.log("Cafe successfully favorited!");
                                }
                        })
                    } else {
                        coffeeButton.classList.add('unfavorite');
                        allCafesList.appendChild(allCafesContainer)
                        fetch(deleteFavoritesURL, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                cafe_id: cafe.cafe_id,
                            })
                        })
                            .then(response => response.json())
                            .then(deletedFavorite => {
                                if (deletedFavorite) {
                                    console.log('Cafe successfully unfavorited');
                                } else {
                                    console.error('Failed to unfavorited cafe.');
                                }
                            })
                    }
                })
                allCafesContainer.appendChild(ratings);
                allCafesContainer.appendChild(coffeeButton)
                allCafesContainer.appendChild(allCafesCafeInfo);

                allCafesList.appendChild(allCafesContainer)
            });
            } else {
            console.log("no cafes returned");
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
