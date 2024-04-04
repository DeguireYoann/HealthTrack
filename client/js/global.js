// Déclaration des variables globales
let msg; // Variable pour afficher un élément DOM de message
let contenu; // Variable pour afficher un élément DOM du contenu
let boutonCacher; // Variable pour gérer l'affichage du bouton (élément DOM)

let listePatients = []; // Tableau de liste des patients
let listeEtablissements = []; // Tableau de liste des établissements
let listeHospitalisations = []; // Tableau de liste des hospitalisations

// Fonction qui récupère l'élément DOM pour afficher un message
const zoneMessage = () => {
    msg = !msg ? document.querySelector("#msg") : msg;
    return msg;
}

// Fonction qui récupère l'élément DOM pour afficher du contenu
const zoneContenu = () => {
    contenu = !contenu ? document.querySelector("#contenu") : contenu;
    return contenu;
}

// Fonction qui récupère l'élément DOM pour afficher le bouton
const boutonOeil = () => {
    boutonCacher = !boutonCacher ?  document.querySelector("#bouton-cacher") : boutonCacher;
    return boutonCacher;
}
