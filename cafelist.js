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
        fetch(apiUrl,{ method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log(data);
                } else {
                    console.log("no cafe returned");
                }

                cafeList.innerHTML = '';

                if (data.length > 0) {

                    const firstCafe = data[0]

                    const cafeContainer = document.createElement('div');
                    cafeContainer.classList.add('cafe-container');

                    const cafeInfoElement = document.createElement('div');
                    cafeInfoElement.classList.add('cafe-info');
                    cafeInfoElement.innerHTML = `
                    <p>Opening Hours: ${firstCafe.opening_hours}</p>
                    <p>Closing Hours: ${firstCafe.closing_hours}</p>
                    <p>City: ${firstCafe.city}</p>
                    <p>Address: ${firstCafe.address}</p>
                    <p>Price Range: ${firstCafe.price_range}</p>
                    <p>Wi-Fi: ${firstCafe.wifi}</p>
                    <p>Info: ${firstCafe.info}</p>
                  `;

                    cafeContainer.appendChild(cafeInfoElement)

                    cafeList.appendChild(cafeContainer);
                } else {
                    console.log("No cafe returned");
                }

        })
            .catch(error => {
                console.log("error ", error);
            });
    });
});