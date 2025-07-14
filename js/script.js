const mallaData = [
    { id: 'intro-mat', name: 'Intro Matemáticas', unlocks: ['mat-1'] },
    { id: 'intro-ing', name: 'Intro Inglés', unlocks: ['ing-1'] },
    { id: 'mat-1', name: 'Matemáticas 1', unlocks: ['mat-2'], prereqs: ['intro-mat'] },
    { id: 'adm-1', name: 'Principios de Administración' },
    { id: 'nucleo-1', name: 'Desarrollo del Pensamiento Crítico' },
    { id: 'ing-1', name: 'Inglés 1', unlocks: ['ing-2'], prereqs: ['intro-ing'] },
    { id: 'comp-1', name: 'Taller de Computación 1', unlocks: ['comp-2'] },
    { id: 'mat-2', name: 'Matemáticas 2', prereqs: ['mat-1'] },
    { id: 'eco-1', name: 'Principios de Economía', unlocks: ['micro'] },
    { id: 'nucleo-2', name: 'Comunicación e Investigación' },
    { id: 'ing-2', name: 'Inglés 2', unlocks: ['ing-3'], prereqs: ['ing-1'] },
    { id: 'comp-2', name: 'Taller de Computación 2', prereqs: ['comp-1'] },
    { id: 'opt-1', name: 'Venta Personal' },
    { id: 'opt-2', name: 'Administración de Ventas' },
    { id: 'opt-3', name: 'Análisis del Comportamiento del Consumidor' },
    { id: 'opt-4', name: 'Distribución y Comercialización', prereqs: ['finanzas-1'] },
    { id: 'opt-5', name: 'Temas Selectos de Mercadotecnia' },
    { id: 'opt-6', name: 'Plan de Mercadotecnia' },
    { id: 'micro', name: 'Microeconomía', unlocks: ['macro'], prereqs: ['eco-1'] },
    { id: 'macro', name: 'Macroeconomía', prereqs: ['micro'] },
    { id: 'ing-3', name: 'Inglés 3', unlocks: ['ing-4'], prereqs: ['ing-2'] },
    { id: 'ing-4', name: 'Inglés 4', unlocks: ['ing-5'], prereqs: ['ing-3'] },
    { id: 'ing-5', name: 'Inglés 5', prereqs: ['ing-4'] },
    { id: 'estadistica', name: 'Estadística para Negocios', unlocks: ['regresion', 'investigacion-1'] },
    { id: 'regresion', name: 'Regresión y Predicción', prereqs: ['estadistica'] },
    { id: 'investigacion-1', name: 'Investigación de Mercados 1', prereqs: ['estadistica'] },
    { id: 'mercadotecnia-1', name: 'Mercadotecnia', unlocks: ['mercadotecnia-2'] },
    { id: 'mercadotecnia-2', name: 'Mercadotecnia 2', unlocks: ['publicidad', 'estrategias'], prereqs: ['mercadotecnia-1'] },
    { id: 'publicidad', name: 'Publicidad y Mercados' },
    { id: 'estrategias', name: 'Estrategias de Precios y Productos' },
    { id: 'negocios', name: 'Negocios y Sociedad' },
    { id: 'finanzas-1', name: 'Proyecto Integración 2 Finanzas 1', unlocks: ['opt-4'] },
    { id: 'investigacion-2', name: 'Investigación de Mercados 2', unlocks: ['mercadotecnia-int'], prereqs: ['investigacion-1'] },
    { id: 'mercadotecnia-int', name: 'Mercadotecnia Internacional' },
    { id: 'liderazgo', name: 'Liderazgo y Estrategia de Negocios' },
    { id: 'producto', name: 'Administración del Producto' },
    { id: 'ventas-pro', name: 'Administración de Ventas Profesionales' },
    { id: 'proyecto-prof', name: 'Proyecto Profesional' },
];

const state = {};

function createMalla() {
    const container = document.getElementById('malla');
    mallaData.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course locked';
        div.id = course.id;
        div.innerText = course.name;
        div.onclick = () => toggleCourse(course.id);
        container.appendChild(div);
        state[course.id] = false;
    });
    updateMalla();
}

function toggleCourse(id) {
    const course = mallaData.find(c => c.id === id);
    if (document.getElementById(id).classList.contains('locked')) return;
    state[id] = !state[id];
    updateMalla();
}

function updateMalla() {
    mallaData.forEach(course => {
        const div = document.getElementById(course.id);
        const completed = state[course.id];
        const prereqsCompleted = !course.prereqs || course.prereqs.every(pr => state[pr]);
        if (completed) {
            div.className = 'course completed';
        } else if (prereqsCompleted) {
            div.className = 'course';
        } else {
            div.className = 'course locked';
        }
    });
}

document.addEventListener('DOMContentLoaded', createMalla);

