
const APIURL = "http://localhost:3000/api/teddies/";
let idProduit ="";
let commande = [];
let contact;
if (localStorage.getItem("userBasket")) {
    console.log(
      "Administration : le panier de l'utilisateur existe déjà dans le localStorage"
    );
  } else {
    console.log(
      "Administration : Le panier n'existe pas, il va être créer et envoyer dans le localStorage"
    );
    let panierInit = [];
    localStorage.setItem("userBasket", JSON.stringify(panierInit));
  }
  
  let userBasket = JSON.parse(localStorage.getItem("userBasket"));

function requeteAll() {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          resolve(JSON.parse(this.responseText));
          console.log("Connection faite");
          // Supprimer le message d'erreur si l'appel est réussi
          error = document.getElementById("erreur");
          // Supprimer le message d'erreur s'il existe
          if (error) {
            error.remove();
          }
        } else {
          console.log("ERREUR à la connection API");
        }
      };
      request.open("GET", APIURL + idProduit);
      request.send();
    });
}


async function allProduct(){
    const response = await requeteAll();
    console.log(response);
    //Placer la structure
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
        lienArticle.setAttribute("href", "produit.html?id=" , + produit._id);
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
        lienArticle.textContent = "Détails";   
    })
}
//*******************************
//Constitution de la page produit
//*******************************
function oneProduit(){
    idProduit = location.search.substring(4); //recherche quatrième caratère après le ?
    const produitSelect = await requeteAll();
    console.log=(produitSelect_id)
    //remplir les contenants
    document.getElementById("img_produit")
    document.setAttribute("src", produitSelect.imageUrl);
    document.getElementById("nom_produit").innerHTML = produitSelect.name;
    document.getElementById("description_produit").innerHTML =
    produitSelect.description;
    document.getElementById("prix_produit").innerHTML =
    produitSelect.price / 100 + ",00€";
    //liste option pour les couleurs
    produitSelect.varnish.forEach((couleurs) => {
    let optionProduit = document.createElement("option");
    document
      .getElementById("option_selection")
      .appendChild(optionProduit).innerHTML = couleurs;
    });

};  
//***************************************
// Fonction interraction avec le visiteur
//***************************************
function addProduit() {
    //Au clic le produit est mis dans le panier
    let inputBuy = document.getElementById("add_produit");
    inputBuy.addEventListener("click", async function () {
        const commande = await requeteAll();
        userBasket.push(commande);
        localStorage.setItem("userBasket", JSON.stringify(userBasket));
        console.log("Le nouveau produit a été ajouté au panier");
        // Notifier l'utilisateur de l'ajout au panier
        setTimeout(function () {
          document.getElementById("add_done").textContent =
            "Vous avez ajouté ce produit à votre panier !";
        }, 500);
        function add_done_remove() {
          document.getElementById("add_done").textContent = "";
        }
        window.setTimeout(add_done_remove, 2000);
      });
}




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



    
