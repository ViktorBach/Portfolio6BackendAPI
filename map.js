// Add world map, setting view to focus on Denmark
const map = L.map('map').setView([56.2, 10.4], 8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 16,
    minZoom: 8,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

function getCafeDetails() {
    console.log('Attempting to get cafe details')
    fetch(
        `http://localhost:3000/details`,
        {
            method: "GET"
        }
    )
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                console.log('Cafe details retrieved, converting addresses')
                data.forEach(convertAddressToLatLon)
            } else {
                console.log("No cafe details found?");
            }
        })
        .catch(error => {
            console.error("Error fetching cafe details data: ,", error);
        });
}

function convertAddressToLatLon(cafe) {
    const address = `${cafe.address} ${cafe.city}`;

    // Encode address to make it work with URLs
    const encodedAddress = encodeURIComponent(address)

    // Set API Fetch url to use the address
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

    const headerUserAgent = new Headers({
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36"
    })
    console.log('Attempting to convert address: ' + address)
    // Make a fetch request to the Nominatim API to convert address
    // Set timeout delay to 1200 milliseconds (1.2 sec) to respect Nominatim API terms
    setTimeout(() => {
        fetch(nominatimUrl, {headerUserAgent})
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log('Address converted, adding to map')
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    addCafeToMap(latitude, longitude, cafe)
                } else {
                    console.log("No results found for the address: " + address)
                }
            })
    }, 1200);
}

function addCafeToMap(latitude, longitude, cafe) {
    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(
            `<b>${cafe.cafe_name}</b><br>` +
            `Addresse: ${cafe.address} ${cafe.city}<br>` +
            `Åbningstid: ${cafe.opening_hours} | Lukketid: ${cafe.closing_hours}<br>` +
            `Prisklasse: ${cafe.price_range}<br>` +
            `Wifi: ${wifiConverter(cafe.wifi)}`
        );
    console.log('Added address to map')
}

function wifiConverter(wifi) {
    if (wifi) {
        return 'Ja';
    } else {
        return 'Nej';
    }
}