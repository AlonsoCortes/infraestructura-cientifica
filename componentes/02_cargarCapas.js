// La siguiente función carga las capas de puntos de interés en el mapa
// La lógica de la función es la siguiente:
// 1. Espera a que el mapa se haya cargado completamente (evento 'load')
// 2. Añade una fuente de datos de tipo GeoJSON que contiene los puntos de interés
// 3. Añade una capa de tipo 'circle' para representar los puntos de interés en el mapa
// 4. Define el estilo de los círculos (radio, color, borde) y utiliza una expresión 'match' 
//    para asignar colores específicos según la categoría del punto de interés 

export function cargarCapas(map){

    map.on('load', () => { 
        map.addSource('puntosInfraestructura_Source', { 
            type: 'geojson',
            //data: 'https://services2.arcgis.com/RVvWzU3lgJISqdke/ArcGIS/rest/services/nombregeografico/FeatureServer/0/query?where=1%3D1&objectIds=&geometry=-75.2920%2C+4.3831%2C+-75.1151%2C+4.5297&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&collation=&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=' // Ruta al archivo GeoJSON
            data: 'datos/infraestructura_cientifica.geojson',// Ruta
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 20 // Radius of each cluster when clustering points (defaults to 50)
        });
        // Añade la capa al mapa
        map.addLayer({ 
            'id': 'infraestructura_layer',
            'type': 'circle',
            'source': 'puntosInfraestructura_Source',
            'filter':['has', 'point_count'],
            'paint': {
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#48C9B0',
                    25, '#17A589',
                    50,'#117864',
                    150,'#154360'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    10,   // ← tamaño (en píxeles) para infraestructura_layer con <n puntos
                    25, 13,
                    50,  16,  // ← si tiene ≥N puntos → radio de N px
                    150, 19   // ← si tiene ≥N puntos → radio de N px
                ]
                // Estilo de los círculos
            }
        })
        // Añadir capa de conteo de clusters y puntos no agrupados
        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'puntosInfraestructura_Source',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['Noto Sans Regular'],
                'text-size': 8
            },
            paint: {
                'text-color': [
                    'step',
                    ['get', 'point_count'],
                    '#000000',  // texto negro para círculos claros
                    150, '#ffffff'  // texto blanco para círculos oscuros
                    ]               
            }
        });
        // Añade la capa de puntos individuales

        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'puntosInfraestructura_Source',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#A3E4D7',
                'circle-radius': 5,
                'circle-stroke-width': 0.5,
                'circle-stroke-color': '#000000ff'
            }
        });
        // Evento
        map.on('click', 'infraestructura_layer', async (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['infraestructura_layer']
            });
            const clusterId = features[0].properties.cluster_id;
            const zoom = await map.getSource('puntosInfraestructura_Source').getClusterExpansionZoom(clusterId);
            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom
            });
        });
        // Cuando el usuario hace clic en un punto no agrupado, se muestra un popup con información
        // Evento para expandir clusters
map.on('click', 'infraestructura_layer', async (e) => {
    const features = map.queryRenderedFeatures(e.point, {
        layers: ['infraestructura_layer']
    });
    const clusterId = features[0].properties.cluster_id;
    const zoom = await map.getSource('puntosInfraestructura_Source').getClusterExpansionZoom(clusterId);
    map.easeTo({
        center: features[0].geometry.coordinates,
        zoom
    });
});

// Evento para mostrar popup en puntos individuales
        map.on('click', 'unclustered-point', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const props = e.features[0].properties;

            // Extrae tus propiedades reales
            const nombre = props.nombre_equipo || 'Sin nombre';
            const categoria = props.categoria_general || 'Sin categoría';
            const subtipo = props.subtipo_tecnica || 'Sin subtipo';
            const area = props.area_aplicacion || 'Sin área';
            const observaciones = props.observaciones || '';
            const institucion = props.institucion || 'Sin institución';
            const responsable = props.responsable_tecnico || '';
            const estado = props.estado || '';
            const direccion = props.direccion || '';


            // Corrige si el mapa cruza el meridiano 180
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Construye el contenido del popup
            const popupHTML = `
                <div style="font-family: 'Noto Sans', sans-serif; font-size: 12px; line-height: 1.4;">
                    <b style="font-size:15px; color:#0E6251;">${nombre}</b><br>
                    <style="color:#117864;"><b>${categoria}</b></><br>
                    <i>${subtipo}</i><br>
                    <style="color:#1B4F72;">${area}</><br>
                    <br>
                    ${institucion ? `<div><b>Institución:</b> ${institucion}</div>` : ''}
                    ${responsable ? `<div><b>Responsable técnico:</b> ${responsable}</div>` : ''}
                    <br>
                    ${observaciones ? `<div style="margin-top:4px;"><b>Nota:</b> ${observaciones}</div>` : ''}
                    <br>
                    ${estado ? `<div><b>Entidad:</b> ${estado}</div>` : ''}
                    ${direccion ? `<div><b>Dirección:</b> ${direccion}</div>` : ''}
                </div>
            `;

            // Muestra el popup
            new maplibregl.Popup()
                .setLngLat(coordinates)
                .setHTML(popupHTML)
                .addTo(map);
        });

       

        map.on('mouseenter', 'infraestructura_layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'infraestructura_layer', () => {
            map.getCanvas().style.cursor = '';
        });

    });
}