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

// Inicializa el estado de cursos como false (no aprobados)
const estado = {};

function inicializar() {
    const cursos = document.querySelectorAll(".course");
    cursos.forEach(curso => {
        const id = curso.id;
        estado[id] = false;

        curso.addEventListener("click", () => {
            if (!curso.classList.contains("locked")) {
                estado[id] = !estado[id];
                actualizarEstado();
            }
        });
    });

    actualizarEstado();
}

function actualizarEstado() {
    const cursos = document.querySelectorAll(".course");

    cursos.forEach(curso => {
        const id = curso.id;
        curso.classList.remove("completed", "locked");

        // Si está completado
        if (estado[id]) {
            curso.classList.add("completed");
        } else {
            // Si tiene prerequisitos, los revisamos
            const bloqueadoPor = Object.keys(dependencias).filter(pre => dependencias[pre].includes(id));
            const todosAprobados = bloqueadoPor.every(pre => estado[pre]);

            if (bloqueadoPor.length && !todosAprobados) {
                curso.classList.add("locked");
            }
        }
    });
}

window.addEventListener("DOMContentLoaded", inicializar);

