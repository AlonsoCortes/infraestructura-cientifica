import { inicializarMapa } from './componentes/01_iniciarMapa.js';
import { cargarCapas } from './componentes/02_cargarCapas.js';
import {filtroCapa} from './componentes/03_filtroDatos.js';
import {vistaNacional} from './componentes/04_vistaNacional.js'
// Variables
const ingresarDatos = document.getElementById('ingresarDatos') // Botón para ingresar datos de búsqueda
const btnBuscar = document.getElementById('btnBuscar') // Botón para iniciar búsqueda
const txtVisualizacionDistancia = document.getElementById('visualizacionDsistancia') // Span para mostrar la distancia
const btnlimpiarRuta = document.getElementById('btnlimpiarRuta') // Botón para limpiar la ruta
// Inicializar mapa
const map = inicializarMapa();
// Cargar capas de puntos de interés
cargarCapas(map);
filtroCapa(map);
vistaNacional(map);
