// Script de prueba: Bucle continuo de inserciones para probar Failover
let contador = 1;

while (contador <= 100000) {
    try {
        db.getSiblingDB("ReproStage").telemetria.insertOne({
            evento: "Prueba de Failover",
            iteracion: contador,
            fecha: new Date()
        });
        print("Insertado registro numero: " + contador);
        // Pausa de medio segundo para darte tiempo a apagar el servidor primario
        sleep(500); 
    } catch (error) {
        print("Error de conexion en iteracion " + contador + ". El cluster esta eligiendo nuevo PRIMARY...");
        sleep(2000); // Esperamos a que termine la votacion del Arbitro
    }
    contador++;
}