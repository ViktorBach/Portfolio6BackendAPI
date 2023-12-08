// Try and get user authenticated information
const userEmail = sessionStorage.getItem('userEmail');
const userName = sessionStorage.getItem('userName');
console.log('userName:', userName);
// Check if user is authenticated. If not, redirect to index.html
if (!userName) {
    console.log('User not authenticated. Redirectiong to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
} else {
    try {
        console.log('User authenticated:', userName);
        document.querySelector("h3").innerText = `Velkommen, ${userName}!`;
    } catch (error) {
        console.error('Error parsing user token: ', error);
        console.log('Redirecting to index.html due to an error')
        window.location.href = './index.html';
    }
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
                              <p>Wi-Fi: ${cafe.wifi}</p>
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