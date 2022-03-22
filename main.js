let numero = parseInt(prompt('Ingresa un numero que se encuentre entre el 1 y el 20 e imprime todos los numeros pares e impares desde el 1 hasta ese numero ingresado.'));

  if (numero <= 0 || isNaN(numero) || numero > 20) {
    numero = prompt(`"${numero}" no es un numero valido.
      ingresa un numero valido`);
  } else {
    for(i=1; i <= numero; i++){
      if(i%2 == 0){
        document.write(`${i} es un numero par <br>`);
  
      } else {
        document.write(`${i} es un numero impar <br>`);
      }
  }
  }
