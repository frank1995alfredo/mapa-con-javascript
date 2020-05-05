class UI {
    constructor() {
        //instanciar API
        this.api = new API();
        //crear los markers con layerGropu
        this.markers = new L.LayerGroup();

         // Iniciar el mapa
         this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);
         return map;
    }

    mostrarEstablecimientos(){
         this.api.obtenerDatos()
                .then(datos => {
                    const resultado = datos.respuestaJson.results;
                    //ejectar la funciones para mostrar los pines
                   this.mostrarPines(resultado);
                })
    }

    mostrarPines(datos){
        //limpiar los markers
        this.markers.clearLayers();
        //recorres los establecimientos
        datos.forEach(dato => {
            const {latitude, longitude, calle, regular, premium} = dato;
            //crear Popup
            const opcionesPopUp = L.popup()
                  .setContent(`
                  <p>Calle: ${calle}</p>
                  <p><b>Regular: </b>$${regular}</p>
                  <p><b>Premium: </b>$${premium}</p>
                  `);

            //agregar pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });
        this.markers.addTo(this.mapa);

    }
    //buscador
    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
             .then(datos => {
                 const resultados = datos.respuestaJson.results;

                 this.filtrarSugerencias(resultados, busqueda);
             })
    }

    filtrarSugerencias(resultado, busqueda){
           //filtrar
           const filtro = resultado.filter(filtro => filtro.calle.indexOf(busqueda) !== -1) ;
           //mostrar pines
           this.mostrarPines(filtro);
    }
}