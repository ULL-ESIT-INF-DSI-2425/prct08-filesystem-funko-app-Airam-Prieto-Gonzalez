import * as fs from "fs";
import { FunkoPop } from "./Funko.js";
import chalk from "chalk";
import path from "path";

/**
 * Method to write a funko instance in a file
 * @param user the user account
 * @param funko the funko to write
 * @returns the name of the funko if success
 */
export function writeFunkoPopToFile(user: string, funko: FunkoPop): number | undefined {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  try {
    // See if the directory exist
    if (!fs.existsSync(dirPath)) {
      console.log(chalk.yellow("WARNING: The path does not exist, creating..."));
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(chalk.green("Directory created"));
    }

    // Initialice the list with the funkos
    let funkos: FunkoPop[] = [];
    const fileData = fs.readFileSync(filePath, "utf-8");
    if (fs.existsSync(filePath)) {
      try {
        if (fileData.trim().length > 0) {
          funkos = JSON.parse(fileData);
        } else {
          funkos = [];
        }
      } catch (error) {
        console.log(chalk.red("Error parsing JSON file"));
        return;
      }
    }

    // if the list already have the funko with the id, returns
    if (fileData.includes('_id": ' + funko.id.toString())) {
      console.log(chalk.red("ERROR: The ID already exists"));
      return undefined;
    }

    // else writes the funko
    funkos.push(funko);

    fs.writeFileSync(filePath, JSON.stringify(funkos, null, 2));
    console.log(chalk.green(`FunkoPop with ID ${funko.id} added successfully`));
    return funko._id;
  } catch (error) {
    console.log(chalk.red("Error:", (error as Error).message));
  }
  return;
}

/**
 * Method to read all the funkos from a file
 * @param user the user account
 * @returns the funkos as a string
 */
export function readFunkoPopsFromFile(user: string): string | undefined{
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  // Check if the path and the file exist
  if (!fs.existsSync(dirPath)) {
    console.log(chalk.red("ERROR: The path does not exist"));
    return;
  }

  // Check if the file exist
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("ERROR: The file does not exist"));
    return;
  }

  try {
    // print the funkos
    const fileData = fs.readFileSync(filePath, "utf-8");
    const funkos: FunkoPop[] = JSON.parse(fileData);
    let result = "";
    funkos.forEach((funko) => {
      result += `Name: ${funko._name}\n\t`
const priceColor = funko._price <= 10 ? chalk.red 
        : funko._price > 10 && funko._price <= 20 ? chalk.yellow
        : funko._price > 20 && funko._price <= 30 ? chalk.yellowBright
        : chalk.green;

console.log(
        `Name: ${funko._name}\n\t` +
        `Description: ${funko._description}\n\tType: ${funko._type}\n\tGender: ${funko._gender}\n\tFranchise: ${funko._franchise}\n\tSID: ${funko._sid}\n\tExclusive: ${funko._exclusive}\n\tQualities: ${funko._qualities}\n\tPrice: ${priceColor(funko._price.toString())}\n\t`,
);
    });
    return result;
  } catch (error) {
    console.log(chalk.red("Error:", (error as Error).message));
  }
  return
}

/**
 * Method to delete a funko from a file
 * @param user the user account
 * @param id the id of the funko to delete
 * @returns the funko if success
 */
export function deleteFunkoPopFromFile(user: string, id: number): string | undefined {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  if (!fs.existsSync(dirPath)) {
    console.log(chalk.red("ERROR: The path does not exist"));
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("ERROR: The file does not exist"));
    return;
  }

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const funkos: FunkoPop[] = JSON.parse(fileData);
    for (let i = 0; i < funkos.length; i++) {
      if (funkos[i]._id === id) {
        funkos.splice(i, 1);
        fs.writeFileSync(filePath, JSON.stringify(funkos, null, 2));
        console.log(chalk.green(`FunkoPop with ID ${id} deleted successfully`));
        return;
      }
    }
    return 'deleted'
  } catch (error) {
    console.log(chalk.red("Error:", (error as Error).message));
    return
  }
  return
}

/**
 * Method to modify a funko from a file
 * @param user the user account
 * @param id the id of the funko to modify
 * @param funko the funko to modify
 * @returns the funko if success
 */
export function modifyFunkoPopFromFile(
  user: string,
  id: number,
  funko: FunkoPop,
): undefined | FunkoPop {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  if (!fs.existsSync(dirPath)) {
    console.log(chalk.red("ERROR: The path does not exist"));
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("ERROR: The file does not exist"));
    return;
  }
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const funkos: FunkoPop[] = JSON.parse(fileData);
    for (let i = 0; i < funkos.length; ++i) {
      if (funkos[i]._id === id) {
        funkos[i] = funko;
        fs.writeFileSync(filePath, JSON.stringify(funkos, null, 2));
        console.log(
          chalk.green(`FunkoPop with ID ${id} modified successfully`),
        );
        return;
      } else {
        console.log(chalk.red("ERROR: The ID does not exist"));
      }
    }
    return funko;
  } catch (error) {
    console.log(chalk.red("Error:", (error as Error).message));
  }
  return
}

/**
 * Method to view a funko from a file
 * @param user the user account
 * @param id the id of the funko to view
 * @returns the funko if success
 */
export function viewOneFunkoFromFile(user: string, id: number): string | undefined {
  const dirPath = `./users/${user}`;
  const filePath = path.join(dirPath, "funkos.json");

  if (!fs.existsSync(dirPath)) {
    console.log(chalk.red("ERROR: The path does not exist"));
    return;
  }

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("ERROR: The file does not exist"));
    return;
  }

  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    const funkos: FunkoPop[] = JSON.parse(fileData);
    for (let i = 0; i < funkos.length; i++) {
      if (funkos[i]._id === id) {
        const priceColor = funkos[i]._price <= 10
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
        return 'viewed';
      }
    }
    console.log(chalk.red("ERROR: The ID does not exist"));
  } catch (error) {
    console.log(chalk.red("Error:", (error as Error).message));
    return
  }
  return
}
