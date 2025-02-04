// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirectiing to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
}

let storedUserId = sessionStorage.getItem("userId")
const allCafesList = document.querySelector('.all-cafes');
//api urls
const detailsURL = 'http://localhost:3000/details'
const favoritesURL = 'http://localhost:3000/new/favorite'
const ratingURL = 'http://localhost:3000/rating'
const deleteFavoritesURL = 'http://localhost:3000/delete/favorite'
//const favoritesDataURL = `http://localhost:3000/favorites?user_id=${storedUserId}`
const ratingsURL = 'http://localhost:3000/save/rating'

/*fetch(favoritesDataURL,
    { method: 'GET' })
    .then(response => response.json())
    .then(favoritesData => {
        if (favoritesData) {
            console.log(favoritesData)
            checkFavorite(favoritesData);
        }
    })
*/
fetch(detailsURL, { method: 'GET' })
    .then(response => response.json())
    .then(cafeData => {
        //Clear html
        allCafesList.innerHTML = '';

        if (cafeData.length > 0) {
            //Insert data for each cafe found
            cafeData.forEach(cafe => {
                //Create elements to put data into
                const allCafesContainer = document.createElement('div');
                allCafesContainer.classList.add('all-cafes-container');
                allCafesContainer.setAttribute('id', cafe.cafe_id)

                const allCafesCafeInfo = document.createElement('div');
                allCafesCafeInfo.classList.add('all-cafes-info');

                //Cafe info is p tags with data from MySQL
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

                //Adding stars with HTML unicode
                ratings.innerHTML = `
                <span data-rating="5">&#9733;</span>
                <span data-rating="4">&#9733;</span>
                <span data-rating="3">&#9733;</span>
                <span data-rating="2">&#9733;</span>
                <span data-rating="1">&#9733;</span>
                `;

                allCafesList.appendChild(allCafesContainer)
                allCafesContainer.appendChild(ratings);

                //Coffeebutton on each cafe
                const coffeeButton = document.createElement('div');
                coffeeButton.classList.add('coffee-button')
                coffeeButton.classList.add('unfavorite')
                coffeeButton.innerHTML = '☕️'
                //Event listener for the buttons
                coffeeButton.addEventListener('click', () => {
                    //If coffee button has the unfavorite class and is clicked: remove class
                    if (coffeeButton.classList.contains('unfavorite')) {
                        coffeeButton.classList.remove('unfavorite');
                        //Move the container which button was clicked to the front of allCafesList
                        allCafesList.insertBefore(allCafesContainer, allCafesList.firstChild);
                        //Post the user_id of the logged in user and the cafe_id of the clicked cafe
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
                            .then(favoritesData => {
                                console.log(favoritesData);
                                if (!favoritesData) {
                                    console.log("This cafe is already favorited!");
                                } else {
                                    console.log("Cafe successfully favorited!");
                                }
                        })
                    } else {
                        //If coffee button doesn't have the unfavorite class, add it on click
                        coffeeButton.classList.add('unfavorite');
                        //And push it to the end of the list
                        allCafesList.appendChild(allCafesContainer)
                        //Delete the row in MySQL with the cafe_id of the clicked cafe
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
                //Append coffee button and cafe info to html
                allCafesContainer.appendChild(coffeeButton)
                allCafesContainer.appendChild(allCafesCafeInfo);

            });
            //Calling addRating function
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
        //Select all 'span' elements within the current 'ratings' container
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
                        //Adding class for CSS
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

/*function checkFavorite(listOfFavForCurrentUser) {
    listOfFavForCurrentUser.forEach((cafe) => {
        let currentCafeID = cafe.cafe_id;

        // Check if the cafe_id exists in the document
        let currentCafeDiv = document.getElementById(currentCafeID);

        if (currentCafeDiv) {
            let coffeeFavButton = currentCafeDiv.querySelector(".coffee-button");

            // Check if the coffee button exists before toggling the class
            if (coffeeFavButton) {
                coffeeFavButton.classList.toggle("unfavorite");
            }
        }
    });
}
*/