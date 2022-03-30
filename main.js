class Computadoras{
  constructor(nombre, marca, espacio, ram){
    this.nombre = nombre;
    this.marca = marca;
    this.espacio = espacio;
    this.ram = ram;
  }

  mostrarInfo(){
    return `
    Nombre: <b>${this.nombre}</b></br>
    Procesador:  <b>${this.marca}</b></br>
    Espacio en Disco:  <b>${this.espacio}</b></br>
    Ram:  <b>${this.ram}</b></br>
    `
  }
}

pc1 = new Computadoras("PC1", "AMD Ryzen 5 5600G", "1TB", "32GB");
pc2 = new Computadoras("PC2", "Intel Core i3-10100F", "500GB", "8GB");
pc3 = new Computadoras("PC3", "AMD Ryzen 7 5700G", "2TB", "16GB");
pc4 = new Computadoras("PC4", "Intel Core i5-10400", "250GB", "8GB");
pc5 = new Computadoras("PC5", "AMD Athlon 3000G", "1TB", "16GB");
pc6 = new Computadoras("PC6", "AMD Ryzen 7 5800X", "1TB", "32GB");

class Celulares{
  constructor(marca, peso, tamano, ram){
    this.marca = marca;
    this.peso = peso;
    this.tamano = tamano;
    this.ram = ram;
  }

  mostrarInfo(){
    return `
    Marca:  <b>${this.marca}</b></br>
    Peso:  <b>${this.peso}</b></br>
    Tamaño:  <b>${this.tamano}</b></br>
    Ram:  <b>${this.ram}</b></br>
    `
  }
}

  celular1 = new Celulares("Samsung", "138g", "4,7'", "3GB");
  celular2 = new Celulares("Motorola", "125G", "4,5'", "2GB");
  celular3 = new Celulares("Iphone", "145G", "5'", "2GB");
  celular4 = new Celulares("Sony", "140G", "4.7'", "1GB");


let compra = prompt("Presionar 1) Si desea comprar Celulares. Presionar 2) Si desea comprar Computadoras");

if(compra == 1){
  document.write(`
    ${celular1.mostrarInfo()}</br>
    ${celular2.mostrarInfo()}</br>
    ${celular3.mostrarInfo()}</br>
    ${celular4.mostrarInfo()}</br>
`);
  var compraCelular = prompt("Ingresar Marca del celular que desea comprar");

  if(compraCelular == "Samsung" || compraCelular == "samsung" || compraCelular == "SAMSUNG"){
    document.write(`
      ${celular1.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar el celular Samsung");
  
  } else if (compraCelular == "Motorola" || compraCelular == "motorola" || compraCelular == "MOTOROLA") {
    document.write(`
      ${celular2.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar el celular Motorola");
  
  } else if (compraCelular == "Iphone" || compraCelular == "iphone" || compraCelular == "IPHONE") {
    document.write(`
      ${celular3.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar el celular Iphone");
  
  } else if (compraCelular == "Sony" || compraCelular == "sony" || compraCelular == "SONY") {
    document.write(`
      ${celular4.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar el celular Sony");
  } else {
    alert("El nombre del producto ingresado no es el correcto");
  }

} else if (compra == 2) {
  document.write(`
  ${pc1.mostrarInfo()}</br>
  ${pc2.mostrarInfo()}</br>
  ${pc3.mostrarInfo()}</br>
  ${pc4.mostrarInfo()}</br>

`);
  var compraPc = prompt("Ingresar nombre de la PC que desea comprar");

  if(compraPc == "PC1" || compraPc == "pc1"){
    document.write(`
      ${pc1.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar la PC1");
  } else if(compraPc == "PC2" || compraPc == "pc2"){
    document.write(`
      ${pc2.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar la PC2");
  } else if(compraPc == "PC3" || compraPc == "pc3"){
    document.write(`
      ${pc3.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar la PC3");
  }
  else if(compraPc == "PC4" || compraPc == "pc4"){
    document.write(`
      ${pc4.mostrarInfo()}</br>
  `);
    alert("Felicitaciones por comprar la PC4");
  } else {
    alert("El nombre ingresado no es correcto");
  }
}