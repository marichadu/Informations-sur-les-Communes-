# Informations sur les Communes

Ce projet permet de sélectionner un département et une ville pour afficher les informations correspondantes et voir l'emplacement de la mairie sur une carte interactive.

## Fonctionnalités

- Sélection d'un département et d'une ville
- Affichage des informations de la ville sélectionnée (nom, population, surface, code postal)
- Affichage de l'emplacement de la mairie sur une carte interactive
- Lien pour voir l'itinéraire vers la mairie sur Google Maps

## Prérequis

- Un navigateur web moderne
- Connexion Internet pour charger les ressources externes (Leaflet.js et API Géo)

## Installation

1. Clonez ce dépôt sur votre machine locale :
    ```bash
    git clone https://github.com/votre-utilisateur/communes.git
    ```

2. Ouvrez le fichier `index.html` dans votre navigateur web.

## Structure du Projet

- `index.html` : Le fichier HTML principal contenant la structure de la page.
- `styles.css` : Le fichier CSS pour le style de la page.
- [script.js](http://_vscodecontentref_/0) : Le fichier JavaScript contenant la logique pour peupler les départements, les villes et afficher les informations de la ville sélectionnée.

## Utilisation

1. Ouvrez le fichier `index.html` dans votre navigateur web.
2. Sélectionnez un département dans la liste déroulante.
3. Sélectionnez une ville dans la liste déroulante qui apparaît.
4. Les informations de la ville sélectionnée s'afficheront, ainsi que l'emplacement de la mairie sur la carte.
5. Cliquez sur le bouton "Voir sur Google Maps" pour voir l'itinéraire vers la mairie.

## Ressources

- [Leaflet.js](https://leafletjs.com/) : Une bibliothèque JavaScript open-source pour les cartes interactives.
- [API Géo](https://geo.api.gouv.fr/) : Une API pour accéder aux données géographiques des communes françaises.
