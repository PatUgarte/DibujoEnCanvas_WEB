//	"ArrowLeft", keyCode: 37
//	"ArrowUp", keyCode: 38
//	"ArrowRight", keyCode: 39
//	"ArrowDown", keyCode: 40

var d = document.getElementById("canvas");
var lienzo = d.getContext("2d");
document.addEventListener("keydown",dibujarConElTeclado);
document.addEventListener("keydown",cambiarDireccion);
document.addEventListener("keyup",cancelarDireccion);

var teclas = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
};

var color;
var ancho = canvas.width;
var alto = canvas.height;
var xActual = ancho/2;
var xNueva;
var yActual = alto/2;
var yNueva;
var tamañoDeLinea = 4;
var movimiento = tamañoDeLinea;

var direccionAnterior;
var direccionActual;

//	VER SI ESTO SIRVE PARA COMPROBAR SI LAS FLECHAS ESTÁN OPRIMIDAS. ASIGNARLE 1 AL PULSAR Y 0 AL SOLTAR.
var leftIsPressed = 0;
var upIsPressed = 0;
var rightIsPressed = 0;
var downIsPressed = 0;
var cantidadDeTeclasPulsadas = 0;

reinicio();

function dibujarConElTeclado(evento){
	//	SE DEBE TOMAR EL VALOR DE UN INPUT PARA DETERMINAR EL ANCHO DE LA LINEA.
	//	AÑADIRLE LOS EVENTOS mousedown Y mouseup PARA DIBUJAR CON EL MOUSE.
	//	AÑADIRLE UN INPUT DESPLEGABLE QUE TE PERMITA ELEGIR SI QUERÉS ESCRIBIR CON MOUSE O CON LAS FLECHAS.
	verificarTeclasPulsadas();
	if(cantidadDeTeclasPulsadas < 3){
		if(cantidadDeTeclasPulsadas == 2) modificarMovimiento();
		switch(evento.keyCode){
			case teclas.LEFT:
				leftIsPressed = 1;
				//verificarTeclaPulsada(teclas.LEFT);
				xNueva = verificarLimite(xActual - movimiento);
				dibujarLinea(tamañoDeLinea,xActual,yActual,xNueva,yNueva);
				xActual = xNueva;
				break;
			case teclas.UP:
				upIsPressed = 1;
				//verificarTeclaPulsada(teclas.UP);
				yNueva = verificarLimite(yActual - movimiento);
				dibujarLinea(tamañoDeLinea,xActual,yActual,xActual,yNueva);
				yActual = yNueva;
				break;
			case teclas.RIGHT:
				rightIsPressed = 1;
				//verificarTeclaPulsada(teclas.RIGHT);
				xNueva = verificarLimite(xActual + movimiento);
				dibujarLinea(tamañoDeLinea,xActual,yActual,xNueva,yActual);
				xActual = xNueva;
				break;
			case teclas.DOWN:
				downIsPressed = 1;
				//verificarTeclaPulsada(teclas.DOWN);
				yNueva = verificarLimite(yActual + movimiento);
				dibujarLinea(tamañoDeLinea,xActual,yActual,xActual,yNueva);
				yActual = yNueva;
				break;
			default:
				console.log("Para moverse debe oprimir una flecha.");
		}
	} else {
		console.log("Deben pulsarse menos de 3 direcciones para desplazarse.");
	}
}

function dibujarLinea(anchoDeLinea,xInicial,yInicial,xFinal,yFinal){
	console.log(document.getElementById("elegir_grosor").value);	//	IMPLEMENTAR BIEN ESTO
	color = document.getElementById("elegir_color").value;
	lienzo.beginPath();
	lienzo.strokeStyle = color;
	lienzo.lineWidth = anchoDeLinea;
	lienzo.moveTo(xInicial,yInicial);
	lienzo.lineTo(xFinal,yFinal);
	lienzo.stroke();
	lienzo.closePath();
}

function dibujarLineaBorde(anchoDeLinea,xInicial,yInicial,xFinal,yFinal){
	lienzo.beginPath();
	lienzo.strokeStyle = "black";
	lienzo.lineWidth = anchoDeLinea;
	lienzo.moveTo(xInicial,yInicial);
	lienzo.lineTo(xFinal,yFinal);
	lienzo.stroke();
	lienzo.closePath();
}

function dibujarBorde(){
	dibujarLineaBorde(1,1,1,ancho-1,1);			//	Borde superior
	dibujarLineaBorde(1,ancho-1,1,ancho-1,alto-1);	//	Borde derecho
	dibujarLineaBorde(1,ancho-1,alto-1,1,alto-1);	//	Borde infeiror
	dibujarLineaBorde(1,1,alto-1,1,1);				//	Borde izquierdo
}

function verificarLimite(posicion){
	if(posicion >= ancho){
		posicion = ancho - tamañoDeLinea;
	} else if(posicion <= 0){
		posicion = 0 + tamañoDeLinea;
	}
	return posicion;
}

/*function verificarTeclaPulsada(){
	if(direccion != direccionActual){
		cantidadDeTeclasPulsadas++;
		console.log(cantidadDeTeclasPulsadas);
		direccionActual = direccion;
	}
}*/

function verificarTeclasPulsadas(){
	cantidadDeTeclasPulsadas = leftIsPressed + upIsPressed + rightIsPressed + downIsPressed; 
	console.log(cantidadDeTeclasPulsadas);
}

function cancelarDireccion(evento){
	switch(evento.keyCode){
		case teclas.LEFT:
			leftIsPressed = 0;
			break;
		case teclas.UP:
			upIsPressed = 0;
			break;
		case teclas.RIGHT:
			rightIsPressed = 0;
			break;
		case teclas.DOWN:
			downIsPressed = 0;
			break;
	}
	verificarTeclasPulsadas();
	/*if(evento.keyCode == teclas.LEFT || evento.keyCode == teclas.UP || evento.keyCode == teclas.RIGHT || evento.keyCode == teclas.DOWN){
		if(cantidadDeTeclasPulsadas > 0) cantidadDeTeclasPulsadas--;
		console.log(cantidadDeTeclasPulsadas);
		direccionAnterior = evento.keyCode;
	}*/
}

function cambiarDireccion(evento){
	if(evento.keyCode == teclas.LEFT || evento.keyCode == teclas.UP || evento.keyCode == teclas.RIGHT || evento.keyCode == teclas.DOWN){
		if(cantidadDeTeclasPulsadas == 1) direccionAnterior = direccionActual;
		direccionActual = evento.keyCode;
	}
}

function modificarMovimiento(){
	if(direccionAnterior != direccionActual){
		switch(direccionAnterior){
			case teclas.LEFT:
				xNueva = verificarLimite(xActual - movimiento);
				xActual = xNueva;
				break;
			case teclas.UP:
				yNueva = verificarLimite(yActual - movimiento);
				yActual = yNueva;
				break;
			case teclas.RIGHT:
				xNueva = verificarLimite(xActual + movimiento);
				xActual = xNueva;
				break;
			case teclas.DOWN:
				yNueva = verificarLimite(yActual + movimiento);
				yActual = yNueva;
				break;
		}
	}
}

function reinicio(){
	//FALTA PISAR TODO CON BLANCO PARA TAPAR EL DIBUJO PREVIO (O AVERIGUAR COMO HACER UN CLEAR AL CANVAS)
	//Dibujo el punto inicial para saber de dónde se arranca.
	dibujarLineaBorde(3,xActual-1,yActual-1,xActual+1,yActual+1);
	//Dibujo los bordes para delimitar los límites del Canvas.
	dibujarBorde();
}