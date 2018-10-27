const inquirer = require("inquirer");
const ContactController = require('./ContactController');

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
    this.book = new ContactController();
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
    inquirer.prompt(this.book.addContactQuestions).then(answers => {
      this.book.addContact(answers.name, answers.phone).then(contact => {
        console.log('Contact added successfully');
        this.main();
      }).catch(err => {
        console.log(err);
        this.main();
      })
    })
  }

  getDate() {
    this.clear();
    const date = new Date();
    console.log(date.toLocaleString());
    this.main();
  }

  getContactCount() {
    return this.contacts.length;
  }

  remindMe() {
    return 'Learning is a life-long pursuit';
  }

  exit() {
    console.log("Thanks for using address bloc");
    process.exit();
  }
};
