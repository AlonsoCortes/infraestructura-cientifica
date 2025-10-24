import { inicializarMapa } from './componentes/01_iniciarMapa.js';
import { cargarCapas } from './componentes/02_cargarCapas.js';
import {filtroCapa} from './componentes/03_filtroDatos.js';
import {vistaNacional} from './componentes/04_vistaNacional.js'

// Inicializar mapa
const map = inicializarMapa();
// Cargar capas de puntos de interés
cargarCapas(map);
filtroCapa(map);
vistaNacional(map);

// === Mostrar / ocultar aside en móviles ===
// document.getElementById('toggleAside').addEventListener('click', () => {
//     document.querySelector('aside').classList.toggle('visible');
// });

