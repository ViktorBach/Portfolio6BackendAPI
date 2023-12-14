// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirectiing to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
} else {
    document.querySelector("h3").innerText = `Velkommen, ${sessionStorage.getItem('userName')}!`;
}
//DOM
const filters = document.querySelectorAll('select');
const cafeList = document.querySelector(".cafe-list");

//For each filter add event listener on change
filters.forEach(filter => {
    filter.addEventListener('change', function() {
        //Get values from select tags in HTML
        const open = document.querySelector("#openingHours").value
        const close = document.querySelector("#closingHours").value
        const location = document.querySelector("#city").value
        const price = document.querySelector("#priceRange").value
        const wifi = document.querySelector("#wifi").value
        //api url that queries based on the data from the query selectors above
        const apiUrl = `http://localhost:3000/listfilter?opening_hours=${open}&closing_hours=${close}&city=${location}&price_range=${price}&wifi=${wifi}`;
        fetch(apiUrl, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                //Clear html
                cafeList.innerHTML = '';

                if (data.length > 0) {
                    //Insert data for each cafe found
                    data.forEach(cafe => {
                        //Create elements to put data into
                        const cafeContainer = document.createElement('div');
                        cafeContainer.classList.add('cafe-container');

                        const cafeInfoElement = document.createElement('div');
                        cafeInfoElement.classList.add('cafe-info');
                        //Info is p tags with the found data from MySQL
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
                        //Append data into containers and cafeList
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
    sessionStorage.removeItem('userLastname');
    window.location.href = './index.html';
})

console.log(sessionStorage.getItem("userId"));

