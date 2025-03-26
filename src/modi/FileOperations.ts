import fs from "fs";
import chalk from "chalk";
import path from "path";

/**
 * Function that list the contents of a directory
 * @param directory The route to the directory we want to make lsit
 */
export function list(directory: string) {
  const dirPath = `./${directory}`;
  fs.access(dirPath, fs.constants.F_OK, (errAccess) => {
    if (errAccess) {
      console.log("ERROR: No se encuentra la ruta");
      return;
    } else {
      // Listar los contenidos del directorio
      fs.readdir(dirPath, "utf-8", (error, data) => {
        if (error) {
          console.log(chalk.red("ERROR: The path does not exist"));
          return;
        }
        try {
          data.forEach((element) => {
            let filePath = `./${directory}/${element}`;
            fs.stat(filePath, (err, stats) => {
              if (err) {
                console.log("ERROR: no stats");
                return;
              }

              try {
                console.log(element);
                console.log(`\tModificación: ${stats.mtime}`);
                console.log(`\tTamaño: ${stats.size}`);
              } catch (stat_error) {
                console.log("ERROR: Cant read stats");
              }
            });
          });
        } catch (catched_error) {
          console.log("ERROR: Reading");
        }
      });
    }
  });
}

/**
 * Function that soft delete a file
 * @param directory The path of the file we want to delete
 * @param file The name of the file we want to delete
 */
export function remove(directory: string, file: string) {
  const dirPath = `./${directory}`;
  const filePath = path.join(dirPath, `/${file}`);

  // Check if the directory exists
  fs.access(dirPath, fs.constants.F_OK, (errDir) => {
    if (errDir) {
      console.log("ERROR: The path does not exist");
      return;
    }
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (errFile) => {
      if (errFile) {
        console.log(chalk.red("ERROR: The file does not exist"));
        return;
      }
      fs.copyFile(filePath, `./basura/${file}`, (errc) => {
        if (errc) {
          console.log("Error in the copy of file");
          console.log(errc);
          return;
        }
        fs.rm(filePath, (errr) => {
          if (errr) {
            console.log("Error in the rm of file");
            return;
          }
        });
      });
    });
  });
  console.log("Fichero eliminado de manera segura");
}

/**
 * Function that copies the route in src at dst direction
 * @param src route to copy
 * @param dst destiny route for the copy
 * @returns void
 */
export function move(src: string, dst: string) {
  if (src === dst) {
    console.log("Invalid Operation");
    return;
  }
  const srcPath = path.normalize(`./${src}`)
  const dstPath = path.normalize(`./${dst}`)
  fs.access(srcPath, fs.constants.F_OK, (errDir) => {
    if (errDir) {
      console.log("ERROR: The src path does not exist");
      return;
    }
    fs.access(dstPath, fs.constants.F_OK, (errDst) => {
      if (errDst) {
        console.log("ERROR: The dst path does not exist");
        return;
      }
      fs.cp(srcPath, dstPath, {recursive: true, force: true}, (errC) => {
        if (errC) {
          console.log("ERROR: Couldn't copy the route");
          console.log(errC);
          return;
        }
        fs.rmdir(srcPath, {recursive: true}, (errr) => {
          if (errr) {
            console.log("Error in the rm of file");
            return;
          }
        });
      });
    });
  });
}

// list(".");
// remove('./users/test', 'a.txt')
move('users', 'basura');
