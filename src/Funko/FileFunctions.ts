import fs from "fs";
import { FunkoPop } from "./Funko.js";
import chalk from "chalk";
import path from "path";

/**
 * Method to write a funko instance in a file asynchronously using callbacks.
 * The function parameters remain as in the original; results and errors are handled internally.
 * @param user the user account
 * @param funko the funko to write
 */
export function writeFunkoPopToFile(
  user: string,
  funko: FunkoPop,
): number | undefined {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  // Check if the directory exists
  fs.access(dirPath, fs.constants.F_OK, (errAccess) => {
    if (errAccess) {
      console.log(
        chalk.yellow("WARNING: The path does not exist, creating..."),
      );
      fs.mkdir(dirPath, { recursive: true }, (errMkdir) => {
        if (errMkdir) {
          console.log(chalk.red("Error creating directory:", errMkdir.message));
          return;
        }
        console.log(chalk.green("Directory created"));
        proceedWrite();
      });
    } else {
      proceedWrite();
    }
  });

  function proceedWrite() {
    fs.readFile(filePath, "utf-8", (errRead, data) => {
      let funkos: FunkoPop[] = [];
      // If file doesn't exist or error in reading, consider data as empty.
      if (errRead) {
        data = "";
      }
      if (data.trim().length > 0) {
        try {
          funkos = JSON.parse(data);
        } catch (error: any) {
          console.log(chalk.red("Error parsing JSON file"));
          return;
        }
      }
      // Check if the funko with the given id already exists
      if (data.includes(`"_id": ${funko.id}`)) {
        console.log(chalk.red("ERROR: The ID already exists"));
        return;
      }
      funkos.push(funko);
      fs.writeFile(filePath, JSON.stringify(funkos, null, 2), (errWrite) => {
        if (errWrite) {
          console.log(chalk.red("Error writing file:", errWrite.message));
          return;
        }
        console.log(
          chalk.green(`FunkoPop with ID ${funko.id} added successfully`),
        );
      });
    });
  }

  // Debido a la naturaleza asíncrona, no se puede retornar el valor de forma inmediata.
  return funko._id;
}

/**
 * Method to read all the funkos from a file asynchronously using callbacks.
 * The function parameters remain as in the original; the output is shown via console.log.
 * @param user the user account
 */
export function readFunkoPopsFromFile(user: string): string | undefined {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  // Check if the directory exists
  fs.access(dirPath, fs.constants.F_OK, (errDir) => {
    if (errDir) {
      console.log(chalk.red("ERROR: The path does not exist"));
      return;
    }
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (errFile) => {
      if (errFile) {
        console.log(chalk.red("ERROR: The file does not exist"));
        return;
      }
      fs.readFile(filePath, "utf-8", (errRead, data) => {
        if (errRead) {
          console.log(chalk.red("Error reading file:", errRead.message));
          return;
        }
        let funkos: FunkoPop[];
        try {
          funkos = JSON.parse(data);
        } catch (error: any) {
          console.log(chalk.red("Error parsing JSON file"));
          return;
        }
        let result = "";
        funkos.forEach((funko) => {
          result += `Name: ${funko._name}\n\t`;
          const priceColor =
            funko._price <= 10
              ? chalk.red
              : funko._price > 10 && funko._price <= 20
                ? chalk.yellow
                : funko._price > 20 && funko._price <= 30
                  ? chalk.yellowBright
                  : chalk.green;

          console.log(
            `Name: ${funko._name}\n\t` +
              `Description: ${funko._description}\n\tType: ${funko._type}\n\tGender: ${funko._gender}\n\tFranchise: ${funko._franchise}\n\tSID: ${funko._sid}\n\tExclusive: ${funko._exclusive}\n\tQualities: ${funko._qualities}\n\tPrice: ${priceColor(funko._price.toString())}\n\t`,
          );
        });
      });
    });
  });

  return;
}

/**
 * Method to delete a funko from a file asynchronously using callbacks.
 * The function parameters remain as in the original; the result is logged to the console.
 * @param user the user account
 * @param id the id of the funko to delete
 */
export function deleteFunkoPopFromFile(
  user: string,
  id: number,
): string | undefined {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  fs.access(dirPath, fs.constants.F_OK, (errDir) => {
    if (errDir) {
      console.log(chalk.red("ERROR: The path does not exist"));
      return;
    }
    fs.access(filePath, fs.constants.F_OK, (errFile) => {
      if (errFile) {
        console.log(chalk.red("ERROR: The file does not exist"));
        return;
      }
      fs.readFile(filePath, "utf-8", (errRead, data) => {
        if (errRead) {
          console.log(chalk.red("Error reading file:", errRead.message));
          return;
        }
        let funkos: FunkoPop[];
        try {
          funkos = JSON.parse(data);
        } catch (error: any) {
          console.log(chalk.red("Error parsing JSON file"));
          return;
        }
        let found = false;
        for (let i = 0; i < funkos.length; i++) {
          if (funkos[i]._id === id) {
            funkos.splice(i, 1);
            found = true;
            break;
          }
        }
        if (!found) {
          console.log(chalk.red("ERROR: The ID does not exist"));
          console.log("deleted");
          return;
        }
        fs.writeFile(filePath, JSON.stringify(funkos, null, 2), (errWrite) => {
          if (errWrite) {
            console.log(chalk.red("Error writing file:", errWrite.message));
            return;
          }
          console.log(
            chalk.green(`FunkoPop with ID ${id} deleted successfully`),
          );
          console.log("deleted");
        });
      });
    });
  });
  return;
}

/**
 * Method to modify a funko from a file asynchronously using callbacks.
 * The function parameters remain as in the original; the modified funko is shown en consola.
 * @param user the user account
 * @param id the id of the funko to modify
 * @param funko the funko to modify
 */
export function modifyFunkoPopFromFile(
  user: string,
  id: number,
  funko: FunkoPop,
): undefined | FunkoPop {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  fs.access(dirPath, fs.constants.F_OK, (errDir) => {
    if (errDir) {
      console.log(chalk.red("ERROR: The path does not exist"));
      return;
    }
    fs.access(filePath, fs.constants.F_OK, (errFile) => {
      if (errFile) {
        console.log(chalk.red("ERROR: The file does not exist"));
        return;
      }
      fs.readFile(filePath, "utf-8", (errRead, data) => {
        if (errRead) {
          console.log(chalk.red("Error reading file:", errRead.message));
          return;
        }
        let funkos: FunkoPop[];
        try {
          funkos = JSON.parse(data);
        } catch (error: any) {
          console.log(chalk.red("Error parsing JSON file"));
          return;
        }
        let modified = false;
        for (let i = 0; i < funkos.length; ++i) {
          if (funkos[i]._id === id) {
            funkos[i] = funko;
            modified = true;
            break;
          }
        }
        if (!modified) {
          console.log(chalk.red("ERROR: The ID does not exist"));
          return;
        }
        fs.writeFile(filePath, JSON.stringify(funkos, null, 2), (errWrite) => {
          if (errWrite) {
            console.log(chalk.red("Error writing file:", errWrite.message));
            return;
          }
          console.log(
            chalk.green(`FunkoPop with ID ${id} modified successfully`),
          );
        });
      });
    });
  });
  return funko;
}

/**
 * Method to view a funko from a file asynchronously using callbacks.
 * The function parameters remain as in the original; the funko details se muestran en consola.
 * @param user the user account
 * @param id the id of the funko to view
 */
export function viewOneFunkoFromFile(
  user: string,
  id: number,
): string | undefined {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  fs.access(dirPath, fs.constants.F_OK, (errDir) => {
    if (errDir) {
      console.log(chalk.red("ERROR: The path does not exist"));
      return;
    }
    fs.access(filePath, fs.constants.F_OK, (errFile) => {
      if (errFile) {
        console.log(chalk.red("ERROR: The file does not exist"));
        return;
      }
      fs.readFile(filePath, "utf-8", (errRead, data) => {
        if (errRead) {
          console.log(chalk.red("Error reading file:", errRead.message));
          return;
        }
        let funkos: FunkoPop[];
        try {
          funkos = JSON.parse(data);
        } catch (error: any) {
          console.log(chalk.red("Error parsing JSON file"));
          return;
        }
        let found = false;
        for (let i = 0; i < funkos.length; i++) {
          if (funkos[i]._id === id) {
            const priceColor =
              funkos[i]._price <= 10
                ? chalk.red
                : funkos[i]._price > 10 && funkos[i]._price <= 20
                  ? chalk.yellow
                  : funkos[i]._price > 20 && funkos[i]._price <= 30
                    ? chalk.greenBright
                    : chalk.green;
            console.log(
              `Name: ${funkos[i]._name}\n\t` +
                `Description: ${funkos[i]._description}\n\tType: ${funkos[i]._type}\n\tGender: ${funkos[i]._gender}\n\tFranchise: ${funkos[i]._franchise}\n\tSID: ${funkos[i]._sid}\n\tExclusive: ${funkos[i]._exclusive}\n\tQualities: ${funkos[i]._qualities}\n\tPrice: ${priceColor(funkos[i]._price.toString())}\n\t`,
            );
            found = true;
            console.log("viewed");
            break;
          }
        }
        if (!found) {
          console.log(chalk.red("ERROR: The ID does not exist"));
        }
      });
    });
  });
  return;
}
