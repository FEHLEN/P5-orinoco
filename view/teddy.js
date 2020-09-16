const produitSell = "teddies";
const APIURL = "http://localhost:3000/api/" + produitSell + "/";

let idProduit = "";

if (localStorage.getItem("userBasket")) {
  console.log(
    "Contrôle : le panier de l'utilisateur existe déjà dans le localStorage"
  );
} else {
  console.log(
    "Contrôle : le panier n'existe pas, il va être créer et envoyer dans le localStorage"
  );
  let panierInit = [];
  localStorage.setItem("userBasket", JSON.stringify(panierInit));
}

let userBasket = JSON.parse(localStorage.getItem("userBasket"));

let contact;
let products = [];

function getProducts() {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText));
        console.log("Contrôle : connection ok");
        // Supprimer le message d'erreur si l'appel est réussi
        error = document.getElementById("error");
        // Supprimer le message d'erreur s'il existe
        if (error) {
          error.remove();
        }
      } else {
        console.log("Contrôle : ERREUR connection API");
      }
    };
    request.open("GET", APIURL + idProduit);
    request.send();
  });
}

async function allProductsList() {
  const produits = await getProducts();
  console.log(produits);
  // Créer la section accueillant la liste des produits
  let listProduct = document.createElement("section");
  listProduct.setAttribute("id", "list-articles");
  // Ajouter la section dans le HTML
  let everybody = document.getElementById("everybody");
  everybody.appendChild(listProduct);
  // Pour chaque produit de l'API créer lA STRUCTURE HTML du produit
  produits.forEach((produit) => {
    let bloc = document.createElement("article");
    let blocPhoto = document.createElement("div");
    let imageArticle = document.createElement("img");
    let blocDescription = document.createElement("div");
    let blocHaut = document.createElement("div");
    let nomArticle = document.createElement("h2");
    let description = document.createElement("p");
    let blocDroit = document.createElement("div");
    let prix = document.createElement("p");
    let lienArticle = document.createElement("a");
    // Attribuer les classes
    bloc.setAttribute("class", "article");
    blocPhoto.setAttribute("class", "bloc_photo");
    imageArticle.setAttribute("class", "img_article");
    blocDescription.setAttribute("class", "bloc_description");
    blocHaut.setAttribute("class", "bloc_Haut");
    nomArticle.setAttribute("class", "name_article");
    description.setAttribute("class", "description_article");
    blocDroit.setAttribute("class", "bloc_droit");
    prix.setAttribute("class", "price_article");
    lienArticle.setAttribute("class", "selection_article");
    lienArticle.setAttribute("href", "produit.html?id=" + produit._id);
    // Hiérarchiser parent/enfant
    listProduct.appendChild(bloc);
    bloc.appendChild(blocPhoto);
    blocPhoto.appendChild(imageArticle);
    bloc.appendChild(blocDescription);
    blocDescription.appendChild(blocHaut);
    blocHaut.appendChild(nomArticle);
    blocHaut.appendChild(description);
    blocDescription.appendChild(blocDroit);
    blocDroit.appendChild(prix);
    blocDroit.appendChild(lienArticle);
    // Remplir le contenu des balises
    imageArticle.src = produit.imageUrl;
    nomArticle.textContent = produit.name;
    description.textContent = produit.description;
    prix.textContent = produit.price / 100 + ",00€";
    lienArticle.textContent = "Découvrir";
  });
}

async function productDetails() {
  // Collecter l'URL après le ?id= pour le récupérer uniquement sur l'API
  idProduit = location.search.substring(4);
  // "http://localhost:3000/api/teddies/_id"
  const produitSelected = await getProducts();
    console.log(produitSelected._id);
    document
      .getElementById("img_product")
      .setAttribute("src", produitSelected.imageUrl);
    document.getElementById("name_product").innerHTML = produitSelected.name;
    document.getElementById("description_product").innerHTML =
      produitSelected.description;
    document.getElementById("price_product").innerHTML =
      produitSelected.price / 100 + ",00€";
    console.log(produitSelected.colors); 
  var select = document.getElementById("colorsList");
  var length = select.options.length;
  for (i = length-1; i >= 0; i--) {
        select.options[i] = null;
  }
  //sourceshttps://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Boucles_et_itERAtion 
  for(var i in produitSelected.colors){
      // Creer un element OPTION
      var option = document.createElement('option');
      option.innerHTML = produitSelected.colors[i];
      // + définition valeur etc....
      document.getElementById("colorsList").appendChild(option);}
}
 
function addProduct() {
  // Le produit est mis dans le panier au clic
  let inputBuy = document.getElementById("add_product");
  inputBuy.addEventListener("click", async function () {
    const produits = await getProducts();
    // Récupérer le panier dans le localStorage et ajouter le produit dans le panier avant renvoi dans le localStorage
    userBasket.push(produits);
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    console.log("Le produit a été ajouté au panier");
    // Notifier l'utilisateur de l'ajout au panier
    setTimeout(function () {
      document.getElementById("add_case").textContent =
        "Vous avez ajouté ce produit à votre panier !";
    }, 700);
    function add_done_remove() {
      document.getElementById("add_case").textContent = "";
    }
    window.setTimeout(add_done_remove, 2000);
  });
}

function commandeProduct() {
  // Vérifier si un produit est dans le panier
  if (JSON.parse(localStorage.getItem("userBasket")).length > 0) {
    // S'il n'est pas vide supprimer le message et créer le tableau récapitulatif
    document.getElementById("empty_basket").remove();

    // Structure du tableau
    let facture = document.createElement("table");
    let ligneTableau = document.createElement("tr");
    let colonneNom = document.createElement("th");
    let colonnePrixUnitaire = document.createElement("th");

    let ligneTotal = document.createElement("tr");
    let colonneRefTotal = document.createElement("th");
    let colonnePrixPayer = document.createElement("td");
    

    // Placer la structure dans la page et le contenu des entêtes
    let factureSection = document.getElementById("basket-resume");
    factureSection.appendChild(facture);
    facture.appendChild(ligneTableau);
    ligneTableau.appendChild(colonneNom);
    colonneNom.textContent = "Nom du produit";
    ligneTableau.appendChild(colonnePrixUnitaire);
    colonnePrixUnitaire.textContent = "Prix du produit";
    let i = 0;
    //dans le tableau produit, incrédentation de chaque ligne de produit avec le nom, le prix
    //et la possibilité de suppression
    JSON.parse(localStorage.getItem("userBasket")).forEach((produit) => {
      // Créer la ligne
      let ligneProduit = document.createElement("tr");
      let nomProduit = document.createElement("td");
      let prixUnitProduit = document.createElement("td");
      let removeProduit = document.createElement("input");
      // Attribuer les classes
      ligneProduit.setAttribute("id", "produit" + i);
      removeProduit.setAttribute("id", "remove" + i);
      removeProduit.setAttribute("class","bt-supprimer");
      removeProduit.addEventListener("click", removeProduct.bind(i));
      i++;
      //sources https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Function/bind//

      // Insertion dans le HTML
      facture.appendChild(ligneProduit);
      ligneProduit.appendChild(nomProduit);
      ligneProduit.appendChild(prixUnitProduit);
      ligneProduit.appendChild(removeProduit);
      // Remplir le contenu des balises
      nomProduit.innerHTML = produit.name;
      prixUnitProduit.textContent = produit.price / 100 + " €";
      removeProduit.type ="button";
      removeProduit.value = "supprimer";
       // Dernière ligne du tableau : Total
       facture.appendChild(ligneTotal);
       ligneTotal.appendChild(colonneRefTotal);
       colonneRefTotal.textContent = "Total à payer";
       ligneTotal.appendChild(colonnePrixPayer);
       colonnePrixPayer.setAttribute("id", "total_sum");
    });
     // Calcul du montant total
     let totalAPayer = 0;
     JSON.parse(localStorage.getItem("userBasket")).forEach((produit) => {
       totalAPayer += produit.price / 100;
     });
     // Affichage du prix total à payer
     console.log(`Total à payer : ${totalAPayer}€`);
     document.getElementById("total_sum").textContent = `${totalAPayer},00€`;
  }
}
//fonction suppression de ligne
function removeProduct(i) {
  console.log(`Contrôle : Enlever le produit à l'index ${i}`);
  // Recupérer le tableau
  userBasket.splice(i, 1);
  console.log(`Contrôle : ${userBasket}`);
  // Vider le localstorage
  localStorage.clear();
  console.log(`Contrôle : localStorage vidé`);
  // Mettre à jour le localStorage avec le nouveau panier
  localStorage.setItem("userBasket", JSON.stringify(userBasket));
  console.log(`Contrôle : localStorage mis à jour`);
  // Réactualiser la page avec le nouveau montant du panier/ou panier vide
  window.location.reload();
}

function checkBasket() {
  // Vérifier que le panier contient l'un des produits
  let etatPanier = JSON.parse(localStorage.getItem("userBasket"));
  if (etatPanier.length < 1 || etatPanier == null) {
    alert("Votre panier est vide !");
    return false;
  } else {
    // Pour chaque produit dans le panier envoyé l'identifiant dans products
    JSON.parse(localStorage.getItem("userBasket")).forEach((produit) => {
      products.push(produit._id);
    });
    return true;
  }
}
//traitement du formulaire

function checkInput() {
  // Regex
  let checkString = /^[A-Z]{1}[a-z]/;
  let checkMail = /.+@.+\..+/;
  let checkAdresse = /^[^@&"()!_$*€£`%+=\/;?#]+$/;

  // Chercher les inputs
  let nom = document.getElementById("firstName").value;
  let prenom = document.getElementById("lastName").value;
  let adresse = document.getElementById("address").value;
  let ville = document.getElementById("city").value;
  let email = document.getElementById("email").value;
// Tester les inputs de l'utilisateur
  if (checkString.test(nom) == false) {
  alert("Votre nom doit commencer par une majuscule suivis de minuscules");
  return false;
  } else if (checkString.test(prenom) == false) {
    alert("Votre prénom doit commencer par une majuscule suivie de minuscules");
    return false;
  } else if (checkMail.test(email) == false) {
    alert("Votre email doit être au format xxx@yyy.zzz");
    return false;
  } else if (checkAdresse.test(adresse) == false) {
    alert(
    `Votre adresse contient un ou plusieurs des caractères interdits suivants : ` +
      '[^@&"()!_$*€£`%+=/;?#]' +
      " ou n'est pas renseignée."
    );
    return false;
  } else if (checkString.test(ville) == false) {
    alert(
    "Le nom de votre ville doit commencer par une majuscule suivis de minuscules");
    return false;
  } else {
    return true;
  }
}

function validOrder() {
  let validation = document.getElementById("sendPost");
  // Au clic vérification de checkBasket() et checkInput()
  validation.addEventListener("click", function (event) {
    event.preventDefault();
    if (checkBasket() == true && checkInput() == true) {
      // Création de l'objet contact contenant les coordonnées de l'utilisateur
      let contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
      // Création de l'objet à envoyer à l'API
      let objet = {
        contact,
        products,
      };
      let objetRequest = JSON.stringify(objet);
      // Envoi de l'objet
      var request = new XMLHttpRequest();
      request.open("POST", "http://localhost:3000/api/teddies/order");
      request.setRequestHeader("Content-Type", "application/json");
      request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          console.log(this.responseText);
          // Récupération de la réponse du serveur
          localStorage.setItem("order", this.responseText);
          // Redirection vers la page de confirmation
          window.location.href = "commande.html";
        }
      };
      request.send(objetRequest);
    } else {
      console.log("Contrôle : ERREUR");
    }
  });
}

function resultOrder() {
  if (localStorage.getItem("order") != null) {
    // Afficher un message de remerciement pour l'utilisateur
    let order = JSON.parse(localStorage.getItem("order"));
    document.getElementById("firstName").innerHTML = order.contact.firstName;
    document.getElementById("lastName").innerHTML = order.contact.lastName;
    // Calculer le montant total de la commande
    let priceOrder = 0;
    let displayPrice = order.products;
    displayPrice.forEach((element) => {
      priceOrder += element.price / 100;
    });
    document.getElementById("priceOrder").innerHTML = priceOrder;
    document.getElementById("orderId").innerHTML = order.orderId;
    // Remettre à zero le localStorage, products, contact et redirection vers la page d'accueil
    setTimeout(function () {
      localStorage.clear();
      let products = [];
      let contact;
      window.location = "./index.html";
    }, 12000);

  } else {
    // Retirer le message d'ordre de commande si le localStorage ne contient pas l'item order
    let order = document.getElementById("order_result");
    order.remove();
    // Afficher un message d'erreur et rediriger l'utilisateur vers la page d'accueil
    let resultCommand = document.getElementById("confirmation_commande");
    let resultCommandError = document.createElement("div");
    resultCommandError.setAttribute("id", "order_result_error");
    let messageError = document.createElement("p");
    messageError.innerHTML =
      "Aucune commande passée, il y a une erreur!";
    resultCommand.appendChild(resultCommandError);
    resultCommandError.appendChild(messageError);
    setTimeout(function () {
      window.location = "./index.html";
    }, 4500);
  }
}

