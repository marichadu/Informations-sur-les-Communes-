document.addEventListener('DOMContentLoaded', () => {
    const depSelect = document.getElementById('dep');
    const citiesSelect = document.getElementById('cities');
    const communeInfo = document.getElementById('commune-info');
    let map, mairieMarker;

    // Initialiser la carte
    function initMap() {
        map = L.map('map').setView([46.603354, 1.888334], 6); // Centrer la carte sur la France

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mairieMarker = L.marker([0, 0]).addTo(map);
    }

    // Fonction pour appeler l'API
    async function callApi(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        return response.json();
    }

    // Peupler les départements
    async function populateDepartments() {
        const departments = await callApi('https://geo.api.gouv.fr/departements');
        departments.forEach(dep => {
            const option = document.createElement('option');
            option.value = dep.code;
            option.textContent = `${dep.code} - ${dep.nom}`;
            depSelect.appendChild(option);
        });
    }

    // Peupler les villes en fonction du département sélectionné
    async function populateCities(depCode) {
        const cities = await callApi(`https://geo.api.gouv.fr/departements/${depCode}/communes`);
        citiesSelect.innerHTML = '<option value="" checked disabled>- Communes -</option>';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.code;
            option.textContent = city.nom;
            citiesSelect.appendChild(option);
        });
    }

    // Afficher les informations de la ville sélectionnée
    async function displayCityInfo(cityCode) {
        const city = await callApi(`https://geo.api.gouv.fr/communes/${cityCode}?fields=nom,code,codesPostaux,population,surface,mairie`);
        const mairieLocation = city.mairie ? { lat: city.mairie.coordinates[1], lng: city.mairie.coordinates[0] } : null;
        const googleMapsLink = mairieLocation ? `https://www.google.com/maps/dir/?api=1&destination=${mairieLocation.lat},${mairieLocation.lng}` : '#';

        communeInfo.innerHTML = `
            <table>
                <tr>
                    <td>Commune sélectionnée:</td>
                    <td>${city.nom}</td>
                </tr>
                <tr>
                    <td>Population:</td>
                    <td>${city.population}</td>
                </tr>
                <tr>
                    <td>Surface:</td>
                    <td>${city.surface ? city.surface + ' ha' : 'N/A'}</td>
                </tr>
                <tr>
                    <td>Code Postal:</td>
                    <td>${city.codesPostaux.join(', ')}</td>
                </tr>
                <tr>
                    <td>Adresse de la Mairie:</td>
                    <td>
                        ${mairieLocation ? `<button onclick="window.open('${googleMapsLink}', '_blank')">Voir sur Google Maps</button>` : 'N/A'}
                    </td>
                </tr>
            </table>
        `;
        communeInfo.style.display = 'block'; // Rendre les informations visibles

        // Mettre à jour la position du marqueur de la mairie sur la carte
        if (mairieLocation) {
            mairieMarker.setLatLng(mairieLocation);
            map.setView(mairieLocation, 13);
        }
    }

    // Écouteurs d'événements
    depSelect.addEventListener('change', () => {
        const selectedDep = depSelect.value;
        populateCities(selectedDep);
    });

    citiesSelect.addEventListener('change', () => {
        const selectedCityCode = citiesSelect.value;
        displayCityInfo(selectedCityCode);
    });

    // Initialiser la carte et peupler les départements
    initMap();
    populateDepartments();
});