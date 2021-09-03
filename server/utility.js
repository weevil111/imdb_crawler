"use strict";

function getUniqueArrayFieldValues(movies, propertyName) {
  const valuesSet = new Set();
  movies.forEach(movie => {
    const propertyValue = movie[propertyName];

    if (Array.isArray(propertyValue)) {
      propertyValue.forEach(value => {
        valuesSet.add(value);
      })
    } else if (propertyValue) {
      valuesSet.add(propertyValue);
    }
  });
  const result = [...valuesSet]; // convert set to array for sorting
  return result.sort();
}

function testObjectField(fieldName, fieldValue, queryValue) {
  // Check if the query field exists in the moviesObject
  if (typeof (fieldValue) === "undefined") {
    return false;
  }

  // Check whether a non-numeric field is empty 
  if (typeof (fieldValue) !== "number" && !fieldValue) {
    return false;
  }

  // convert both object field value and query value to lowercase
  if (typeof fieldValue === "string") {
    fieldValue = fieldValue.toLowerCase();
    queryValue = queryValue.toLowerCase();
  }

  switch (fieldName) {
    case "title":
      return fieldValue.includes(queryValue);
    case "certificate":
    case "year":
      return fieldValue === queryValue
    case "imdbRating":
    case "metascore":
    case "runtime":
      return fieldValue >= queryValue
    case "genre":
    case "directors":
    case "stars":
      return fieldValue.includes(queryValue);
  }
}

function filterMovies(movies, queries) {

  let filteredMovies = movies;
  for (let queryFieldName in queries) {
    filteredMovies = filteredMovies.filter(movie => {
      let queryValue = queries[queryFieldName];
      if (!testObjectField(queryFieldName, movie[queryFieldName], queryValue)) {
        return false;
      }
      return true;
    })
  }
  return filteredMovies;
}



module.exports = {
  getUniqueArrayFieldValues,
  filterMovies
}