"use strict";

/**
 * 
 * @param {Array} movies List of movies
 * @param {string} propertyName The name of the property which will be extracted from each movie object (from movies array)
 * @returns An array containing all the unique values for the "propertyName" present across the movie objects in movies array
 */
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

/**
 * 
 * @param {string} fieldName The name of the field in target (movie) object
 * @param {string|Array|number} fieldValue The value corresponding to the fieldName in the target (movie) Object
 * @param {string|number} queryValue The value against which "fieldValue" will be test
 * @returns boolean value indicating whether object field (fieldValue) matched against queryValue
 */
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

/**
 * 
 * @param {Array} movies The list of movies to filter from
 * @param {Object} queries The queres object containing all the queries in propertyName: queryValue format
 * @returns filtered list of movies
 */
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

/**
 * 
 * @param {Object[]} data The list of movies 
 * @param {number} [pageNumber=1] The page number
 * @param {number} [limit=10] Maximum number of results per page 
 * @returns An object containing paginated data, totalPages and count properties set
 */
function paginate(data, pageNumber = 1, limit = 10) {
  this.paginate()
  pageNumber = Number(pageNumber);
  limit = Number(limit);

  let result = {};
  // check for invalid parameter values
  if (limit <= 0 || pageNumber < 1) {
    return result;
  }

  result.totalPages = Math.ceil(data.length / limit);

  if (pageNumber <= result.totalPages) {
    result.pageNumber = pageNumber;
  }

  let startingIndex = limit * (pageNumber - 1);
  result.data = data.slice(startingIndex, startingIndex + limit);
  result.count = result.data.length;
  return result;
}

module.exports = {
  getUniqueArrayFieldValues,
  filterMovies,
  paginate
}