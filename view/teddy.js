
// method get generique pour demander des données
//************************************************ */
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    console.log('ajaxGet');
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(JSON.parse(req.responseText));
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
  }
  
  //methode post generique pour transmettre des données
function ajaxPost(url, options, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
  
    var postOptions;
    if (typeof options === 'objet'){
      // envoyer du json {plouf:lolo, name : ted ....}
      req.setRequestHeader ('content-type','application/json');
      postOptions = JSON.stringify(options);
  
    }else if (typeof options === "array"){  //renvoi sous forme de tableau
  
    }else{
      postOptions = null;
    }
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(postOptions);
}


//*********************
// Fonctions qui permettre d'afficher les pages l'une après l'autre
//*********************


function switchView(view){
    switch(view){
        case "list":
            document.getElementById('Produit').style.display = "none";
            document.getElementById('Panier').style.display = "none";
            document.getElementById('Liste').style.display = "block";
            document.getElementById('Confirmation').style.display = "none";

            break;
        case "produit":
            document.getElementById('Produit').style.display = "block";
            document.getElementById('Panier').style.display = "none";
            document.getElementById('Liste').style.display = "none";
            document.getElementById('Confirmation').style.display = "none";
            break;
        case "commande":
            document.getElementById('Produit').style.display = "none";
            document.getElementById('Panier').style.display = "block";
            document.getElementById('Liste').style.display = "none";
            document.getElementById('Confirmation').style.display = "none";
            break;
        case "confirmation":
            document.getElementById('Produit').style.display = "none";
            document.getElementById('Panier').style.display = "none";
            document.getElementById('Liste').style.display = "none";
            document.getElementById('Confirmation').style.display = "block";
            break;

    }
}


if (localStorage.getItem("userPanier")) {
    console.log(
      "Administration : le panier de l'utilisateur existe déjà dans le localStorage"
    );
} else {
    console.log(
      "Administration : Le panier n'existe pas, il va être créer et envoyer dans le localStorage"
    );
    let panierInit = [];
    localStorage.setItem("userPanier", JSON.stringify(panierInit));
}
  

let idProduit ="";
let commande = [];
 
/*modèle de la structure pour connaître les keys et value
[
    {"colors": ["Tan","Chocolate","Black","White"],"_id": "5be9c8541c9d440000665243","name": "Norbert","price": 2900,"imageUrl": "http://localhost:3000/images/teddy_1.jpg","description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {"colors": ["Pale brown","Dark brown","White"],"_id": "5beaa8bf1c9d440000a57d94","name": "Arnold","price": 3900,"imageUrl": "http://localhost:3000/images/teddy_2.jpg","description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {"colors": ["Brown"],"_id": "5beaaa8f1c9d440000a57d95","name": "Lenny and Carl","price": 5900,"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","imageUrl": "http://localhost:3000/images/teddy_3.jpg"},
    {"colors": ["Brown","Blue","Pink"],"_id": "5beaabe91c9d440000a57d96","name": "Gustav","price": 4500,"imageUrl": "http://localhost:3000/images/teddy_4.jpg","description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},
    {"colors": ["Beige","Tan","Chocolate"],"_id": "5beaacd41c9d440000a57d97","name": "Garfunkel","price": 5500,"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","imageUrl": "http://localhost:3000/images/teddy_5.jpg"}
]
*/


//********************************
// Constitution de la page accueil
//********************************

function allTeddy(response){
   
    console.log(response);
    switchView("list");
    let listProduct = document.createElement("section");
    listProduct.setAttribute("id", "list-articles");
    let main = document.getElementById("Liste");
    main.appendChild(listProduct);
    response.forEach((produit) => {
        // Créer le contenant HTML
        let bloc = document.createElement("article");
        let blocPhoto = document.createElement("div");
        let imageArticle = document.createElement("img");
        let blocDescription = document.createElement("div");
        let blocHaut = document.createElement("div");
        let nomArticle = document.createElement("h2");
        let description = document.createElement("p");
        let blocBas = document.createElement("div");
        let prix = document.createElement("p");
        let lienArticle = document.createElement("a");
        // Attribuer les classes
        bloc.setAttribute("class", "article");
        blocPhoto.setAttribute("class", "bloc_photo");
        imageArticle.setAttribute("class", "img_article");
        blocDescription.setAttribute("class", "bloc_description");
        blocHaut.setAttribute("class", "bloc_haut");
        nomArticle.setAttribute("class", "name_article");
        description.setAttribute("class", "description_article");
        blocBas.setAttribute("class", "bloc_bas");
        prix.setAttribute("class", "price_article");
        lienArticle.setAttribute("class", "selection_article");
        lienArticle.setAttribute("button" + produit._id);
        // Ordre des éléments créés
        listProduct.appendChild(bloc);
        bloc.appendChild(blocPhoto);
        blocPhoto.appendChild(imageArticle);
        bloc.appendChild(blocDescription);
        blocDescription.appendChild(blocHaut);
        blocHaut.appendChild(nomArticle);
        blocHaut.appendChild(description);
        blocDescription.appendChild(blocBas);
        blocBas.appendChild(prix);
        blocBas.appendChild(lienArticle);
        // Remplir le contenu des balises
        imageArticle.src = produit.imageUrl;
        nomArticle.textContent = produit.name;
        description.textContent = produit.description;
        prix.textContent = produit.price / 100 + ",00€";
        lienArticle.textContent = "Découvrir";   

})
}
ajaxGet("http://localhost:3000/api/teddies/"+idProduit, allTeddy);

btn.addEventListener('click',function oneTeddy(produitSelect){

    console.log("ourson choisi"+produitSelect.name);})

/*
    switchView("produit");
    document.getElementById("img_product")
    document.setAttribute("src", produitSelect.imageUrl);
    document.getElementById("name_product").innerHTML = produitSelect.name;
    document.getElementById("description_product").innerHTML =
    produitSelect.description;
    document.getElementById("price_product").innerHTML =
    produitSelect.price / 100 + ",00€";

    var select = document.getElementById('TeddyColors');
    var length = select.options.length;
    for (i = length-1; i >= 0; i--) {
    select.options[i] = null;
    }
    for(var i in response.colors){
        // Creer un element OPTION
        var option = document.createElement('option');
        option.innerText = produitSelect.colors[i];
        document.getElementById('TeddyColors').appendChild(option);
    }

});  

ajaxGet("http://localhost:3000/api/teddies/"+idProduit, oneTeddy);
 

//***************************************
// Fonction interraction avec le visiteur
//***************************************




//constitution de la page produit

/*
// mettre le menu deroulant à zero pour supprimer les enfants
    var select = document.getElementById('TeddyColors');
        var length = select.options.length;
        for (i = length-1; i >= 0; i--) {
        select.options[i] = null;
        }
    //boucle sur les couleurs car pas le même nombre sur chaque ours
    for(var i in response.colors){
        // Creer un element OPTION
        var option = document.createElement('option');
        option.innerText = response.colors[i];
        document.getElementById('TeddyColors').appendChild(option);
    }



//**********A faire un bouton commander si oui faire un bouton quantité et mettre dans le tableau panier
//**********si non retour à la page list afficher la page liste et cacher les autres

/*
//Stockage des articles commandés
function addToCart(id, name, quantité,prix){
    var teddyCart = localStorage.getItem('teddyCart');

    teddyCart.push()


    localStorage.setItem('teddyCart', teddyCart);
}

//A faire la page panier en HTML
/*
    var total = quantite + response.prix;
    console.log(total);
    //tableau

    
    var teddyCartElt=document.getElementById('Panier');
    teddyCart.forEach(function(tableau){
        //créer une ligne de tableau pour chaque article
        switchView("commande");
        var ligneElt = document.createElement("tr");
        ligneElt.innerHTML = "<td>"+ tableau.id + "</td>" + "<td>" + tableau.name + "</td>" + "<td>" + tableau.quantité + "</td>";
        teddyCartElt.appendChild(ligneElt);
         }); 
         document.getElementById('commande').innerHTML = total;

//A faire le formulaire
*/



    
