// Déclaration de trois objets contenant le type de tableau, les titres et les clefs d'object des tableaux (déclarer à part pour déclarer les tableaux ci-haut comme mentioné dans le devis)
const tableauPatients = {
  type: "patient",
  titres: ["Dossier du patient", "Nom", "Prénom", "Date de naissance", "Sexe"],
  clefs: ["dossier", "nom", "prenom", "naissance", "sexe"]
};
const tableauEtablissements = {
  type: "établissement",
  titres: ["Code d'établissement", "Nom d'établissement", "Adresse", "Code Postal", "Téléphone"],
  clefs: ["code", "nom", "adresse", "codePostale", "telephone"]
};
const tableauHospitalisation = {
  type: "hospitalisation",
  titres: ["Code d'établissement", "Dossier du patient", "Date d'admission", "Date de sortie", "Spécialité"],
  clefs: ["etablissement", "dossier", "admission", "sortie", "specialite"]
};

// Fonction pour afficher la liste des patients
const listerPatients = () => {
  const {
    message,
    table
  } = creerAffichage(
    listePatients,
    tableauPatients
  );
  zoneMessage().innerHTML = message;
  afficherTableau([table]);
}

// Fonction pour afficher la liste des établissements
const listerEtablissements = () => {
  const {
    message,
    table
  } = creerAffichage(
    listeEtablissements,
    tableauEtablissements
  );
  zoneMessage().innerHTML = message;
  afficherTableau([table]);
}

// Fonction pour afficher la liste des hospitalisations
const listerHospitalisations = () => {
  const {
    message,
    table
  } = creerAffichage(
    listeHospitalisations,
    tableauHospitalisation
  );
  zoneMessage().innerHTML = message;
  afficherTableau([table]);
}

// Fonction pour afficher le selecteur de patients depuis le menu
const afficherHospitalisationParPatient = () => {
  selecteurPatients();
}

// Fonction pour afficher le selecteur d'établissements depuis le menu
const afficherHospitalisationParAttribut = () => {
  selecteurEtablissement();
}

// Fonction pour afficher un menu déroulant des patients
const selecteurPatients = () => {
  const select = document.createElement("select");
  select.id = "listePatients";
  select.addEventListener("change", () => listerHospitalisationParPatient(select.value));
  const optionBase = new Option("Choisir un patient");
  select.appendChild(optionBase);

  listePatients.forEach((patient) => {
    const nouvelOption = new Option(
      `${patient.getDossier()} (${patient.getPrenom()} ${patient.getNom()})`,
      patient.getDossier()
    );
    select.appendChild(nouvelOption);
  });

  zoneMessage().innerHTML = infobox("Sélectionnez un patient");
  zoneContenu().innerHTML = '';
  zoneContenu().appendChild(select);
};

// Fonction pour afficher un menu déroulant des établissements
const selecteurEtablissement = () => {
  const select = document.createElement("select");
  select.id = "listeEtablissement";
  select.addEventListener("change", () => selecteurSpecialites(select.value));
  const optionBase = new Option("Choisir un établissement");
  select.appendChild(optionBase);

  listeEtablissements.forEach((etablissement) => {
    const nouvelOption = new Option(
      `${etablissement.getCode()} (${etablissement.getNom()})`,
      etablissement.getCode()
    );
    select.appendChild(nouvelOption);
  });

  zoneMessage().innerHTML = infobox("Selectionnez un établissement");
  zoneContenu().innerHTML = '';
  zoneContenu().appendChild(select);
}

// Fonction pour afficher un menu déroulant des spécialitées
const selecteurSpecialites = (code) => {
  let listeSpecialites = [];
  let wrapper = document.querySelector("#listeSpecialitesWrapper")

  if (wrapper) {
    wrapper.remove();
  }

  listeHospitalisations.forEach(hospitalisation => {
    if (hospitalisation.getEtablissement() === code && !listeSpecialites.find(e => e === hospitalisation.getSpecialite())) {
      listeSpecialites.push(hospitalisation.getSpecialite());
    }
  });

  if (!listeSpecialites.length) {
    zoneMessage().innerHTML = infobox(`Aucune spécilialité pour l'établissement ${code}`, "erreur");
    return;
  }

  wrapper = document.createElement("div");
  wrapper.id = "listeSpecialitesWrapper";
  wrapper.innerHTML = `<span class="small"><strong class="warning">ATTENTION</strong> Seules les spécialitées présentes dans nos dossier pour cet établissement sont disponibles</span>`;

  const select = document.createElement("select");
  select.id = "listeSpecialites";
  select.addEventListener("change", () => afficherHospitalisationParSpecialite(code, select.value));
  const optionBase = new Option("Choisir une spécialitée");
  select.appendChild(optionBase);

  listeSpecialites.forEach((specialite) => {
    const nouvelOption = new Option(
      specialite,
      specialite
    );
    select.appendChild(nouvelOption);
  });
  wrapper.appendChild(select);

  zoneMessage().innerHTML = infobox(`Selectionnez une spécialitée pour l'établissement ${code}`);
  zoneContenu().appendChild(wrapper);
}

// Fonction pour afficher les hospitalisations pour une spécialité donnée dans un établissement spécifique.
const afficherHospitalisationParSpecialite = (code, specialite) => {
  const etablissement = listeEtablissements.find(etab => etab.getCode() === code.toString());
  const hospitalisation = listeHospitalisations.filter(hosp => hosp.getEtablissement() === code.toString() && hosp.getSpecialite() === specialite);
  
  if (!hospitalisation.length || !etablissement) {
    zoneMessage().innerHTML = infobox(`Aucune hospitalisation pour l'établissement ${code} et la spécialitée ${specialite}`, "erreur");
  } else {
    const affichageEtablissement = creerAffichage([etablissement], tableauEtablissements);
    const affichageHospitalisation = creerAffichage(hospitalisation, tableauHospitalisation);
    zoneMessage().innerHTML = infobox(`Vous avez ${hospitalisation.length} hospitalisation${hospitalisation.length > 1 ? "s" : ""} pour la spécialitée ${specialite} à l'établissement ${code}`);
    afficherTableau([affichageEtablissement.table, affichageHospitalisation.table])
    afficherBouton();
  }
}

// Fonction pour afficher les hospitalisations pour un patient sélectionné
const listerHospitalisationParPatient = (dossier) => {
  const patient = listePatients.find(patient => patient.getDossier() === dossier);
  const hospitalisation = listeHospitalisations.filter(hosp => hosp.getDossier() === dossier);

  if (!patient || !hospitalisation.length) {
    zoneMessage().innerHTML = infobox(`Aucune hospitalisation pour le patient ${dossier}`, "erreur");
  } else {
    const affichagePatient = creerAffichage([patient], tableauPatients);
    const affichageHospitalisation = creerAffichage(hospitalisation, tableauHospitalisation);
    zoneMessage().innerHTML = affichagePatient.message + affichageHospitalisation.message;
    afficherTableau([affichagePatient.table, affichageHospitalisation.table])
    afficherBouton();
  }
}

// Fonction pour caché le contenu affiché
const cacherContenu = () => {
  zoneContenu().classList.toggle("cacher");
  zoneMessage().classList.toggle("cacher");
  boutonOeil().classList.toggle("cacher");
};

// Fonction pour afficher une info-box avec un message
const infobox = (message, type) => {
  return `<span class="infobox ${type}">${message}</span>`;
}

// Fonction pour générer un tableau HTML à partir des données
const creerAffichage = (elements, {
  titres,
  type
}) => {
  if (!elements || !elements.length) {
    return {
      message: `Aucun élément trouvé`,
      affichage: ""
    };
  }

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const trHead = document.createElement('tr');
  const tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  thead.appendChild(trHead);
  trHead.innerHTML = titres.map((titre) => `<th>${titre}</th>`).join('');
  tbody.innerHTML = elements.map((element) => element.afficher()).join('');

  const plusieurs = elements.length > 1;

  // Retourne deux objets contenant le message et l'affichage
  return {
    message: infobox(`${elements.length} ${type}${plusieurs ? "s" : ""} trouvé${plusieurs ? "s" : ""}`),
    table: table
  };
};

// Fonction qui vide le contenu de la zone contenu et place le table comme élément enfant
const afficherTableau = (tables) => {
  zoneContenu().innerHTML = "";
  tables.forEach((table)=> {
    zoneContenu().appendChild(table);
  })
}

// Fonction pour vider le contenu affiché
const vider = () => {
  zoneMessage().innerHTML = "";
  zoneContenu().innerHTML = "";
}

// Fonction pour afficher ou non le bouton qui gère l'affichage des tables
const afficherBouton = () => {
  if(document.querySelector("table")) {
    boutonOeil().classList.remove("non-visible");
  } else {
    boutonOeil().classList.add("non-visible");
  }
}

// Fonction sur les clicks de la page
window.onclick = function () {
  afficherBouton();
}