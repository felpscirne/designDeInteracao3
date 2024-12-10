import { loadCountries } from './countries.js';
import { handleApiForm } from './apiQueries.js';



document.addEventListener('DOMContentLoaded', () => {
    loadCountries();
    

     document.getElementById('api-form').addEventListener('submit', handleApiForm);

    const apiForm = document.getElementById('api-form');
    apiForm.addEventListener('submit', handleApiForm);
});
