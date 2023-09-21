const billValue = document.getElementById("billValue");
billValue.addEventListener("input", getBillValue);
let valorFactura = 0;

const porcentajes = document.querySelectorAll(".porcentaje");
let porcentaje=0;

const noPeople = document.getElementById("noPersonas");
noPeople.addEventListener("input", getNoPeople);
let noPersonas=1;

const resetearbtn = document.getElementById("resetBtn");
resetearbtn.addEventListener("click", () => location.reload());

porcentajes.forEach( porc => {

    if(porc.localName == "button") {
        porc.addEventListener("click", obtenerPorcentaje)
    } else {
        porc.addEventListener("input", obtenerPorcentaje)
    }
} );
  
function obtenerPorcentaje(event) {
    
    let seleccionado = event.target.id;

    let botonSeleccionado = document. getElementById(seleccionado);

    botonSeleccionado.classList.remove("porcentaje");
    botonSeleccionado.classList.add("porcentajeSeleccionado");

    porcentajes.forEach( por => {
        if(por.id != seleccionado){
            por.classList.remove("porcentajeSeleccionado");
            por.classList.add("porcentaje");
        }
    });
    if(event.target.value != ""){
        porcentaje= (parseFloat(event.target.value).toFixed(2)) / 100;
        activarResetearBtn();
        hacerCalculoTipAmount();
        hacerCalculoTotal();
        return porcentaje;
    }
    
};


function desactivarResetearBtn(){
    let resetBtn = document.getElementById("resetBtn");
    resetBtn.classList.remove("resetBtn");
    resetBtn.classList.add("resetBtnInactivo")
    resetBtn.disabled = true;
}

function activarResetearBtn(){
    let resetBtn = document.getElementById("resetBtn");
    resetBtn.classList.remove("resetBtnInactivo");
    resetBtn.classList.add("resetBtn")
    resetBtn.disabled = false;
}

function getBillValue(){
    valorFactura = parseInt(billValue.value);
    validarBillValue();
    hacerCalculoTipAmount();
    hacerCalculoTotal();
}

function validarBillValue(){
    const alertaBillValue = document.getElementById("alertaBillValue");
    const inputBillValue = document.getElementById("inputBillValue");
    activarResetearBtn();

    if(billValue.value == "0" ){
        alertaBillValue.textContent = `Can't be zero`;

        alertaBillValue.classList.remove("alertaEscondida");
        alertaBillValue.classList.add("alertaMostrada");

        inputBillValue.classList.remove("icono-input");
        inputBillValue.classList.add("icono-input-alerta");

        return true;

    }else if(billValue.value == ""){
        valorFactura = 0;

        return true;

    }else{
        alertaBillValue.classList.remove("alertaMostrada");
        alertaBillValue.classList.add("alertaEscondida"); 

        inputBillValue.classList.remove("icono-input-alerta");
        inputBillValue.classList.add("icono-input");

        return true;

    }
}
function getNoPeople(){
    noPersonas = parseInt(noPeople.value);
    hacerCalculoTipAmount();
    hacerCalculoTotal();
}
function validarNoPeople(){
    const alertaNoPersonas = document.getElementById("alertaNoPersonas");
    const inputNoPersonas = document.getElementById("inputNoPersonas");
    activarResetearBtn();

    if(noPersonas == 0 ){
        alertaNoPersonas.textContent = `Can't be zero`;

        alertaNoPersonas.classList.remove("alertaEscondida");
        alertaNoPersonas.classList.add("alertaMostrada");

        inputNoPersonas.classList.remove("icono-input");
        inputNoPersonas.classList.add("icono-input-alerta");

        return false;

    }else if(noPeople.value == ""){
        alertaNoPersonas.classList.remove("alertaMostrada");
        alertaNoPersonas.classList.add("alertaEscondida");

        inputNoPersonas.classList.remove("icono-input-alerta");
        inputNoPersonas.classList.add("icono-input");
        noPersonas=1;
        return true;

    }else{
        alertaNoPersonas.classList.remove("alertaMostrada");
        alertaNoPersonas.classList.add("alertaEscondida");

        inputNoPersonas.classList.remove("icono-input-alerta");
        inputNoPersonas.classList.add("icono-input");

        return true;
    }
}

function hacerCalculoTipAmount(){
    let billValueValidado = validarBillValue();
    let noPeopleValidado = validarNoPeople();

    if(billValueValidado==true && noPeopleValidado== true){
        const resultadoPropina = document.getElementById("resultadoTip");

        let propinaXPersona = ((valorFactura*porcentaje)/noPersonas).toFixed(2);

        resultadoPropina.textContent = `$${propinaXPersona}`;
    }
}
function hacerCalculoTotal(){
    let billValueValidado = validarBillValue();
    let noPeopleValidado = validarNoPeople();

    if ( billValueValidado == true && noPeopleValidado== true){
        const resultadoTotal = document.getElementById("resultadoTotal");

        let propinaXPersona = ((valorFactura*porcentaje)/noPersonas).toFixed(2);

        let totalXPersona1 = (valorFactura / noPersonas).toFixed(2);
        totalXPersona1 = parseFloat(totalXPersona1);
        propinaXPersona = parseFloat(propinaXPersona);
        let totalXPersona = (totalXPersona1 + propinaXPersona).toFixed(2);
        resultadoTotal.textContent = `$${totalXPersona}`;
    }
}

desactivarResetearBtn();