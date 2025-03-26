import { FunkoPop } from "./Funko.js";
import chalk from "chalk";
import * as FO from "./FileFunctions.js";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "add",
    "Adds a funko",
    {
      user: {
        description: "User",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Funko name",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Funko description",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Funko type",
        type: "string",
        demandOption: true,
      },
      gender: {
        description: "Gender",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Franchise",
        type: "string",
        demandOption: true,
      },
      sid: {
        description: "SID",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Exclusive",
        type: "boolean",
        demandOption: true,
      },
      qualities: {
        description: "Qualities",
        type: "string",
        demandOption: true,
      },
      price: {
        description: "Price",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (argv.price <= 0) {
        console.log(chalk.red("The price must be greater than 0"));
        return;
      }
      if (argv.id <= 0) {
        console.log(chalk.red("The ID must be greater than 0"));
        return;
      }
      if (argv.sid <= 0) {
        console.log(chalk.red("The SID must be greater than 0"));
        return;
      }
      if (argv.exclusive !== true && argv.exclusive !== false) {
        console.log(chalk.red("The exclusive must be true or false"));
        return;
      }
      const funko = new FunkoPop(
        argv.id,
        argv.name,
        argv.description,
        argv.type,
        argv.gender,
        argv.franchise,
        argv.sid,
        argv.exclusive,
        argv.qualities,
        argv.price,
      );
      FO.writeFunkoPopToFile(argv.user, funko);
    },
  )
  .command(
    "remove",
    "Remove the funko",
    {
      user: {
        description: "User",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      FO.deleteFunkoPopFromFile(argv.user, argv.id);
    },
  )
  .command(
    "view",
    "View the funko",
    {
      user: {
        description: "User",
        type: "string",
        demandOption: true,
      },
    },
    (argv) => {
      FO.readFunkoPopsFromFile(argv.user);
    },
  )
  .command(
    "viewOne",
    "View the funko",
    {
      user: {
        description: "User",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      FO.viewOneFunkoFromFile(argv.user, argv.id);
    },
  )
  .command(
    "modify",
    "Modify the funko",
    {
      user: {
        description: "User",
        type: "string",
        demandOption: true,
      },
      id: {
        description: "Funko ID",
        type: "number",
        demandOption: true,
      },
      name: {
        description: "Funko name",
        type: "string",
        demandOption: true,
      },
      description: {
        description: "Funko description",
        type: "string",
        demandOption: true,
      },
      type: {
        description: "Funko type",
        type: "string",
        demandOption: true,
      },
      gender: {
        description: "gender",
        type: "string",
        demandOption: true,
      },
      franchise: {
        description: "Franchise",
        type: "string",
        demandOption: true,
      },
      sid: {
        description: "SID",
        type: "number",
        demandOption: true,
      },
      exclusive: {
        description: "Exclusive",
        type: "boolean",
        demandOption: true,
      },
      qualities: {
        description: "Qualities",
        type: "string",
        demandOption: true,
      },
      price: {
        description: "Price",
        type: "number",
        demandOption: true,
      },
    },
    (argv) => {
      if (argv.price <= 0) {
        console.log(chalk.red("The price must be greater than 0"));
        return;
      }
      if (argv.id <= 0) {
        console.log(chalk.red("The ID must be greater than 0"));
        return;
      }
      if (argv.sid <= 0) {
        console.log(chalk.red("The SID must be greater than 0"));
        return;
      }
      if (argv.exclusive !== true && argv.exclusive !== false) {
        console.log(chalk.red("The exclusive must be true or false"));
        return;
      }
      const funko = new FunkoPop(
        argv.id,
        argv.name,
        argv.description,
        argv.type,
        argv.gender,
        argv.franchise,
        argv.sid,
        argv.exclusive,
        argv.qualities,
        argv.price,
      );
      FO.modifyFunkoPopFromFile(argv.user, argv.id, funko);
    },
  )
  .demandCommand(1, "You need at least one command before moving on")

  .help().argv;

// Add funko
// node ./dist/Funko/Main.js add --user "prueba" --id 42 --name "Batman Limited Edition" --description "Edición coleccionista de Batman" --type "Pop!" --gender "Male" --franchise "DC Comics" --sid 789 --exclusive true --qualities "Glow in the dark" --price 50
// Remove funko
// node ./dist/Funko/Main.js remove --user "prueba" --id 42
// View funko
// node ./dist/Funko/Main.js view --user "prueba"
// View one funko
// node ./dist/Funko/Main.js viewOne --user "prueba" --id 42
// Modify funko
// node ./dist/Funko/Main.js modify --user "prueba" --id 42 --name "Batman Limited Edition" --description "Edición coleccionista de Batman" --type "Pop!" --gender "Male" --franchise "DC Comics" --sid 789 --exclusive true --qualities "Glow in the dark" --price 80
