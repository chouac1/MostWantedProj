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
      findFamily(person, people);
    break;
    case "descendants":
    // recursion, needs terminating condition => when person doesn't have child
    // so far this finds the children(as an array) of the person being searched and then runs the function again using that array
    function findChildren(person){
      let foundChildren = people.filter(function(person1){
        if (person1.parents.includes(person.id)){
          return true;
        }
        else{
          return false;
        }
        })
        return foundChildren + findChildren(foundChildren);

    }

    findChildren(person);
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
  let traitSearch = promptFor("What trait are you searching? (select a number)\n1). Gender\n2). Age\n3). Eye color\n4). Height\n5). Weight\n6). Occupation", chars);

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
      searchResults = searchWeight(people)
      break;
    case "6":
      searchResults = searchOccupation(people)
      break;
    default:
      return searchByTraits(people); // ask again
 }
 let searchForAnotherTrait = prompt("Would you like to search for another trait? (yes or no)");
if (searchForAnotherTrait == "yes"){
  searchByTraits(searchResults);
}
else if (searchForAnotherTrait == "no"){
  return searchResults;
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

function findFamily(person, people){
  let personInfo = "Name: " + person.firstName + " " + person.lastName + "\n";
  personInfo += "Parents: " + displayParentsArray(person.parents, people) + "\n";
  personInfo += "Spouse: " + displayPersonInfo(person.currentSpouse, people) + "\n";
  //personInfo += "Children: " + displayPersonInfo() + "\n";
  alert(personInfo);
}

function displayById(id, people){

  let foundPerson = people.filter(function(person){
    if(person.id === id){
      return true;
    }
    else{
      return false;
    }
  })  
  return foundPerson[0];
}

function displayParentsArray(parentsArray, people){
  if (parentsArray.length === 0){
    return "no informatin found";
  }
  let parentsName = parentsArray.map(function(el){
    return displayPersonInfo(el, people);
  });
  return parentsName;
}

function displayPersonInfo(personId, people){
  if (personId.length === 0){
  return "no information found";
}
let person = displayById(personId, people);
return person.firstName + " " + person.lastName;
}



