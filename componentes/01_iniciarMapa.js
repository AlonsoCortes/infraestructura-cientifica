// La siguiente función inicia el mapa centrado en las coordenadas del usuario
// La lógica de la función es la siguiente:
// 1. crea en objeto de tipo maplibregl.Map
// 2. define el contenedor del mapa (div con id "map")
// 3. define el estilo del mapa (en este caso, un estilo de MapTiler basado en OpenStreetMap)
// 4. define la posición inicial del mapa (coordenadas del usuario)
// 5. define el nivel de zoom inicial del mapa (12)



export function inicializarMapa() {
    return new maplibregl.Map({
        container: 'map', // container id
        style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=7PnRPAP4nHo0p12bYHlb', // style URL
        center: [-102.00870492534635, 22.88244675595126], // starting position [lng, lat] 22.88244675595126, -102.00870492534635
        zoom: 4.5 // starting zoom
    });
}