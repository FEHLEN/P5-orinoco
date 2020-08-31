
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  fetch("http://localhost:3000/api/teddies/5be9c8541c9d440000665243", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));




/*ajout du résultat dans la page*/






