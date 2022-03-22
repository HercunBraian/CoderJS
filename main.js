
let numero = parseInt(prompt('Ingresa un numero e imprime todos los numeros pares e impares desde el 1 hasta ese numero ingresado.'));

for(i=1; i <= numero; i++){
    if(i%2 == 0){
      document.write(`${i} es un numero par <br>`);

    } else {
      document.write(`${i} es un numero impar <br>`);
    }
}

