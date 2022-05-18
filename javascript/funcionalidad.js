const select = document.querySelector("#select");
const opciones = document.querySelector("#opciones");
const contenidoSelect = document.querySelector("#select .contenido-select");
const hiddeInput = document.querySelector("#inputSelect");

var VarSaldo=0;

window.addEventListener("DOMContentLoaded", () => {
    console.log('Entró a window.addEventListener("DOMContentLoaded", () => {');
    DefinePassword();

});
/******************************************************************
   Para leer el archivo XML que tiene la estructura de los Usuarios
   para así asignarla a un array (ArrUsuarios) usando AJAX
******************************************************************/
PoblarDatosUsuarios();

/* Esta funcion simula una base de datos para la validacion  */
function poblarDtaUsuarios() {

    const usuarios = 
    [
        {
            nombre: "Guillermo Figueroa Olivera",
            pwd: "123",
            Saldo: "600",
            Img: "imagenes/GF.jpg",
            Desc: "Ing.Software"
        },
        {
            nombre: "Bill Gates",
            pwd: "1234",
            Saldo: "555",
            Img: "imagenes/BG.jpg",
            Desc: "Dueño Microsoft"
        },
        {
            nombre: "Mark Zuckerberg",
            pwd: "1235",
            Saldo: "900",
            Img: "imagenes/MZ.jpg",
            Desc: "Dueño Facebook"
        },
        {
            nombre: "Betito Einstein",
            pwd: "1236",
            Saldo: "100",
            Img: "imagenes/AE.jpg",
            Desc: "E=MC2"
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
    console.log("Sí entra a PoblarDatosUsuarios()"); //OK
}

function cargarXML(xml) {
    var docXML = xml.responseXML;
    var varUsuario = [];
    varUsuario = docXML.getElementsByTagName("usuario");
    for (var i=0; varUsuario.length; i++){
        alert("Nombre=" + varUsuario[i].getElementsByTagName("nombre")[0].textContent + " Password= " + varUsuario[i].getElementsByTagName("pwd")[0].textContent );
    }  
    console.log(varUsuario);
    console.log("Sí entra a cargarXML(xml) {"); //OK
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
/* Hace las validaciones pertinentes para manipular el saldo de acuerdo al monto especificado  */
function FunDepositar(){
    Deposito = prompt("ingresa el monto a depositar");
    //Validar un ingreso correcto numérico 
     while (Deposito == null || /\D/.test(Deposito)) {
         Deposito = prompt("Ingrese un número VÁLIDO: ");
    };
    if (Deposito == ""){
        Deposito =0;
    };
    //Validar la regla de negocio de no exceder los 990
    if ((parseInt(VarSaldo) + parseInt(Deposito)) > 990 ){
        //alert("Se está violando una regla de negocio: EL SALDO NO DEBE EXCEDER LOS 990");
        Swal.fire({
            tittle:'Error',
            text:'Se está violando una regla de negocio: EL SALDO NO DEBE EXCEDER LOS 990',
            icon:'error'
        })
    }
    else{
        VarSaldo = parseInt(VarSaldo) + parseInt(Deposito);
        MuestraSaldo(VarSaldo)
    }
}
/* Hace lasvalidaciones pertinentes para manipular el saldo de acuerdo al monto especificado  */
function FunRetirar(){
    Retiro = prompt("ingresa el monto a retirar");
    //Validar un ingreso correcto numérico
    while (Retiro == null || /\D/.test(Retiro)) {
        Retiro = prompt("Ingrese un número VÁLIDO: ");
    };
    if (Retiro == ""){
        Retiro =0;
    };
    //Validar la regla de negocio de no debe ser menor de 10
    if ((parseInt(VarSaldo) - parseInt(Retiro)) < 10 ){
        //alert("Se está violando una regla de negocio: EL SALDO NO DEBE SER MENOR A 10");
        Swal.fire({
            tittle:'Error',
            text:'Se está violando una regla de negocio: EL SALDO NO DEBE SER MENOR A 10',
            icon:'error'
        })        
    }
    else{
        VarSaldo = parseInt(VarSaldo) - parseInt(Retiro);
        MuestraSaldo(VarSaldo)
    }
}
/* Nos permite escuchar el evento click en el boton de click para continuar */
function DefinePassword() {
    const botonComenzar = document.getElementById("botonComenzar");
    botonComenzar.addEventListener("click", (e) => {
        e.preventDefault();
        const todoslosusuarios = poblarDtaUsuarios();
        const Passwordget = document.getElementById("textInputPassword");
        const contenerInputsPassword = document.getElementById('DivPassword');
        const EtiquetaSaldo = document.getElementById('lblSaldo');
        const VarDivTablaMain = document.getElementById('DivTablaMain');
        

        for (let i = 0; i < todoslosusuarios.length; i++) {
            if (
                todoslosusuarios[i].nombre == hiddeInput.value &&
                todoslosusuarios[i].pwd == Passwordget.value
            ) {
                /******************Poner el saldo en la etiqueta y mostrar la etiqueta oculta */
                VarSaldo = todoslosusuarios[i].Saldo;
                VarNombreusuario = todoslosusuarios[i].nombre;
                console.log("saldo=" + VarSaldo);
                MuestraSaldo(VarSaldo)
                EtiquetaSaldo.style.display="block";
                VarDivTablaMain.style.display="block";
                //select.classList.add("d-none");
                limpiarHTML();
                CrearPerfilUsuario(todoslosusuarios[i]);
                Swal.fire({
                    title: 'Bienvenido!!!',
                    html: 'Espero te encuentres bien ' +  VarNombreusuario,
                    icon: 'success'
                });

                contenidoSelect.style.display="hidden";
                Passwordget.style.display = "none"; /* para ocultar el contenedor de etiqueta,caja y textbox*/
                //DivTablaMain
                contenerInputsPassword.style.display = "none"; /* para ocultar el contenedor de etiqueta,caja y textbox*/
                document.getElementById("lstusuarios").style.display = "hidden"; /* para ocultar el combo de "Usuarios" contenedor de etiqueta,caja y textbox*/
                    
                break;
            } else if (i == todoslosusuarios.length - 1) {
                // Swal.fire({
                //     title: 'Usuario o contraseña incorrecta',
                //     //html: 'Usuario o contraseña incorrecta',
                //     icon: 'success'
                // });                
                alert("Usuario o contraseña incorrecta");
            }
        }
    });
}
function MuestraSaldo(Total){
    const EtiquetaSaldo = document.getElementById('lblSaldo');
    console.log("Estamos en muestra saldo con un total de:" + Total);
    EtiquetaSaldo.innerHTML="<h2>El Saldo del usuario:" + VarNombreusuario + " es:</h2><h3><<< " + Total + " >>></h3>";
}
select.addEventListener("click", () => {
    select.classList.toggle("active");
    opciones.classList.toggle("active");
});
function stopDefAction(evt) {
    evt.preventDefault();
}

function limpiarHTML(){
    opciones.innerHTML="";
}
function CrearPerfilUsuario (perfil){
    const enlace=document.createElement("a");
    enlace.classList.add("opcion");
    enlace.innerHTML=`
    <div class="contenido-opcion">
        <img src="${perfil.Img}" alt="">
        <div class="textos">
            <h2 class="titulos">${perfil.nombre}</h2> </h2>
            <p class="descripcion">${perfil.Desc}</p>
        </div>
    </div>    
    `
    opciones.appendChild(enlace)

}