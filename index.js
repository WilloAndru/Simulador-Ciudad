//-----------------------------------------------------------------------VARIABLES INDISPENSABLES---------------------------------------------------------------------------------//
document.addEventListener('DOMContentLoaded', function() {

const celdas = 100;
const kilosPersonaDia = 0.5;
var poblacionActual = 40;
const porcentajeLogisticaReino = 0.1;
const salarioLogisticaReino = 2;
const porcentajeGuardasReino = 0.1;
const salarioGuardaReino = 3;
var trabajadoresReino = 40 * (porcentajeLogisticaReino + porcentajeGuardasReino);
var trabajadoresActual = trabajadoresReino;
var desempleadosActual = poblacionActual - trabajadoresActual;
var dineroActual = poblacionActual * 20;
var comidaActual = poblacionActual * 30 * 12 * kilosPersonaDia;
var porcentajeImpuestos = 0.3;
var promedioSalarioMensual = 2.5;
var promedioSalarioReino = (salarioLogisticaReino + salarioGuardaReino) / 2;
var maderaActual = 20;
var rocaActual = 20;

var intervalos = new Set();

var duracionDia = 100;

var mouseX;
var mouseY;

var idTdTarget;
var nums;
var num1;
var num2;
var espacioOcupado = false;

const anemo = "#0fccac";
const geo = "rgb(227, 179, 66)";
const electro = "#a757cb";
const dendro = "#23c18a";
const hydro = "#21e1eb"
const pyro = "#fe925d";
const cryo = "#a0e9e5";
const colorFondo = "#363636";
const colorFondoHover = "#565656";

var diaActualVisual = document.getElementById("diaActual");
var mesActualVisual = document.getElementById("mesActual");
var añoActualVisual = document.getElementById("añoActual");
var poblacionActualVisual = document.getElementById("poblacionActual");
poblacionActualVisual.innerHTML = poblacionActual;
var desempleadosActualVisual = document.getElementById("desempleadosActual")
desempleadosActualVisual.innerHTML = desempleadosActual;
var trabajadoresActualVisual = document.getElementById("trabajadoresActual");
trabajadoresActualVisual.innerHTML = trabajadoresActual;
var dineroActualVisual = document.getElementById("dineroActual");
dineroActualVisual.innerHTML = dineroActual;
var comidaActualVisual = document.getElementById("comidaActual");
comidaActualVisual.innerHTML = comidaActual;
var maderaActualVisual = document.getElementById("maderaActual");
maderaActualVisual.innerHTML = maderaActual;
var rocaActualVisual = document.getElementById("rocaActual");
rocaActualVisual.innerHTML = rocaActual;

//---------------------------------------------------------------------------------MADRE----------------------------------------------------------------------------------------//

var listaObjetos = [];
var listaObjetosSeleccionados = [];

class Madre {
  constructor() {
    this.borde = "1px solid black";
    this.bordeSelect = "1px solid white";
    this.bordeCrear = "1px solid lime";
    this.bordeRemover = "1px solid red";
    this.numero = "";
    this.avisoInterfaz = "";
    this.cantidadInterfaz = "";
    this.styleColor = "white";
  }

  crear() {
    coordenada.style.backgroundColor = clase.color;
    coordenada.style.border = clase.borde;
  }

  crearInterfazTienda()  {
    interfazTiendaObjeto.style.backgroundColor = this.colorTienda;
    interfazTiendaObjetoTitulo.innerHTML = this.nombre;
    interfazTiendaObjetoImagen.src = this.imagenTienda;
    interfazTiendaObjetoImagen.style.width = this.widthTienda;
    interfazTiendaObjetoTexto.innerHTML = `Construir por: ${this.precio} $ <br> 
    Habitantes: + ${this.cantidadInterfaz} <br>
    Personal necesario: ${this.personal} <br>
    Tiempo de construccion: ${this.dias} s<br>
    Materiales necesarios: ${this.cantidad} <img src="${this.imagen}">`;
    interfazTiendaObjeto.addEventListener("click", previsualizarCrear);
  }
}

//-----------------------------------------------------------------------------TDMULTIPLE---------------------------------------------------------------------------------------//

class tdMultiple extends Madre {

  constructor() {
    super ();
    this.borde = "black";
    this.bordeSelect = "white";
    this.bordeCrear = "lime";
    this.bordeRemover = "red";
  }

  mostrarEditar() {
    botonRemoverObjeto.style.display = this.removerObjetoDisplay;
    posicionClase = listaObjetos
    .map((elemento, i) => i)
    .filter(i => i % 2 !== 0 && listaObjetos[i].nombre === clase.nombre && listaObjetos[i].numero === clase.numero);
    listaObjetosSeleccionados = posicionClase.map(i => listaObjetos[i - 1]);
    listaObjetosSeleccionados.forEach(i => {
      i.style.borderColor = clase.bordeSelect;
    })
    botonRemoverObjeto.addEventListener('click', this.remover);
  }

  ocultarEditar() {
    listaObjetosSeleccionados.forEach(i => {
      i.style.borderColor = clase.borde;
    })
    listaObjetosSeleccionados = [];
    botonRemoverObjeto.removeEventListener('click', this.remover);
  }

//------------------------------------------------------------------------TDMULTIPLE CREAR---------------------------------------------------------------------------------------//
  
  mostrarPrevisualizarCrear() {
    listaObjetosSeleccionados = [];
    clase = new Cultivo(numeroCultivo);
    for (let i = 0; i < clase.coordenadas.length; i++) {
      coordenada = document.getElementById(clase.coordenadas[i]);
      listaObjetosSeleccionados.push(coordenada, clase);
      if (listaObjetos.includes(coordenada)) {espacioOcupado = true} 
      else {espacioOcupado = false}
      if (!espacioOcupado) {
        coordenada.style.backgroundColor = clase.color;
        clase.bordeStyles[i].forEach(style => {
        coordenada.style[style] = '1px solid black';
  })}}}
  
  ocultarPrevisualizarCrear() {
    for (let i = 0; i < clase.coordenadas.length; i++) {
      coordenada = document.getElementById(clase.coordenadas[i]);
      if (listaObjetos.includes(coordenada)) {espacioOcupado = true} 
      else {espacioOcupado = false}
      if (!espacioOcupado) {
      coordenada.style.backgroundColor = "";
      clase.bordeStyles[i].forEach(style => {
      coordenada.style[style] = "";
  })}}}

  ponerCrear() {
    if (!espacioOcupado && dineroActual > 0 && desempleadosActual > 0 && maderaActual > 0) {
      listaObjetosSeleccionados.forEach(i => {
        listaObjetos.push(i);
      })
      apagarPrevisualizarCrear();
      numeroCultivo++;
      var diasCrear = clase.dias;
      var diasCosecha = clase.diasCosecha;
      var claseCrear = listaObjetosSeleccionados.filter((elemento, indice) => indice % 2 !== 0);
      var objetoCrear = listaObjetosSeleccionados.filter((elemento, indice) => indice % 2 === 0);
      var coordenadaInicial = objetoCrear[0].getBoundingClientRect();
      objetoCrear.forEach(i => {
        i.style.backgroundColor = claseCrear[0].color;
        i.style.borderColor = claseCrear[0].bordeCrear;
        i.addEventListener('mouseover', mostrarInterfazInformacion);
        i.addEventListener('mouseout', ocultarInterfazInformacion);
      });
      if (claseCrear[0].material === "madera") {
        maderaActual -= claseCrear[0].cantidad;
        maderaActualVisual.innerHTML = maderaActual;
      } if (claseCrear[0].material === "roca") {
        rocaActual -= claseCrear[0].cantidad;
        rocaActualVisual.innerHTML = rocaActual;
      }
      dineroActual -= claseCrear[0].precio;
      dineroActualVisual.innerHTML = dineroActual;
      trabajadoresActual += claseCrear[0].personal;
      trabajadoresActualVisual.innerHTML = trabajadoresActual;
      desempleadosActual = poblacionActual - trabajadoresActual;
      desempleadosActualVisual.innerHTML = desempleadosActual;
      animacionDinero(`- ${claseCrear[0].precio} $`, "red", mouseX, mouseY);
      animacionMaterial("-" + claseCrear[0].cantidad, "white", mouseX, mouseY, claseCrear[0].imagen, 35);

      var nuevoIntervalo = setInterval(() => {
        diasCrear--;
        if (diasCrear === 0) {
          objetoCrear.forEach(i => {
            i.style.borderColor = claseCrear[0].borde;
            i.addEventListener('click', mostrarInterfazEditar);
          });
          poblacionActual += claseCrear[0].cantidadInterfaz;
          poblacionActualVisual.innerHTML = poblacionActual;
          trabajadoresActual -= claseCrear[0].personal;
          trabajadoresActualVisual.innerHTML = trabajadoresActual;
          desempleadosActual = poblacionActual - trabajadoresActual;
          desempleadosActualVisual.innerHTML = desempleadosActual;
          clearInterval(nuevoIntervalo);
          intervalos.delete(nuevoIntervalo);
          var nuevoIntervalo1 = setInterval(() => {
            diasCosecha--;
            if (diasCosecha === 0) {
              diasCosecha = 90;
              comidaActual += claseCrear.cantidadComida;
              comidaActualVisual = comidaActual;
              animacionMaterial("+" + claseCrear[0].cantidadComida, "white", coordenadaInicial.x, coordenadaInicial.y, claseCrear[0].imagen2, 10);
            }
          }, duracionDia);
          intervalos.add(nuevoIntervalo1);
        }
      }, duracionDia);
      intervalos.add(nuevoIntervalo);
    } else if (espacioOcupado) {
      animacionDinero("! Espacio Ocupado ¡", "white", mouseX, mouseY);
    } else if (dineroActual <= 0) {
      animacionDinero("! Dinero Insuficiente ¡", "white", mouseX, mouseY);
    } else if (desempleadosActual <= 0) {
      animacionDinero("! Personal Insuficiente ¡", "white", mouseX, mouseY);
    } else if (maderaActual <= 0) {
      animacionDinero("! Madera Insuficiente ¡", "white", mouseX, mouseY);
    }}

//------------------------------------------------------------------------TDMULTIPLE REMOVER------------------------------------------------------------------------------------//

  remover() {
    var diasRemover = (clase.dias / 4).toFixed(0);
    var claseRemover = clase;
    var objetosRemover = listaObjetosSeleccionados;
    var coordenadaInicial = objetosRemover[0].getBoundingClientRect();
    ocultarInterfazEditar();
    objetosRemover.forEach(i => {
      i.style.borderColor = claseRemover.bordeRemover;
      i.removeEventListener("click", mostrarInterfazEditar);
    });
    dineroActual -= claseRemover.precio / 4;
    dineroActualVisual.innerHTML = dineroActual;
    trabajadoresActual += claseRemover.personal;
    trabajadoresActualVisual.innerHTML = trabajadoresActual;
    desempleadosActual = poblacionActual - trabajadoresActual;
    desempleadosActualVisual.innerHTML = desempleadosActual;
    animacionDinero(`- ${claseRemover.precio / 4} $`, "red", mouseX, mouseY);
    botonRemoverObjeto.removeEventListener('click', claseRemover.remover);

    var nuevoIntervalo = setInterval(() => {
      diasRemover--;
      if (diasRemover === 0) {
        objetosRemover.forEach(i => {
          listaObjetos.splice(i, claseRemover);
          i.style.backgroundColor = "";
          i.style.border = "";
          i.removeEventListener("mouseover", mostrarInterfazInformacion);
          i.removeEventListener("mouseout", ocultarInterfazInformacion);
        });
        if (claseRemover.material === "madera") {
          maderaActual += claseRemover.cantidad;
          maderaActualVisual.innerHTML = maderaActual;
        } if (claseRemover.material === "roca") {
          rocaActual += claseRemover.cantidad;
          rocaActualVisual.innerHTML = rocaActual;
        }
        poblacionActual -= claseRemover.cantidadInterfaz;
        poblacionActualVisual.innerHTML = poblacionActual;
        trabajadoresActual -= claseRemover.personal;
        trabajadoresActualVisual.innerHTML = trabajadoresActual;
        desempleadosActual = poblacionActual - trabajadoresActual;
        desempleadosActualVisual.innerHTML = desempleadosActual;
        clearInterval(nuevoIntervalo);
        intervalos.delete(nuevoIntervalo);
        animacionMaterial("+" + claseRemover.cantidad, "white", coordenadaInicial.x, coordenadaInicial.y, claseRemover.imagen, 10)
      }
    }, duracionDia);
    intervalos.add(nuevoIntervalo);
  }
}
//----------------------------------------------------------------------OBJETOS TDMULTIPLE---------------------------------------------------------------------------------------//

class Castillo extends tdMultiple {
  constructor() {
    super();
    this.styleColor = colorFondo;
    this.nombre = "Castillo";
    this.color = cryo;
    this.removerObjetoDisplay = "";
  }

  crearBordeCastillo(bordesClase, i) {
    this.crear();
    bordesClase[i - 16].forEach(style => {
      coordenada.style[style] = '1px solid black';
})}}

class Cultivo extends tdMultiple {
  constructor(numero) {
    super();
    this.coordenadas = [`${num1},${num2}`,`${num1 + 1},${num2}`,`${num1 + 2},${num2}`,`${num1 + 3},${num2}`,`${num1 + 4},${num2}`,
    `${num1},${num2 - 1}`,`${num1 + 1},${num2 - 1}`,`${num1 + 2},${num2 - 1}`,`${num1 + 3},${num2 - 1}`,`${num1 + 4},${num2 - 1}`];
    this.bordeStyles = [['borderBottom','borderLeft'],['borderBottom'],['borderBottom'],['borderBottom'],['borderBottom','borderRight'],
    ['borderTop','borderLeft'],['borderTop'],['borderTop'],['borderTop'],['borderTop','borderRight']];
    this.numero = numero;
    this.nombre = 'Cultivo';
    this.color = "rgb(89, 62, 62)";
    this.precio = 20;
    this.material = "madera";
    this.cantidad = 10;
    this.personal = 5;
    this.imagen = "madera.png";
    this.dias = 60;
    this.diasCosecha = 90;
    this.cantidadInterfaz = 500;
    this.imagen2 = "comida.png";
    this.colorTienda = electro;
    this.imagenTienda = "cultivo.png";
    this.widthTienda = "25%";
    this.avisoInterfaz = "Comida por temporada:"
  }
}

//-----------------------------------------------------------------------------TDUNICO----------------------------------------------------------------------------------------//

class tdUnico extends Madre {

  mostrarEditar() {
    estadoInterfazEditar = true;
    coordenada = listaObjetos[posicionClase - 1];
    coordenada.style.border = this.bordeSelect;
    botonRemoverObjeto.addEventListener('click', this.remover);
  }

  ocultarEditar() {
    if (estadoInterfazEditar) {
      coordenada.style.border = this.borde;
      coordenada = "";
      botonRemoverObjeto.removeEventListener('click', this.remover);
  }}

//---------------------------------------------------------------------------TDUNICO CREAR-------------------------------------------------------------------------------------//

  mostrarPrevisualizarCrear() {
    coordenada = event.target;
    coordenada.style.backgroundColor = clase.color;
    coordenada.style.border = clase.borde;
  }
  
  ocultarPrevisualizarCrear() {
    coordenada = document.getElementById(nums);
    coordenada.style.backgroundColor = "";
    coordenada.style.border = "";
  }

  ponerCrear() {
    if (dineroActual > 0 && desempleadosActual > 0 && maderaActual > 0) {
      listaObjetos.push(coordenada, clase);
      apagarPrevisualizarCrear();
      var diasCrear = clase.dias;
      var claseCrear = clase;
      var objetoCrear = coordenada;
      objetoCrear.style.backgroundColor = clase.color;
      objetoCrear.style.border = clase.bordeCrear;
      objetoCrear.addEventListener('mouseover', mostrarInterfazInformacion);
      objetoCrear.addEventListener('mouseout', ocultarInterfazInformacion);
      if (claseCrear.material === "madera") {
        maderaActual -= claseCrear.cantidad;
        maderaActualVisual.innerHTML = maderaActual;
      } if (claseCrear.material === "roca") {
        rocaActual -= claseCrear.cantidad;
        rocaActualVisual.innerHTML = rocaActual;
      }
      dineroActual -= claseCrear.precio;
      dineroActualVisual.innerHTML = dineroActual;
      trabajadoresActual += claseCrear.personal;
      trabajadoresActualVisual.innerHTML = trabajadoresActual;
      desempleadosActual = poblacionActual - trabajadoresActual;
      desempleadosActualVisual.innerHTML = desempleadosActual;
      animacionDinero(`- ${claseCrear.precio} $`, "red", mouseX, mouseY);

      var nuevoIntervalo = setInterval(() => {
        diasCrear--;
        if (diasCrear === 0) {
          objetoCrear.style.border = claseCrear.borde;
          objetoCrear.addEventListener('click', mostrarInterfazEditar);
          poblacionActual += claseCrear.cantidadInterfaz;
          poblacionActualVisual.innerHTML = poblacionActual;
          trabajadoresActual -= claseCrear.personal;
          trabajadoresActualVisual.innerHTML = trabajadoresActual;
          desempleadosActual = poblacionActual - trabajadoresActual;
          desempleadosActualVisual.innerHTML = desempleadosActual;
          clearInterval(nuevoIntervalo);
          intervalos.delete(nuevoIntervalo);
        }
      }, duracionDia);
      intervalos.add(nuevoIntervalo);
    } else if (dineroActual <= 0) {
      animacionDinero("! Dinero Insuficiente ¡", "white", mouseX, mouseY);
    } else if (desempleadosActual <= 0) {
      animacionDinero("! Personal Insuficiente ¡", "white", mouseX, mouseY);
    } else if (maderaActual <= 0) {
      animacionDinero("! Madera Insuficiente ¡", "white", mouseX, mouseY);
    }
  }

//---------------------------------------------------------------------------TDUNICO REMOVER------------------------------------------------------------------------------------//

  remover() {
    var diasRemover = (clase.dias / 4).toFixed(0);
    var claseRemover = clase;
    var objetoRemover = coordenada;
    var coordenadaInicial = objetoRemover.getBoundingClientRect();
    ocultarInterfazEditar();
    objetoRemover.style.border = claseRemover.bordeRemover;
    dineroActual -= claseRemover.precio / 4;
    dineroActualVisual.innerHTML = dineroActual;
    trabajadoresActual += claseRemover.personal;
    trabajadoresActualVisual.innerHTML = trabajadoresActual;
    desempleadosActual = poblacionActual - trabajadoresActual;
    desempleadosActualVisual.innerHTML = desempleadosActual;
    animacionDinero(`- ${claseRemover.precio / 4} $`, "red", mouseX, mouseY);
    botonRemoverObjeto.removeEventListener('click', claseRemover.remover);
    objetoRemover.removeEventListener("click", mostrarInterfazEditar);

    var nuevoIntervalo = setInterval(() => {
      diasRemover--;
      if (diasRemover === 0) {
        listaObjetos.splice(objetoRemover, claseRemover);
        objetoRemover.style.backgroundColor = "";
        objetoRemover.style.border = "";
        if (claseRemover.material === "madera") {
          maderaActual += claseRemover.cantidad;
          maderaActualVisual.innerHTML = maderaActual;
        } if (claseRemover.material === "roca") {
          rocaActual += claseRemover.cantidad;
          rocaActualVisual.innerHTML = rocaActual;
        }
        poblacionActual -= claseRemover.cantidadInterfaz;
        poblacionActualVisual.innerHTML = poblacionActual;
        trabajadoresActual -= claseRemover.personal;
        trabajadoresActualVisual.innerHTML = trabajadoresActual;
        desempleadosActual = poblacionActual - trabajadoresActual;
        desempleadosActualVisual.innerHTML = desempleadosActual;
        objetoRemover.removeEventListener("mouseover", mostrarInterfazInformacion);
        objetoRemover.removeEventListener("mouseout", ocultarInterfazInformacion);
        clearInterval(nuevoIntervalo);
        intervalos.delete(nuevoIntervalo);
        animacionMaterial("+" + claseRemover.cantidad, "white", coordenadaInicial.x, coordenadaInicial.y, claseRemover.imagen, 10);
      }
    }, duracionDia);
    intervalos.add(nuevoIntervalo);
  }
}

//----------------------------------------------------------------------------OBJETOS UNICO---------------------------------------------------------------------------------------//

class Carretera extends tdUnico {
  constructor() {
    super();
    this.nombre = "Carretera";
    this.color = "rgb(139, 117, 94)";
    this.precio = 5;
    this.borde = "";
    this.material = "roca";
    this.cantidad = 5;
    this.personal = 1;
    this.imagen = "roca.png"
    this.dias = 10
  }
}

class Casa extends tdUnico {
  constructor() {
    super();
    this.nombre = "Casa";
    this.color = geo;
    this.precio = 80;
    this.cantidadInterfaz = 5;
    this.material = "madera";
    this.cantidad = 10;
    this.personal = 5;
    this.imagen = "madera.png"
    this.dias = 90
    this.colorTienda = geo;
    this.imagenTienda = "h1x1.png";
    this.widthTienda = "5%";
    this.avisoInterfaz = "Habitantes:"
  }
}

class Bosque extends tdUnico {
  constructor() {
    super();
    this.nombre = "Bosque";
    this.color = "rgb(34, 139, 34)";
    this.precio = 32;
    this.material = "madera";
    this.cantidad = 40;
    this.personal = 4;
    this.imagen = "madera.png"
    this.dias = 120;
  }
}

class Roca extends tdUnico {
  constructor() {
    super();
    this.nombre = "Roca";
    this.color = "rgb(139, 117, 94)";
    this.precio = 64;
    this.material = "roca";
    this.cantidad = 40;
    this.personal = 8;
    this.imagen = "roca.png"
    this.dias = 120;
  }
}

//-----------------------------------------------------------------------CREACION TABLA-------------------------------------------------------------------------------------------//

var table = "<table>";
for (var i = 1; i <= celdas; i++) {
  table += "<tr>";
  for (var j = 1; j <= celdas; j++) {
    table += "<td id=" + j + "," + i + ">" + "</td>";
  } table += "</tr>";
};
table += "</table>";
document.querySelector("main").innerHTML = table;

//-----------------------------------------------------------------------CREACION INICIAL----------------------------------------------------------------------------------------//

const coordenadasIniciales = [`${celdas/2 - 1},${celdas/2 - 1}`,`${celdas/2},${celdas/2 - 1}`,`${celdas/2 + 1},${celdas/2 - 1}`,`${celdas/2 + 2},${celdas/2 - 1}`,
  `${celdas/2 + 2},${celdas/2}`,`${celdas/2 + 2},${celdas/2 + 1}`,`${celdas/2 + 2},${celdas/2 + 2}`,`${celdas/2 + 1},${celdas/2 + 2}`,
  `${celdas/2},${celdas/2 + 2}`,`${celdas/2 - 1},${celdas/2 + 2}`,`${celdas/2 - 1},${celdas/2 + 1}`,`${celdas/2 - 1},${celdas/2}`,
  `${celdas/2},${celdas/2}`,`${celdas/2 + 1},${celdas/2}`,`${celdas/2 + 1},${celdas/2 + 1}`,`${celdas/2},${celdas/2 + 1}`,
  `${celdas/2 - 1},${celdas/2 - 2}`,`${celdas/2},${celdas/2 - 2}`,`${celdas/2 + 1},${celdas/2 - 2}`,`${celdas/2 + 2},${celdas/2 - 2}`,
  `${celdas/2 + 3},${celdas/2 - 1}`,`${celdas/2 + 3},${celdas/2}`,`${celdas/2 + 3},${celdas/2 + 1}`,`${celdas/2 + 3},${celdas/2 + 2}`,
  `${celdas/2 + 2},${celdas/2 + 3}`,`${celdas/2 + 1},${celdas/2 + 3}`,`${celdas/2},${celdas/2 + 3}`,`${celdas/2 - 1},${celdas/2 + 3}`,
  `${celdas/2 - 2},${celdas/2 + 2}`,`${celdas/2 - 2},${celdas/2 + 1}`,`${celdas/2 - 2},${celdas/2}`,`${celdas/2 - 2},${celdas/2 - 1}`,
  `${celdas/2 - 1},${celdas/2 - 3}`,`${celdas/2},${celdas/2 - 3}`,`${celdas/2 + 1},${celdas/2 - 3}`,`${celdas/2 + 2},${celdas/2 - 3}`,
  `${celdas/2 + 4},${celdas/2 - 1}`,`${celdas/2 + 4},${celdas/2}`,`${celdas/2 + 4},${celdas/2 + 1}`,`${celdas/2 + 4},${celdas/2 + 2}`,
  `${celdas/2 + 2},${celdas/2 + 4}`,`${celdas/2 + 1},${celdas/2 + 4}`,`${celdas/2},${celdas/2 + 4}`,`${celdas/2 - 1},${celdas/2 + 4}`,
  `${celdas/2 - 3},${celdas/2 + 2}`,`${celdas/2 - 3},${celdas/2 + 1}`,`${celdas/2 - 3},${celdas/2}`,`${celdas/2 - 3},${celdas/2 - 1}`,
  `${celdas/2 - 3},${celdas/2 - 2}`,`${celdas/2 - 2},${celdas/2 - 2}`,`${celdas/2 - 2},${celdas/2 - 3}`,`${celdas/2 + 3},${celdas/2 - 3}`,
  `${celdas/2 + 3},${celdas/2 - 2}`,`${celdas/2 + 4},${celdas/2 - 2}`,`${celdas/2 + 4},${celdas/2 + 3}`,`${celdas/2 + 3},${celdas/2 + 3}`,
  `${celdas/2 + 3},${celdas/2 + 4}`,`${celdas/2 - 2},${celdas/2 + 4}`,`${celdas/2 - 2},${celdas/2 + 3}`,`${celdas/2 - 3},${celdas/2 + 3}`,
  `${celdas/2 - 1},${celdas/2 - 4}`,`${celdas/2 + 2},${celdas/2 - 4}`,`${celdas/2 + 5},${celdas/2 - 1}`,`${celdas/2 + 5},${celdas/2 + 2}`,
  `${celdas/2 + 2},${celdas/2 + 5}`,`${celdas/2 - 1},${celdas/2 + 5}`,`${celdas/2 - 4},${celdas/2 + 2}`,`${celdas/2 - 4},${celdas/2 - 1}`];

const bordesCastillo = [['borderTop', 'borderLeft'], ['borderTop'], ['borderTop'], ['borderTop', 'borderRight'],['borderTop', 'borderRight'], ['borderRight'], 
['borderRight'], ['borderBottom', 'borderRight'],['borderBottom', 'borderRight'], ['borderBottom'], ['borderBottom'], ['borderBottom', 'borderLeft'],
['borderBottom', 'borderLeft'], ['borderLeft'], ['borderLeft'],['borderTop', 'borderLeft']];

var coordenada;
var clase;

for (let i = 0; i < coordenadasIniciales.length; i++) {
  coordenada = document.getElementById(coordenadasIniciales[i]);
  if (i >= 0 && i <= 15) {
    clase = new Castillo();
    clase.crear();
    listaObjetos.push(coordenada, clase);
  } if (i >= 16 && i <= 31) {
    clase = new Castillo();
    clase.crearBordeCastillo(bordesCastillo, i);
    listaObjetos.push(coordenada, clase);
  } if (i >= 32 && i <= 59) {
    clase = new Carretera();
    clase.crear();
    listaObjetos.push(coordenada, clase);
  } if (i >= 60 && i <= 67) {
    clase = new Casa();
    clase.crear();
    listaObjetos.push(coordenada, clase);
  }};

//---------------------------------------------------------------------------CREACION ALEATORIA---------------------------------------------------------------------------------//

const numeroObjetosAleatorios = 30;

var td = Array.from(document.querySelectorAll("table td"));
var tdSinClase = td.filter(i => !listaObjetos.includes(i));

for (let i = 0; i < numeroObjetosAleatorios; i++) {
  var tdAleatorio = Math.floor(Math.random() * 9932);
  var coordenada = tdSinClase[tdAleatorio];
    if (i <= numeroObjetosAleatorios / 2) {
      var clase = new Bosque();
      clase.crear(coordenada, clase);
      listaObjetos.push(coordenada, clase);
    } else if (i >= numeroObjetosAleatorios / 2) {
      var clase = new Roca();
      clase.crear(coordenada, clase);
      listaObjetos.push(coordenada, clase);
}};

//-------------------------------------------------------------------------INTERVALOS DE TIEMPO----------------------------------------------------------------------------------//

var poblacion0 = false;
var diaActual = 1;  
var mesActual = 1;
var añoActual = 1;
var diasSinComida = -1;
var muertesHambruna;

var dia = setInterval(() => {
  diaActual++;
  diaActualVisual.innerHTML = diaActual;
  if (diaActual > 29) {
    diaActual = 0;
  } if (comidaActual > 0) {
    diasSinComida = 0;
    comidaActual -= poblacionActual * kilosPersonaDia;
    comidaActualVisual.innerHTML = comidaActual;
    document.getElementById("comida").style.backgroundColor = colorFondoHover;
    muertesHambruna = (poblacionActual * 0.1).toFixed(0);
  } if (comidaActual <= 0) {
    diasSinComida++;
    comidaActual = 0;
    comidaActualVisual.innerHTML = comidaActual;
    document.getElementById("comida").style.backgroundColor = "red";
    if (diasSinComida > 10 && !poblacion0) {
      poblacionActual -= muertesHambruna;
      document.getElementById("poblacionActual").innerHTML = poblacionActual;
      document.getElementById("poblacion").style.backgroundColor = "red";
      if (poblacionActual <= 0) {
        poblacionActual = 0;
        poblacionActualVisual.innerHTML = poblacionActual;
        poblacion0 = true;
  }}}
}, duracionDia);

var mes = setInterval(() => {
  mesActual += 1;
  mesActualVisual.innerHTML = mesActual;
  dineroActual += (porcentajeImpuestos * promedioSalarioMensual * poblacionActual) - (trabajadoresReino * promedioSalarioReino);
  dineroActualVisual.innerHTML = dineroActual;
  if (mesActual > 11) {mesActual = 0}
}, duracionDia * 30);

var año = setInterval(() => {
  añoActual += 1;
  añoActualVisual.innerHTML = añoActual;
}, duracionDia * 360);

//-----------------------------------------------------------------------------EVENTOS TECLAS--------------------- --------------------------------------------------------------//

const main = document.querySelector('main');
let zoomed = false;

main.addEventListener('wheel', (event) => {
    if (event.deltaY < 0 && !zoomed) {
        main.classList.add('zoomed');
        zoomed = true;
    } else if (event.deltaY > 0 && zoomed) { 
        main.classList.remove('zoomed');
        zoomed = false;
}});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    ocultarInterfazEditar();
    apagarPrevisualizarCrear();
    ocultarPrevisualizarCarretera();
    ocultarInterfazTienda();
    ocultarInterfazGuia();
  } else if (event.key === 'g') {
    guardarCambiosCarretera();
  } else if (event.key === 't') {
    mostrarInterfazTienda();
  } else if (event.key === 'p') {
    empezarPrevisualizarCarretera();
}});

const tabla = document.querySelector("table");
tabla.addEventListener('mousemove', function(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
  idTdTarget = event.target.id;
  nums = idTdTarget.match(/\d+/g);
  num1 = parseInt(nums[0]);
  num2 = parseInt(nums[1]);
});

//-----------------------------------------------------------------------------ANIMACION---------------------------------------------------------------------------------------//

var animacionDineroDiv = document.getElementById("animacionDinero");

function animacionDinero(contenido, color, mouseX, mouseY) {
  animacionDineroDiv.style.zIndex = "1";
  animacionDineroDiv.innerText = contenido;
  animacionDineroDiv.style.color = color;
  animacionDineroDiv.style.left = mouseX + 10 + 'px';
  animacionDineroDiv.style.top = mouseY + 10 + 'px';
  setTimeout(function() {
    animacionDineroDiv.style.zIndex = "-1";
  }, 1000);
}

var animacionDibujo = document.getElementById("animacionDibujo");
var animacionDibujoP = document.getElementById("animacionDibujoP");
var animacionDibujoImg = document.getElementById("animacionDibujoImg")

function animacionMaterial(contenido, color, mouseX, mouseY, imagen, y) {
  animacionDibujo.style.zIndex = "1";
  animacionDibujoP.innerText = contenido;
  animacionDibujo.style.color = color;
  animacionDibujo.style.left = mouseX + 10 + 'px';
  animacionDibujo.style.top = mouseY + y + 'px';
  animacionDibujoImg.src = imagen;
  setTimeout(function() {
    animacionDibujo.style.zIndex = "-1";
  }, 1000);
}
  
//-------------------------------------------------------------------------INTERFAZ INFO---------------------------------------------------------------------------------------//

var interfazActiva = false;

for (let i = 0; i < listaObjetos.length; i += 2) {
  var objeto = listaObjetos[i];
  objeto.addEventListener('mouseover', mostrarInterfazInformacion);
  objeto.addEventListener('mouseout', ocultarInterfazInformacion);
  objeto.addEventListener('click', mostrarInterfazEditar);
}

var interfazPequeña = document.getElementById('interfazPequeña');
var claseInterfazPequeña = document.getElementById("claseInterfazPequeña");

var posicionClase;

function mostrarInterfazInformacion(event) {
  if (!interfazActiva) {
    interfazPequeña.style.display = 'flex';
    interfazPequeña.style.left = mouseX + 10 + 'px';
    interfazPequeña.style.top = mouseY + 10 + 'px';
    posicionClase = listaObjetos.indexOf(event.target) + 1;
    clase = listaObjetos[posicionClase];
    interfazPequeña.style.backgroundColor = clase.color;
    claseInterfazPequeña.style.color = clase.styleColor;
    claseInterfazPequeña.innerHTML = `${clase.nombre} ${clase.numero} <br>
    ${clase.avisoInterfaz} ${clase.cantidadInterfaz}`;
}};

function ocultarInterfazInformacion() {
  if (!interfazActiva) {
    interfazPequeña.style.display = "";
}};

//-------------------------------------------------------------------------INTERFAZ EDITAR--------------------------------------------------------------------------------------//

var estadoInterfazEditar = false;
const botonCerrarInterfazPequeña = document.getElementById("botonCerrarInterfazPequeña");
const botonRemoverObjeto = document.getElementById("botonRemoverObjeto");
botonCerrarInterfazPequeña.addEventListener('click', ocultarInterfazEditar);

function mostrarInterfazEditar() {
  interfazActiva = true;
  interfazPequeña.style.display = "flex";
  botonCerrarInterfazPequeña.style.display = "flex";
  botonRemoverObjeto.style.display = "flex";
  botonRemoverObjeto.innerHTML = `Remover por: ${clase.precio / 4} $`
  clase.mostrarEditar();
};

function ocultarInterfazEditar() {
  interfazActiva = false;
  interfazPequeña.style.display = "";
  botonCerrarInterfazPequeña.style.display = "";
  botonRemoverObjeto.style.display = "";
  clase.ocultarEditar();
};

//-----------------------------------------------------------------------------INTERFAZ TIENDA--------------------- --------------------------------------------------------------//

const interfazTienda = document.getElementById("interfazTienda");
const interfazTiendaPestañas = document.querySelectorAll('#interfazTiendaPestañas > *');
var interfazTiendaObjeto = document.getElementById("interfazTiendaObjeto");
var interfazTiendaObjetoTitulo = document.getElementById("interfazTiendaObjetoTitulo");
var interfazTiendaObjetoImagen = document.getElementById("interfazTiendaObjetoImagen");
var interfazTiendaObjetoTexto = document.getElementById("interfazTiendaObjetoTexto");

interfazTiendaPestañas[7].addEventListener("click", ocultarInterfazTienda);

function mostrarInterfazTienda() {
  interfazTienda.style.display = "block";
  interfazTiendaPestañas[1].focus();
  interfazTiendaPestañas.forEach(i => {
    i.removeEventListener("click", cambiarCategoriaTienda);
    i.addEventListener("click", cambiarCategoriaTienda);
  });
  cambiarCategoriaTienda();
};

function ocultarInterfazTienda() {
  interfazTienda.style.display = "none";
};

var numeroCultivo = 1;

function cambiarCategoriaTienda() {
  if (interfazTiendaPestañas[0] === document.activeElement) {
    clase = new Casa();
    clase.crearInterfazTienda();
  } else if (interfazTiendaPestañas[1] === document.activeElement) {
    clase = new Casa();
    clase.crearInterfazTienda();
  } else if (interfazTiendaPestañas[2] === document.activeElement) {
    clase = new Cultivo();
    clase.crearInterfazTienda();
  } else if (interfazTiendaPestañas[3] === document.activeElement) {
    clase = new Casa();
    clase.crearInterfazTienda();
  } else if (interfazTiendaPestañas[4] === document.activeElement) {
    clase = new Casa();
    clase.crearInterfazTienda();
  } else if (interfazTiendaPestañas[5] === document.activeElement) {
    clase = new Casa();
    clase.crearInterfazTienda();
  } else if (interfazTiendaPestañas[6] === document.activeElement) {
    clase = new Casa();
    clase.crearInterfazTienda();
}};

var estadoInterfazTienda = false;

function previsualizarCrear() {
  interfazActiva = true;
  estadoInterfazTienda = true; 
  tdSinClase = td.filter(i => !listaObjetos.includes(i));
  ocultarInterfazTienda ();
  tdSinClase.forEach(i => {
    i.addEventListener('mouseover', clase.mostrarPrevisualizarCrear);
    i.addEventListener('mouseout', clase.ocultarPrevisualizarCrear);
    i.addEventListener('click', clase.ponerCrear);
})};

function apagarPrevisualizarCrear() {
  if (estadoInterfazTienda) {
    interfazActiva = false;
    estadoInterfazTienda = false;
    clase.ocultarPrevisualizarCrear();
    tdSinClase.forEach(i => {
      i.removeEventListener('mouseover', clase.mostrarPrevisualizarCrear);
      i.removeEventListener('mouseout', clase.ocultarPrevisualizarCrear);
      i.removeEventListener('click', clase.ponerCrear);
})}};

//-----------------------------------------------------------------------------GENERAR PATH------------------------------------------------------------------------------------//

var carreterasGeneradas = [];
var ultimaCarretera;
var pActiva = false;

function empezarPrevisualizarCarretera(event) {
  if (!pActiva) {
    clase = new Carretera();
    carreterasGeneradas = [];
    interfazActiva = true;
    pActiva = true;

    tdSinClase.forEach(i => { 
      i.addEventListener("click", empezarGenerarCarretera);
      i.addEventListener('mouseover', previsualizarCarreteraMostrar);
      i.addEventListener('mouseout', previsualizarCarreteraOcultar);
})}};

var estadoGenerarCarretera = false;

function previsualizarCarreteraMostrar() {
  ultimaCarretera = event.target;
  if (!estadoGenerarCarretera) {
    ultimaCarretera.style.backgroundColor = clase.color;
    ultimaCarretera.style.border = "solid white 1px";
  } else {
    carreterasGeneradas.push(ultimaCarretera);
    carreterasGeneradas.forEach(i => {
      i.removeEventListener('mouseover', previsualizarCarreteraMostrar);
      i.removeEventListener('mouseout', previsualizarCarreteraOcultar);
    });
    ultimaCarretera.style.border = "";
    ultimaCarretera.style.backgroundColor = clase.color;
}};

function previsualizarCarreteraOcultar() {
  if (ultimaCarretera && !estadoGenerarCarretera) {
    ultimaCarretera.style.backgroundColor = "";
    ultimaCarretera.style.border = "";
  } else {
}};

function empezarGenerarCarretera() {
  if (!estadoGenerarCarretera) {
    estadoGenerarCarretera = true;
    carreterasGeneradas.push(ultimaCarretera);
    ultimaCarretera.style.border = "";
  } else {estadoGenerarCarretera = false;}
};

function ocultarPrevisualizarCarretera() {
  if (pActiva) {
    interfazActiva = false;
    pActiva = false;
    estadoGenerarCarretera = false;

    ultimaCarretera.style.background = "";
    ultimaCarretera.style.border = "";
    ultimaCarretera = "";
    
    carreterasGeneradas.forEach(i => {
      i.style.backgroundColor = "";
    });

    tdSinClase.forEach(i => { 
        i.removeEventListener('mouseover', previsualizarCarreteraMostrar);
        i.removeEventListener('mouseout', previsualizarCarreteraOcultar);
        i.removeEventListener("click", empezarGenerarCarretera);
})}};

function guardarCambiosCarretera() {
  if (pActiva) {
    ocultarPrevisualizarCarretera();
    animacionDinero(`- ${carreterasGeneradas.length * clase.precio} $`, "red ", mouseX, mouseY);
    carreterasGeneradas.forEach(i => {
      listaObjetos.push(i, clase)
      i.style.border = `1px solid lime`;
      i.style.backgroundColor = clase.color;
      dineroActual -= clase.precio;
      dineroActualVisual.innerHTML = dineroActual;
      rocaActual -= clase.cantidad;
      rocaActualVisual.innerHTML = rocaActual;
      trabajadoresActual += clase.personal;
      trabajadoresActualVisual.innerHTML = trabajadoresActual;
      desempleadosActual = poblacionActual - trabajadoresActual;
      desempleadosActualVisual.innerHTML = desempleadosActual;
      i.addEventListener('mouseover', mostrarInterfazInformacion);
      i.addEventListener('mouseout', ocultarInterfazInformacion);
    });

    var diasCarreteraCrear = clase.dias;
    var nuevoIntervalo = setInterval(() => {
      diasCarreteraCrear--;
      if (diasCarreteraCrear === 0) {
        carreterasGeneradas.forEach(i => {
          i.style.border = "";
          i.addEventListener('click', mostrarInterfazEditar);
          trabajadoresActual -= clase.personal;
          trabajadoresActualVisual.innerHTML = trabajadoresActual;
          desempleadosActual = poblacionActual - trabajadoresActual;
          desempleadosActualVisual.innerHTML = desempleadosActual;
        });
        clearInterval(nuevoIntervalo);
        intervalos.delete(nuevoIntervalo);
      }
    }, duracionDia);
    intervalos.add(nuevoIntervalo);
}};

//-----------------------------------------------------------------------------INTERFAZ AYUDA------------------------------------------------------------------------------------//

var estadointerfazGuia = false;
var botonGuia = document.getElementById("botonGuia");
var interfazGuia = document.getElementById("interfazGuia");
botonGuia.addEventListener("click", mostrarInterfazGuia);

function mostrarInterfazGuia() {
  estadointerfazGuia = true;
  interfazGuia.style.display = "flex";
};

function ocultarInterfazGuia() {
  if (estadointerfazGuia) {
    estadointerfazGuia = false;
    interfazGuia.style.display = "none";
}};

});


