// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];



// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

//checks if credit number is even or odd
function isEven(array){
   if(array.length % 2 == 0){
     return true;
   } else if(array.length % 2 != 0) {
     return false;
  }
}


//multiplies a number by 2, and if > 9, subtracts 9
function double(num){
  newNum = num*2;
  if(newNum > 9){
    newNum = newNum - 9;
    return newNum;
  } else {
    return newNum;
  }
}

//creates a map array from the original for an even credit card number, executing double() on every other number left from the check
function newArrayEven(array){
  let modifiedArr = array.map(function(element, index){
      if (index % 2 == 0) {
        return double(element);
      } else {
        return element;
      }
  });
  return modifiedArr;
}

//creates a map array from the original for an odd credit card number, executing double() on every other number left from the check
function newArrayOdd(array){
  let modifiedArr = array.map(function(element, index){
      if (index % 2 == 0) {
        return element;
      } else {
        return double(element);
      }
  });
  return modifiedArr;
}


//gets the sum of an array
function sumArray(array) {
  let sum = 0;
  array.forEach(element => {
    sum += element;
  });
  return sum;
}


// divides by 10 and checks if remainder == 0
function checkRemainder(num){
  let newNum = num / 10;
  if(newNum % 2 == 0){
    return true;
  } else {
    return false;
  }
}


function validateCred(array){
  
//checks if even/odd using isEven() and creates a new array using newArrayEven() or newArrayOdd
let newArray;
  if(isEven(array) == true){
    newArray = newArrayEven(array);
  } else if(isEven(array) == false){
    newArray = newArrayOdd(array);
  }

//caluculates arrays sum
  let sum = sumArray(newArray);

//divides sum by 10 and checks remainder
  let isValid = checkRemainder(sum);
  return isValid;
}




//takes a nestded array of mystery cards and returns a nested array of each invalid card
function findInvalidCards(array){
  let invalidCards = [];
  //for each element of the array, if invalid, push to invalid nested array
  array.forEach((element) => {
    if(validateCred(element) == false){
      invalidCards.push(element);
    }
  });
  return invalidCards;
}


//creates an array with the first digit of each nested element in a nested array
function firstDigits(array){
  let digits = []
  for(i = 0; i < array.length; i++){
    digits[i] = array[i][0];
  }
  return digits;
}


//assigns a bank to a number
function assignBank(num){
  if (num == 3){
    return 'Amex (American Express)';
  } else if (num == 4){
    return 'Visa';
  } else if (num == 5){
    return 'Mastercard';
  } else if (num == 6){
    return 'Discover'
  } else {
    console.log('Company does not exist');
    return false;
  }
}

//creates a list of companies with invalid credit cards
function bankList(array){
  let banks = [];
  //assigns bank names to numbers
  for(i = 0; i < array.length; i++){
    banks[i] = assignBank(array[i]);
    if(banks[i] == false){ 
    banks.splice(i, 1); //removes companies that do not exist (see line 153)
    }
  }
  return banks;
}


//removes duplicate elements in an array
function removeDuplicates(array){
  let uniqueArray = [...new Set(array)];
  return uniqueArray;
}


function idInvalidCardCompanies(array){
  let array2 = findInvalidCards(array); //checks card validity
 // console.log(array2);
  array2 = firstDigits(array2); //collects first digits in a new array
 // console.log(array2);
  array2 = removeDuplicates(array2); //removes digits ths show up multiple times
 // console.log(array2);
  array2 = bankList(array2); //retrieves banks assigned to each first digit
  // console.log(array2);
  return array2;
}


console.log(idInvalidCardCompanies(batch))





