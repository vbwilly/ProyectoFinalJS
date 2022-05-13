const select = document.querySelector("#select");
const opciones = document.querySelector("#opciones");
const contenidoSelect = document.querySelector("#select .contenido-select");
const hiddeInput = document.querySelector("#inputSelect");
window.addEventListener("DOMContentLoaded", () => {
    DefinePassword();
});
/******************************************************************
   Para leer el archivo XML que tiene la estructura de los Usuarios
   para así asignarla a un array (ArrUsuarios) usando AJAX
******************************************************************/
PoblarDatosUsuarios();

/* Esta funcion simula una base de datos para la validacion  */
function poblarDtaUsuarios() {
    const usuarios = [
        {
            nombre: "Guillermo Figueroa Olivera",
            usr: "vbwilly",
            pwd: "123",
            Saldo: "300",
        },
        {
            nombre: "Bill Gates",
            usr: "microsoft",
            pwd: "1234",
            Saldo: "555",
        },
        {
            nombre: "Mark Zuckerberg",
            usr: "facebook",
            pwd: "1235",
            Saldo: "900",
        },
        {
            nombre: "Betito Einstein",
            usr: "buuum",
            pwd: "1236",
            Saldo: "100",
        },
    ];
    return usuarios;
}

function PoblarDatosUsuarios() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cargarXML(this);
        }
    };
    xhr.open("GET", "XML/Usuarios.xml", true);
    xhr.send();
}

function cargarXML(xml) {
    var docXML = xml.responseXML;
    var varUsuario = [];
    varUsuario = docXML.getElementsByTagName("usuario");
    /*     for (var i=0; varUsuario.length; i++){
        alert("Nombre=" + varUsuario[i].getElementsByTagName("nombre")[0].textContent + " Password= " + varUsuario[i].getElementsByTagName("pwd")[0].textContent );
    } */
    console.log(varUsuario);
}

document.querySelectorAll("#opciones > .opcion").forEach((opcion) => {
    opcion.addEventListener("click", (e) => {
        e.preventDefault();
        contenidoSelect.innerHTML = e.currentTarget.innerHTML;
        select.classList.toggle("active");
        opciones.classList.toggle("active");
        hiddeInput.value =
            e.currentTarget.querySelector(".titulos").textContent;

        document.getElementById("DivPassword").style.display =
            "block"; /* para mostrar el botón de "Div" contenedor de etiqueta,caja y textbox*/
        document.getElementById("DivPassword").style.display = "hidden"; //Oculta el combo de usuarios
    });
});

/* Nos permite escuchar el evento click en el boton de click para continuar */
function DefinePassword() {
    const botonComenzar = document.getElementById("botonComenzar");
    botonComenzar.addEventListener("click", (e) => {
        e.preventDefault();
        const todoslosusuarios = poblarDtaUsuarios();
        const Passwordget = document.getElementById("textInputPassword");
        const contenerInputsPassword = document.getElementById('DivPassword');
        for (let i = 0; i < todoslosusuarios.length; i++) {
            if (
                todoslosusuarios[i].nombre == hiddeInput.value &&
                todoslosusuarios[i].pwd == Passwordget.value
            ) {
                console.log(
                    "Bienvenido " +
                        todoslosusuarios[i].nombre +
                        " tu saldo es de " +
                        todoslosusuarios[i].Saldo
                );

                Passwordget.style.display = "none"; /* para ocultar el contenedor de etiqueta,caja y textbox*/
                contenerInputsPassword.style.display = "none"; /* para ocultar el contenedor de etiqueta,caja y textbox*/
                document.getElementById("lstusuarios").style.display =
                    "hidden"; /* para ocultar el combo de "Usuarios" contenedor de etiqueta,caja y textbox*/
                document.getElementById("DivCalculadora").style.display =
                    "block"; /* para mostrar el botón de "DivCalculadora" contenedor de calculadora*/
                    
                break;
            } else if (i == todoslosusuarios.length - 1) {
                alert("Usuario o contraseña incorrecta");
            }
        }
    });
}

select.addEventListener("click", () => {
    select.classList.toggle("active");
    opciones.classList.toggle("active");
});
function stopDefAction(evt) {
    evt.preventDefault();
}
/* ***************************************************************************************************************************************** */
/* ***************************************************************************************************************************************** */
/* ****************************CODIGO CALCULADORA******************************************************************************************* */
/* ***************************************************************************************************************************************** */
/* ***************************************************************************************************************************************** */
//Declaramos variables
var operandoa;
var operandob;
var operacion;

function init(){
    //variables
    var resultado = document.getElementById('resultado');
    var reset = document.getElementById('reset');
    var suma = document.getElementById('suma');
    var resta = document.getElementById('resta');
    var multiplicacion = document.getElementById('multiplicacion');
    var division = document.getElementById('division');
    var igual = document.getElementById('igual');
    var uno = document.getElementById('uno');
    var dos = document.getElementById('dos');
    var tres = document.getElementById('tres');
    var cuatro = document.getElementById('cuatro');
    var cinco = document.getElementById('cinco');
    var seis = document.getElementById('seis');
    var siete = document.getElementById('siete');
    var ocho = document.getElementById('ocho');
    var nueve = document.getElementById('nueve');
    var cero = document.getElementById('cero');

    //Eventos de click
  uno.onclick = function(e){
    e.preventDefault();
    resultado.textContent = resultado.textContent  + "1";
}
dos.onclick = function(e){
    e.preventDefault();
    resultado.textContent = resultado.textContent  + "2";
}
tres.onclick = function(e){
    e.preventDefault();
    resultado.textContent = resultado.textContent  + "3";
}
cuatro.onclick = function(e){
    resultado.textContent = resultado.textContent  + "4";
}
cinco.onclick = function(e){
    resultado.textContent = resultado.textContent  + "5";
}
seis.onclick = function(e){
    resultado.textContent = resultado.textContent  + "6";
}
siete.onclick = function(e){
    resultado.textContent = resultado.textContent  + "7";
}
ocho.onclick = function(e){
    resultado.textContent = resultado.textContent  + "8";
}
nueve.onclick = function(e){
    resultado.textContent = resultado.textContent  + "9";
}
cero.onclick = function(e){
    resultado.textContent = resultado.textContent  + "0";
}
reset.onclick = function(e){
    e.preventDefault();
    resetear();
}
suma.onclick = function(e){
    operandoa = resultado.textContent;
    operacion = "+";
    limpiar();
}
resta.onclick = function(e){
    operandoa = resultado.textContent;
    operacion = "-";
    limpiar();
}
multiplicacion.onclick = function(e){
    operandoa = resultado.textContent;
    operacion = "*";
    limpiar();
}
division.onclick = function(e){
    operandoa = resultado.textContent;
    operacion = "/";
    limpiar();
}
igual.onclick = function(e){
    operandob = resultado.textContent;
    resolver();
}

function limpiar(){
    resultado.textContent = "";
  }
  function resetear(){
    resultado.textContent = "";
    operandoa = 0;
    operandob = 0;
    operacion = "";
  }

  function resolver(){
    var res = 0;
    switch(operacion){
      case "+":
        res = parseFloat(operandoa) + parseFloat(operandob);
        break;
      case "-":
          res = parseFloat(operandoa) - parseFloat(operandob);
          break;
      case "*":
        res = parseFloat(operandoa) * parseFloat(operandob);
        break;
      case "/":
        res = parseFloat(operandoa) / parseFloat(operandob);
        break;
    }
    resetear();
    resultado.textContent = res;
  }  
}