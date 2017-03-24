var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
];


var tbody = document.querySelector('table tbody');


document.querySelector('.form').addEventListener('submit', function(event) {

   var tr = document.createElement('tr');

  campos.forEach(function(element) {
       var td = document.createElement('td');
       console.log(element.value)
       td.textContent = element.value;
       tr.appendChild(td);
  });

     var tdVolume = document.createElement('td');
     tdVolume.textContent = campos[1].value * campos[2].value;

     tr.appendChild(tdVolume);
   
     tbody.appendChild(tr);
     event.preventDefault();
   
});

/**
 */
function limparDados() {
    campos[0].value = '';
    campos[1].value = '';
    campos[2].value = 0;
    document.querySelector('#data').focus();

}

 
 