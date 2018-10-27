const inquirer = require("inquirer");

module.exports = class MenuController {
  constructor() {
    this.mainMenuQuestions = [
      {
        type: "list",
        name: "mainMenuChoice",
        message: "Please choose from an option below: ",
        choices: ["Add new contact", "Get current date and time", "Exit"]
      }
    ];
    this.contacts = [];
  }

  main() {
    console.log(`Welcome to AddressBloc!`);
    inquirer
      .prompt(this.mainMenuQuestions)
      .then(response => {
        switch (response.mainMenuChoice) {
          case "Add new contact":
            this.addContact();
            break;
          case "Exit":
            this.exit();
          case "Get current date and time":
            this.getDate();
            break;
          default:
            console.log("Invalid input");
            this.main();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  clear() {
    console.log("\x1Bc");
  }

  addContact() {
    this.clear();
    console.log("Add contact called");
    this.main();
  }

  getDate() {
    this.clear();
    const date = new Date();
    console.log(date.toLocaleString());
    this.main();
  }

  exit() {
    console.log("Thanks for using address bloc");
    process.exit();
  }
};
