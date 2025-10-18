// La siguiente función  tiene por objetivo filtrar los elementos del mapa (infraestrictura científica) de acuerdo a la selección
// del elemento correspondiente de la lista desplegable ubicada en el menú lateralde la barra de navegación
// La lógica de la función es la siguiente:
// 1. Se crea una variable que hace referencia al elemento "filtroCategorias" del HTML
// 2. Cuando en este elemento suceda el evento "change" (cambio de selección), se ejecuta la siguiente condicional:
//   - Si la categoría seleccionada es "all" (todas las categorías), 
//se elimina el filtro de la capa "infraestructura_layer" (se muestran todos los puntos)
//   - Si se selecciona una categoría específica, se aplica un filtro a la capa 
// "infraestructura_layer" para mostrar solo los puntos cuya propiedad "NGCategori" coincida con el valor seleccionado


export function filtroCapa(map) {
    const filtroCategorias = document.getElementById('filtroCategorias');

    filtroCategorias.addEventListener('change', () => {
        const categoriaSeleccionada = filtroCategorias.value;

        // Obtener la fuente original
        const source = map.getSource('puntosInfraestructura_Source');

        // Si el filtro no es "todos"
        if (categoriaSeleccionada !== "all") {
            // Recarga el GeoJSON original sin clustering
            fetch('datos/infraestructura_cientifica.geojson')
                .then(response => response.json())
                .then(data => {
                    // Filtra los features directamente por subtipo_tecnica
                    const filtrados = {
                        type: 'FeatureCollection',
                        features: data.features.filter(
                            f => f.properties.subtipo_tecnica === categoriaSeleccionada
                        )
                    };
                    // Actualiza la fuente (sin clusters)
                    source.setData(filtrados);
                });
        } else {
            // Si es "all", recarga todos los datos otra vez
            fetch('datos/infraestructura_cientifica.geojson')
                .then(response => response.json())
                .then(data => source.setData(data));
        }
    });
}


// export function filtroCapa(map) {
//     const filtroCategorias = document.getElementById('filtroCategorias');
//     // Agregar evento de cambio al menú desplegable
//     filtroCategorias.addEventListener('change', () => {
//         const categoriaSeleccionada = filtroCategorias.value;
//         // Aplicar el filtro a la capa de puntos de interés
//         if (categoriaSeleccionada === "all"){
//             map.setFilter('infraestructura_layer', null);
//         } else{
//             map.setFilter('infraestructura_layer', ['==', ['get', 'subtipo_tecnica'], parseInt(categoriaSeleccionada)]);
//         }
//         console.log(filtroCategorias.value)
//     })
// }