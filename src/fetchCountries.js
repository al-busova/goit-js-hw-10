const fetchCountries = (name) => {
    return fetch('https://restcountries.com/v3.1/all')
        .then(response => {
            return response.json();
        })
        .then(data => {
            return console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
};

export { fetchCountries };