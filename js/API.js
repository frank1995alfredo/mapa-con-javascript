class API{
    async obtenerDatos(){
        const total = 100;
        //obtener los datos desde la api
        const datos  = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);
  
       //retornar datos como json
       const respuestaJson = await datos.json();      
       return{
           respuestaJson
       }
    }
}