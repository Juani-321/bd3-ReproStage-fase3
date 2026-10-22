const sesionFallo = db.getMongo().startSession();
const dbRepro = sesionFallo.getDatabase("ReproStage");
sesionFallo.startTransaction();
try {
  dbRepro.servicios.insertOne({ cliente: "Pedro", vehiculo: "Ford Focus", tipo: "Stage 2" });
  
  // Simulamos una violación de regla de negocio a mitad del proceso
  throw new Error("Regla de negocio violada: Tarjeta rechazada. Cancelando operación.");
  
  dbRepro.clientes.updateOne({ nombre: "Pedro" }, { $inc: { repros_realizadas: 1 } });
  sesionFallo.commitTransaction();
} catch (error) {
  sesionFallo.abortTransaction();
  print("Rollback ejecutado. Los datos no se guardaron. Motivo: " + error.message);
} finally {
  sesionFallo.endSession();
}