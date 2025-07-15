const mallaPorSemestre = {
    "Pre Primer Semestre": [
        { id: "intro-mat", name: "Intro Matemáticas", unlocks: ["mat-1"] },
        { id: "intro-ing", name: "Intro Inglés", unlocks: ["ing-1"] }
    ],
    "Primer Semestre": [
        { id: "mat-1", name: "Matemáticas 1", prereqs: ["intro-mat"], unlocks: ["mat-2"] },
        { id: "adm-1", name: "Principios de Administración" },
        { id: "nucleo-1", name: "Desarrollo del Pensamiento Crítico" },
        { id: "ing-1", name: "Inglés 1", prereqs: ["intro-ing"], unlocks: ["ing-2"] },
        { id: "comp-1", name: "Taller de Computación 1", unlocks: ["comp-2"] }
    ]
    // Agrega el resto de los semestres aquí siguiendo el mismo formato
};

const state = {};

function crearMalla() {
    const container = document.getElementById("malla");
    for (const [semestre, ramos] of Object.entries(mallaPorSemestre)) {
        const semestreDiv = document.createElement("div");
        semestreDiv.className = "semestre";
        semestreDiv.innerHTML = `<h2>${semestre}</h2>`;

        const ramosDiv = document.createElement("div");
        ramosDiv.className = "ramos";

        ramos.forEach(ramo => {
            const div = document.createElement("div");
            div.className = "course locked";
            div.id = ramo.id;
            div.innerText = ramo.name;
            div.onclick = () => toggleCourse(ramo.id);
            ramosDiv.appendChild(div);
            state[ramo.id] = false;
        });

        semestreDiv.appendChild(ramosDiv);
        container.appendChild(semestreDiv);
    }
    actualizarMalla();
}

function toggleCourse(id) {
    const curso = buscarCurso(id);
    if (document.getElementById(id).classList.contains("locked")) return;
    state[id] = !state[id];
    actualizarMalla();
}

function buscarCurso(id) {
    for (const ramos of Object.values(mallaPorSemestre)) {
        for (const curso of ramos) {
            if (curso.id === id) return curso;
        }
    }
    return null;
}

function actualizarMalla() {
    for (const [semestre, ramos] of Object.entries(mallaPorSemestre)) {
        ramos.forEach(curso => {
            const el = document.getElementById(curso.id);
            const completado = state[curso.id];
            const prereqsCompletos = !curso.prereqs || curso.prereqs.every(pr => state[pr]);

            if (completado) {
                el.className = "course completed";
            } else if (prereqsCompletos) {
                el.className = "course";
            } else {
                el.className = "course locked";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", crearMalla);
