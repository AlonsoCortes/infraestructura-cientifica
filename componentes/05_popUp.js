export function generarPopupHTML(props) {
    const nombre = props.nombre_equipo || 'Sin nombre';
    const categoria = props.categoria_general || '';
    const subtipo = props.subtipo_tecnica || '';
    const area = props.area_aplicacion || '';
    const institucion = props.institucion || '';
    const responsable = props.responsable_tecnico || '';
    const observaciones = props.observaciones || '';
    const estado = props.estado || '';
    const direccion = props.direccion || '';

    return `
        <div class="popup-content">
            <b class="popupTitulo">${nombre}</b>
            ${categoria ? `<div class="popup-category"><b>${categoria}</b></div>` : ''}
            ${subtipo ? `<div style="text-align:center;"><i>${subtipo}</i></div>` : ''}
            ${area ? `<div class="popup-area">${area}</div>` : ''}
            
            ${institucion ? `<div><b>Institución:</b> ${institucion}</div>` : ''}
            ${responsable ? `<div><b>Responsable técnico:</b> ${responsable}</div>` : ''}
            ${estado ? `<div><b>Entidad:</b> ${estado}</div>` : ''}
            ${direccion ? `<div><b>Dirección:</b> ${direccion}</div>` : ''}
            ${observaciones ? `<div style="margin-top:6px;"><b>Nota:</b> ${observaciones}</div>` : ''}
        </div>
    `;
}
