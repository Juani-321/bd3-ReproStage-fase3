// Script de prueba: Transacción ACID - Escenario de Éxito (Commit)
const sesionNueva = db.getMongo().startSession();
const dbRepro = sesionNueva.getDatabase("ReproStage");

sesionNueva.startTransaction();

try {
  // 1. Insertamos el nuevo servicio
  dbRepro.servicios.insertOne({ cliente: "Juan", vehiculo: "VW Gol", tipo: "Stage 1", fecha: new Date() });
  
  // 2. Actualizamos el contador del cliente
  dbRepro.clientes.updateOne({ nombre: "Juan" }, { $inc: { repros_realizadas: 1 } });
  
  // 3. Confirmamos la transacción
  sesionNueva.commitTransaction();
  print("Transaccion ACID ejecutada con exito. Los datos estan seguros.");

} catch (error) {
  sesionNueva.abortTransaction();
  print("Error en la operacion: " + error);
} finally {
  sesionNueva.endSession();
}