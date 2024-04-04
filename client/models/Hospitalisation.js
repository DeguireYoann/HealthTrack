class Hospitalisation {
    // Attributs privés, donc besoin de gets et sets
    #etablissement;
    #dossier;
    #admission;
    #sortie;
    #specialite;
    
    constructor({
        etablissement,
        dossier,
        admission,
        sortie,
        specialite
    }){
        this.#etablissement = etablissement;
        this.#dossier = dossier;
        this.#admission = admission;
        this.#sortie = sortie;
        this.#specialite = specialite;
    }
    // Getters
    getEtablissement(){
        return this.#etablissement;
    }
    getDossier(){
        return this.#dossier;
    }
    getAdmission(){
        return this.#admission;
    }
    getSortie(){
        return this.#sortie;
    }
    getSpecialite(){
        return this.#specialite;
    }
    
    // Setters
    setEtablissement(etablissement){
        this.#etablissement = etablissement;
    }
    setDossier(dossier){
        this.#dossier = dossier;
    }
    setAdmission(admission){
        this.#admission = admission;
    }
    setSortie(sortie){
        this.#sortie = sortie;
    }
    setSpecialite(specialite){
        this.#specialite = specialite;
    }
    

    afficher(){
       return `<tr>
                <td>${this.#etablissement}</td>
                <td>${this.#dossier}</td>
                <td>${this.#admission}</td>
                <td>${this.#sortie}</td>
                <td>${this.#specialite}</td>
                </tr>
               `;
    } 
}
