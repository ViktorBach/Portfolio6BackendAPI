const allCafesList = document.querySelector('.all-cafes');

const apiURL = 'http://localhost:3000/details'

fetch(apiURL, { method: 'GET' })
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
                      <p>Wi-Fi: ${cafe.wifi}</p>
                      <p>Info: ${cafe.info}</p>
                    `;

                const coffeeButton = document.createElement('div');
                coffeeButton.classList.add('coffee-button')
                coffeeButton.classList.add('unfavourite')
                coffeeButton.innerHTML = '☕️'

                coffeeButton.addEventListener('click', () => {
                    if (coffeeButton.classList.contains('unfavourite')) {
                        coffeeButton.classList.remove('unfavourite');
                        allCafesList.insertBefore(allCafesContainer, allCafesList.firstChild);
                    } else {
                        coffeeButton.classList.add('unfavourite');
                        allCafesList.appendChild(allCafesContainer)
                    }
                })

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