import multer from "multer"; //permite manejar solicitudes HTTP con archivos adjuntos
import { fileURLToPath } from "url";
import { dirname } from "path"; //para obtener nombre de archivo y directorio actual

// fileURLToPath convierte una URL en un formato de archivo de sistema de archivos
// y dirname devuelve el nombre del directorio que contiene el archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuracion de Storage para multer
const storage = multer.diskStorage({
  //maneja almacenamiento de archivos, como ruta de destino y nombre
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Exporta la función de multer configurada y nos da el almacenamiento configurado anteriormente
export const uploader = multer({ storage });
export default __dirname;
