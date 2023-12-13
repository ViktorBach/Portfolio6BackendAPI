// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirectiing to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
}

let storedUserId = sessionStorage.getItem("userId")
const allCafesList = document.querySelector('.all-cafes');

const detailsURL = 'http://localhost:3000/details'
const favoritesURL = 'http://localhost:3000/new/favorite'
const ratingURL = 'http://localhost:3000/rating'
const deleteFavoritesURL = 'http://localhost:3000/delete/favorite'

fetch(detailsURL, { method: 'GET' })
    .then(response => response.json())
    .then(cafeData => {

        allCafesList.innerHTML = '';

        if (cafeData.length > 0) {
            cafeData.forEach(cafe => {
                const allCafesContainer = document.createElement('div');
                allCafesContainer.classList.add('all-cafes-container');
                allCafesContainer.setAttribute('id', cafe.cafe_id)

                const allCafesCafeInfo = document.createElement('div');
                allCafesCafeInfo.classList.add('all-cafes-info') ;


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
                //CSS inspired from: https://www.youtube.com/watch?v=_gToDN-aoyI
                const ratingsContainer = document.createElement('div')
                ratingsContainer.classList.add('ratings-container')
                const ratings = document.createElement('div');
                ratingsContainer.append(ratings);
                ratings.classList.add('ratings');

                ratings.innerHTML = `
                <span data-rating="5">&#9733;</span>
                <span data-rating="4">&#9733;</span>
                <span data-rating="3">&#9733;</span>
                <span data-rating="2">&#9733;</span>
                <span data-rating="1">&#9733;</span>
                `;
                allCafesList.appendChild(allCafesContainer)
                allCafesContainer.appendChild(ratings);


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

                allCafesContainer.appendChild(coffeeButton)
                allCafesContainer.appendChild(allCafesCafeInfo);



            });
            addRating(cafeData)
            } else {
            console.log("no cafes returned");
        }
    })
    .catch(error => {
        console.log('error: ', error);
    });

function addRating(cafeData) {
    let ratingStars =  document.querySelectorAll('.ratings')

    ratingStars.forEach((starContainer, index) => {
        let stars = starContainer.querySelectorAll('span')

        stars.forEach((star) => {
            star.addEventListener("click",() => {

                let rating = (star.getAttribute("data-rating"))
                let cafeId = cafeData[index].cafe_id

                let returnObject = {
                    user_id: storedUserId,
                    cafe_id: cafeId,
                    rating_value: rating
                }

                fetch(ratingURL, {
                    method: 'post',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(returnObject),
                }).then(response => response.text())
                    .then((ok) => {
                        console.log(ok);
                        star.setAttribute('data-clicked', '');
                    })
            })
        })

    })
}

// Logout functionality
const logoutButton = document.querySelector('#logout-button')
logoutButton.addEventListener('click', function() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userLastname');
    window.location.href = './index.html';
})

const cafesContainer = document.querySelector(".all-cafes");
const listOfAllCafes = cafesContainer.querySelectorAll("div")

listOfAllCafes.forEach((cafe) => {
    let infoDiv = cafe.querySelector(".all-cafes-info");

})


