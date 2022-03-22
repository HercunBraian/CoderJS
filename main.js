
let numero = parseInt(prompt('Introduce un numero'));

for(i=1; i <= numero; i++){
    if(i%2 == 0){
      document.write(`${i} es un numero par <br>`);

    } else {
      document.write(`${i} es un numero impar <br>`);
    }
}

