const cronometro = document.getElementById("cronometro");
const botonIniciar = document.getElementById("boton-inicio-pausa");
const botonReinicio = document.getElementById("boton-reiniciar");

let horas = 0;
let minutos = 0;
let segundos = 0;
let centesimas = 0;
let intervaloTiempo;
let estadoBoton = "pausado";

function actualizarCronometro() {
    centesimas++;

    if (centesimas / 100 == 1) {
        segundos++;
        centesimas = 0;
        if (segundos / 60 == 1) {
            minutos++;
            segundos = 0;

            if (minutos / 60 == 1) {
                horas++;
                minutos = 0;
            }
        }
    }

    formatearCronometro();

}

botonIniciar.addEventListener("click", function () {
    if (estadoBoton == "pausado") {
        intervaloTiempo = window.setInterval(actualizarCronometro, 10);
        botonIniciar.classList.remove("iniciar");
        botonIniciar.classList.add("pausar");
        botonIniciar.innerHTML = '<img src="img/pausa.png" alt="pausa">';
        estadoBoton = "iniciado";
    } else {
        pausar();
    }

});

botonReinicio.addEventListener("click", function () {
    segundos = 0;
    minutos = 0;
    horas = 0;
    centesimas = `00`;

    formatearCronometro();

    pausar();

});


function asignarFormato(unidadDeTiempo) {
    if (unidadDeTiempo < 10) {
        return `0${unidadDeTiempo}`;
    } else {
        return unidadDeTiempo;
    }
}

function formatearCronometro() {
    let segundosConFormato = asignarFormato(segundos);
    let minutosConFormato = asignarFormato(minutos);
    let horasConFormato = asignarFormato(horas);

    cronometro.innerHTML = `${horasConFormato}:${minutosConFormato}:${segundosConFormato}<span class="centesimas">:${centesimas}</span>`;
}

function pausar() {
    window.clearInterval(intervaloTiempo);
    botonIniciar.classList.remove("pausar");
    botonIniciar.classList.add("iniciar");
    botonIniciar.innerHTML = '<img src="img/inicio.png" alt="inicio">';
    estadoBoton = "pausado";
}
