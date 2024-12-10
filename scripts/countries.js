// Função para carregar a lista de países
export async function loadCountries() {
    try {
        const response = await fetch('./json/paises.json');
        const countries = await response.json();

        //**map, filter ou reduce**
        const countrySelect = document.getElementById('country-select');
        const options = countries.map(({ nome_pais }) => 
            `<option value="${nome_pais}">${nome_pais}</option>`).join('');
        countrySelect.innerHTML += options;


        countrySelect.addEventListener('change', (e) => {
            const selectedCountry = countries.find(
                country => country.nome_pais === e.target.value
            );
            displayCountryDetails(selectedCountry);
        });
    } catch (error) {
        console.error('Erro ao carregar países:', error);
        alert('Não foi possível carregar a lista de países.');
    }
}

// Função para exibir os detalhes do país
function displayCountryDetails(country) {
    const details = document.getElementById('country-details');
    if (country) {
        details.innerHTML = `
            <h3>${country.nome_pais}</h3>
            <p><strong>Gentílico:</strong> ${country.gentilico}</p>
            <p><strong>Sigla:</strong> ${country.sigla}</p>
            <p><strong>Nome Internacional:</strong> ${country.nome_pais_int}</p>
        `;
    } else {
        details.innerHTML = '<p>Nenhum país selecionado.</p>';
    }
}
