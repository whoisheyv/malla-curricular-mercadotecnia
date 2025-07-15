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

function marcar(id) {
    const curso = document.getElementById(id);
    if (curso.classList.contains("locked")) return;

    curso.classList.toggle("completed");
    actualizarDesbloqueos();
}

function actualizarDesbloqueos() {
    document.querySelectorAll(".course").forEach(curso => {
        curso.classList.add("locked");
    });

    document.querySelectorAll(".completed").forEach(curso => {
        curso.classList.remove("locked");
        const siguientes = dependencias[curso.id];
        if (siguientes) {
            siguientes.forEach(sig => {
                document.getElementById(sig).classList.remove("locked");
            });
        }
    });
}

window.onload = () => {
    document.querySelectorAll(".course").forEach(curso => {
        curso.onclick = () => marcar(curso.id);
    });
    actualizarDesbloqueos();
};
