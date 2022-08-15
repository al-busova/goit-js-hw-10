const fetchCountries = (name) => {
    return fetch(`https://restcountries.com/v2/name/${name}`)
        .then(response => {
            return response.json();
        });
};

export { fetchCountries };
