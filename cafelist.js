// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirectiing to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
} else {
    document.querySelector("h3").innerText = `Velkommen, ${sessionStorage.getItem('userName')}!`;
}

const filters = document.querySelectorAll('select');
const cafeList = document.querySelector(".cafe-list");
filters.forEach(filter => {
    filter.addEventListener('change', function() {
        const open = document.querySelector("#openingHours").value
        const close = document.querySelector("#closingHours").value
        const location = document.querySelector("#city").value
        const price = document.querySelector("#priceRange").value
        const wifi = document.querySelector("#wifi").value
        const apiUrl = `http://localhost:3000/listfilter?opening_hours=${open}&closing_hours=${close}&city=${location}&price_range=${price}&wifi=${wifi}`;
        console.log(apiUrl);
        fetch(apiUrl, { method: 'GET' })
            .then(response => response.json())
            .then(data => {

                cafeList.innerHTML = '';

                if (data.length > 0) {
                    data.forEach(cafe => {

                        const cafeContainer = document.createElement('div');
                        cafeContainer.classList.add('cafe-container');

                        const cafeInfoElement = document.createElement('div');
                        cafeInfoElement.classList.add('cafe-info');

                        cafeInfoElement.innerHTML = `
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

                        cafeContainer.appendChild(cafeInfoElement);

                        cafeList.appendChild(cafeContainer);
                    });
                } else {
                    console.log("no cafes returned");
                }
            })
            .catch(error => {
                console.log('error: ', error);
            });
    });
});

// Logout functionality
const logoutButton = document.querySelector('#logout-button')
logoutButton.addEventListener('click', function() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    window.location.href = './index.html';
})
