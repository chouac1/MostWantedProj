"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
    let parentIDs = person.parents;
    let spouseID = person.currentSpouse;
    if (parentIDs.length === 0){
      alert("No parents found");
    }
    else if (parentIDs.length === 1){
      let parentID = parentIDs[0];
      let foundPerson = people.filter(function(person){
        if(person.id == parentID){
          return true;
        }
        else{
          return false;
        }    
      })
      alert ("One parent found");
      displayPerson(foundPerson[0]);
    }
    else if (parentIDs.length === 2){
      let parentOneID = parentIDs[0];
      let parentTwoID = parentIDs[1];
      let foundPersonOne = people.filter(function(person){
        if(person.id == parentOneID){
          return true;
        }
        else{
          return false;
        }    
      })
      let foundPersonTwo = people.filter(function(person){
        if(person.id == parentTwoID){
          return true;
        }
        else{
          return false;
        }    
      })
      alert ("Two parents found");
      displayPerson(foundPersonOne[0]);
      displayPerson(foundPersonTwo[0]);
    }
    if (spouseID === null){
      alert("No spouse found");
    }
    else {
      let foundPerson = people.filter(function(person){
        if(person.id == spouseID){
          return true;
        }
        else{
          return false;
        }    
      })
      alert("Spouse found");
      displayPerson(foundPerson[0]);
    }
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })  

  return foundPerson[0];
}

function searchByTraits(people) {
  let traitSearch = promptFor("What traits are you searching?\n1). Gender\n2). Age\n3). Eyecolor\n4). Height\n5). Weight\n 6). Occupation", chars);
  let searchResults;
  switch (traitSearch) {
    case "1":
      searchResults = searchGender(people);
      break;
    case "2":
      searchResults = searchAge(people);
      break;
    case "3":
      searchResults = searchEyecolor(people)
      break;
    case "4":
      searchResults = searchHeight(people)
      break;
    case "5":
      searchresults = searchWeight(people)
      break;
    case "6":
      searchResults = searchOccupation(people)
      break;
    default:
      return mainMenu(person, people); // ask again
 }
}

function searchGender(people){
  let gender = promptFor("What is the person's gender?", chars);

  let foundPeople = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })  
  displayPeople(foundPeople);
  return foundPeople;
  }

function searchAge(people){
  let age = promptFor("What is the person's age?", chars);
  // let ageAsNumber = parseInt(age);

  let foundPeople = people.filter(function(person){
    if(calculateAge(person.dob) == age){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPeople);
  return foundPeople;
  }

function searchEyecolor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);

  let foundPeople = people.filter(function(person){
    if(person.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })  

displayPeople(foundPeople);
return foundPeople;
}

function searchHeight(people){
  let height = promptFor("What is the person's height in inches?", chars);

  let foundPeople = people.filter(function(person){
    if(person.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  displayPeople(foundPeople);
  return foundPeople;
  }

  function searchWeight(people){
    let weight = promptFor("What is the person's weight in pounds?", chars);
  
    let foundPeople = people.filter(function(person){
      if(person.weight == weight){
        return true;
      }
      else{
        return false;
      }
    })
    displayPeople(foundPeople);
    return foundPeople;
    }

    function searchOccupation(people){
      let occupation = promptFor("What is the person's occupation?", chars);
    
      let foundPeople = people.filter(function(person){
        if(person.occupation == occupation){
          return true;
        }
        else{
          return false;
        }
      })
      displayPeople(foundPeople);
      return foundPeople;
      }

function calculateAge(dob) {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age = age - 1;
  }

  return age;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID: " + person.id + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Spouse: " + person.currentSpouse + "\n";
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
