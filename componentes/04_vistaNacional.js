export function vistaNacional(map){
    document.getElementById('ajuste').addEventListener('click', () => {
        map.fitBounds([
            [-120, 11],
            [-85, 34]
        ]);

})
}
