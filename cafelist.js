const filters = document.querySelectorAll('select')
const cafelist = document.querySelector(".cafeList")
filters.forEach(filter => {
    filter.addEventListener('change', function() {
        const open = document.querySelector("#openingHours").value
        const close = document.querySelector("#closingHours").value
        const location = document.querySelector("#city").value
        const price = document.querySelector("#priceRange").value
        const wifi = document.querySelector("#wifi").value
        const apiUrl = `http://localhost:3000/listfilter?opening_hours=${open}&closing_hours=${close}&city=${location}&price_range=${price}&wifi=${wifi}`;
        console.log(apiUrl);
        fetch(`http://localhost:3000/listfilter?opening_hours=${open}&closing_hours=${close}&city=${location}&price_range=${price}&wifi=${wifi}`,
            { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log(data);
                } else {
                    console.log("no cafe returned")
                }

            })
    })
})