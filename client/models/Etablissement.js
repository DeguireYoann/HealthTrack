class Etablissement {
    // Attributs privés, donc besoin de gets et sets
    #code;
    #nom;
    #adresse;
    #codePostale;
    #telephone;
    
    constructor({
        code,
        nom,
        adresse,
        codePostale,
        telephone 
    }){
        this.#code = code;
        this.#nom = nom;
        this.#adresse = adresse;
        this.#codePostale = codePostale;
        this.#telephone = telephone;
    }
    // Getters
    getCode(){
        return this.#code;
    }
    getNom(){
        return this.#nom;
    }
    getAdresse(){
        return this.#adresse;
    }
    getCodePostale(){
        return this.#codePostale;
    }
    getTelephone(){
        return this.#telephone;
    }
    
    // Setters
    setCode(code){
        this.#code = code;
    }
    setNom(nom){
        this.#nom = nom;
    }
    setAdresse(adresse){
        this.#adresse = adresse;
    }
    setCodePostale(codePostale){
        this.#codePostale = codePostale;
    }
    setTelephone(telephone){
        this.#telephone = telephone;
    }
    

    afficher(){
       return `<tr>
                <td>${this.#code}</td>
                <td>${this.#nom}</td>
                <td>${this.#adresse}</td>
                <td>${this.#codePostale}</td>
                <td>${this.#telephone}</td>
                </tr>
               `;
    } 
}
