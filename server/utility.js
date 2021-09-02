"use strict";

function getUniqueArrayFieldValues(movies, propertyName){
  const valuesSet = new Set();
  movies.forEach(movie => {
    const propertyValue = movie[propertyName];
    
    if(Array.isArray(propertyValue)){
      propertyValue.forEach(value => {
        valuesSet.add(value);
      })
    }else if(propertyValue){
      valuesSet.add(propertyValue);
    }
  });
  const result = [...valuesSet]; // convert set to array for sorting
  return result.sort();
}

module.exports = {
  getUniqueArrayFieldValues
}