class Patient {
    // Attributs privés, donc besoin de gets et sets
    #dossier;
    #nom;
    #prenom;
    #naissance;
    #sexe;
    
    constructor({
        dossier,
        nom,
        prenom,
        naissance,
        sexe
    }){
        this.#dossier = dossier;
        this.#nom = nom;
        this.#prenom = prenom;
        this.#naissance = naissance;
        this.#sexe = sexe;
    }

    // Getters
    getDossier(){
        return this.#dossier;
    }
    getNom(){
        return this.#nom;
    }
    getPrenom(){
        return this.#prenom;
    }
    getNaissance(){
        return this.#naissance;
    }
    getSexe(){
        return this.#sexe;
    }
    
    // Setters
    setDossier(dossier){
        this.#dossier = dossier;
    }
    setNom(nom){
        this.#nom = nom;
    }
    setPrenom(prenom){
        this.#prenom = prenom;
    }
    setNaissance(naissance){
        this.#naissance = naissance;
    }
    setSexe(sexe){
        this.#sexe = sexe;
    }
    

    afficher(){
       return `<tr>
                <td>${this.#dossier}</td>
                <td>${this.#nom}</td>
                <td>${this.#prenom}</td>
                <td>${this.#naissance}</td>
                <td>${this.#sexe}</td>
                </tr>
               `;
    } 
}
