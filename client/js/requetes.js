// Cette fonction globale permet de charger toutes les données nécessaires en appelant les différentes fonctions de chargement
const chargerDonnee = () => {
  chargerListePatients();
  chargerListeEtablissements();
  chargerListeHospitalisations();
}

// Cette fonction charge la liste des patients d'un fichier XML via une requête AJAX
const chargerListePatients = () => {
  $.ajax({
      type: "GET",
      url: "serveur/donnees/listePatients.xml",
      dataType: 'xml'
  }).done(reponse => {
      // Itère chaque élément 'patient' dans la réponse XML
      for (let patientDOM of reponse.getElementsByTagName('patient')) {
          // Crée un objet Patient en utilisant les paramètres extraits de l'élément XML et l'ajoute à la liste
          let unPatient = new Patient(getParam(patientDOM, tableauPatients.clefs));
          listePatients.push(unPatient);
      }
  }).fail(e => {
      // Affiche un message d'erreur dans la zone des messages
      zoneMessage.innerHTML = infobox("Erreur lors de la récupération des patients", "erreur");
  });
}

// Cette fonction charge la liste des établissements d'un fichier XML via une requête AJAX
const chargerListeEtablissements = () => {
  $.ajax({
      type: "GET",
      url: "serveur/donnees/listeEtablissements.xml",
      dataType: 'xml'
  }).done(reponse => {
      // Itère chaque élément 'etablissement' dans la réponse XML
      for (let etabDOM of reponse.getElementsByTagName('etablissement')) {
          // Crée un objet Etablissement en utilisant les paramètres extraits de l'élément XML et l'ajoute à la liste
          let unEtab = new Etablissement(getParam(etabDOM, tableauEtablissements.clefs));
          listeEtablissements.push(unEtab);
      }
  }).fail(e => {
      // Affiche un message d'erreur dans la zone des messages
      zoneMessage.innerHTML = infobox("Erreur lors de la récupération des établissements", "erreur");
  });
}

// Cette fonction charge la liste des hospitalisations d'un fichier XML via une requête AJAX
const chargerListeHospitalisations = () => {
  $.ajax({
      type: "GET",
      url: "serveur/donnees/listeHospitalisations.xml",
      dataType: 'xml'
  }).done(reponse => {
      // Itère chaque élément 'hospitalisation' dans la réponse XML
      for (let hospDOM of reponse.getElementsByTagName('hospitalisation')) {
          // Crée un objet Hospitalisation en utilisant les paramètres extraits de l'élément XML et l'ajoute à la liste
          let unHosp = new Hospitalisation(getParam(hospDOM, tableauHospitalisation.clefs));
          listeHospitalisations.push(unHosp);
      }
  }).fail(e => {
      // Affiche un message d'erreur dans la zone des messages
      zoneMessage.innerHTML = infobox("Erreur lors de la récupération des hospitalisations", "erreur");
  });
}

// Cette fonction extrait les paramètres d'un élément XML avec un tableau de clés spécifié
const getParam = (element, tableauClefs) => {
  let objParams = {};
  for (let param of tableauClefs) {
      // Récupère la valeur du paramètre dans l'élément XML et l'ajoute à l'objet objParams
      objParams[param] = element.getElementsByTagName(param)[0].textContent;
  }

  return objParams;
}
