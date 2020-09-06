const produitSell = "teddies";
const APIURL = "http://localhost:3000/api/" + produitSell + "/";

let idProduit = "";

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

let contact;
let products = [];

function getProducts() {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(JSON.parse(this.responseText));
        console.log("Administration : connection ok");
        // Supprimer le message d'erreur si l'appel est réussi
        error = document.getElementById("error");
        // Supprimer le message d'erreur s'il existe
        if (error) {
          error.remove();
        }
      } else {
        console.log("Administration : ERROR connection API");
      }
    };
    request.open("GET", APIURL + idProduit);
    request.send();
  });
}

async function allProductsList() {
  const produits = await getProducts();
  // Créer la section accueillant la liste des produits
  let listProduct = document.createElement("section");
  listProduct.setAttribute("id", "list-articles");
  // Ajouter la section dans le HTML
  let everybody = document.getElementById("everybody");
  everybody.appendChild(listProduct);
  // Pour chaque produit de l'API créer l'encadré HTML du produit
  produits.forEach((produit) => {
    // Créer le HTML
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
    // Hiérarchiser les éléments créés
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
  // "http://localhost:3000/api/furniture/id"
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
    console.log("Administration : le produit a été ajouté au panier");
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
