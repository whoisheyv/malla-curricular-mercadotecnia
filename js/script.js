const dependencias = {
    "intro-mat": ["mat-1"],
    "intro-ing": ["ing-1"],
    "mat-1": ["mat-2"],
    "ing-1": ["ing-2"],
    "comp-1": ["comp-2"],
    "eco-1": ["micro"],
    "micro": ["macro"],
    "ing-2": ["ing-3"],
    "ing-3": ["ing-4"],
    "estadistica": ["regresion", "investigacion-1"],
    "mercadotecnia-1": ["mercadotecnia-2"],
    "mercadotecnia-2": ["publicidad", "estrategias"],
    "proyecto-2": ["opt-4"],
    "investigacion-2": ["mercado-internacional"],
    "taller-2": ["emprendedores"],
    "proyecto-3": ["proyecto-profesional"]
};

const estado = {};

function inicializar() {
    document.querySelectorAll(".course").forEach(curso => {
        estado[curso.id] = false;
        curso.addEventListener("click", () => {
            if (!curso.classList.contains("locked")) {
                estado[curso.id] = !estado[curso.id];
                actualizarEstado();
            }
        });
    });
    actualizarEstado();
}

function actualizarEstado() {
    document.querySelectorAll(".course").forEach(curso => {
        const id = curso.id;
        curso.classList.remove("completed", "locked");

        if (estado[id]) {
            curso.classList.add("completed");
        } else {
            const bloqueadoPor = Object.keys(dependencias).filter(pre => dependencias[pre].includes(id));
            const habilitado = bloqueadoPor.length === 0 || bloqueadoPor.every(pre => estado[pre]);
            if (!habilitado) curso.classList.add("locked");
        }
    });
}

window.addEventListener("DOMContentLoaded", inicializar);
