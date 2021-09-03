const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

class Crawler {
  #fetchedData = []; // private field

  getFetchedData() {
    return this.#fetchedData;
  }
  
  /**
   * 
   * @param {string} html  The html string to be parsed by cheerio
   */
  #extractFieldsFromHTML(html) {
    const $ = cheerio.load(html);

    $(".lister-item-content").each((index, element) => {
      
      // Extracting values from various tags and format them
      const loadedContent = $(element);
      const img = loadedContent.prev().find("img").attr("loadlate")
      const rank = Number(loadedContent.find(".lister-item-index").text().trim().replace(/,/g,""));
      const title = loadedContent.find("h3>a").text().trim();
      const year = Number(loadedContent.find(".lister-item-year").text().trim().substr(1, 4));
      const certificate = loadedContent.find(".certificate").text().trim();
      let runtime = loadedContent.find(".runtime").text().trim();
      runtime = Number(runtime.substring(0, runtime.indexOf("min")-1));
      let genre = loadedContent.find(".genre").text().trim();
      genre = genre.split(",").map( el => el.trim());
      const imdbRating = Number(loadedContent.find(".ratings-imdb-rating>strong").text().trim());
      const metascore = Number(loadedContent.find(".metascore").text().trim());
      const additionalInfo = loadedContent.children("p");
      const description = additionalInfo.eq(1).text().trim();
      let people = additionalInfo.eq(2).text().trim().replace(/\n/g, "");
      let [directors, stars] = people.split("|").map(el => el.trim());
      directors = directors.substring(directors.indexOf(":")+1).split(",").map(el => el.trim());
      stars = stars.substring(stars.indexOf(":")+1).split(",").map(el => el.trim());
      this.#fetchedData.push({
        rank, title, img, year, certificate, runtime, genre, imdbRating, metascore, description, directors, stars
      })

    })
  }

  /**
   * 
   * @param {number} startMovieNumber The starting movie number in the request made to IMDB
   * @param {number} movieCount Number of movies to be fetched per page ( Maximum : 250)
   * @returns {Promise} Resolves when the IMDB page has been crawled and data saved to private field
   */
  async makeRequestAndExtractFields(startMovieNumber = 1, movieCount = 10) {
    return new Promise((resolve, reject) => {
      request(`https://www.imdb.com/search/title/?groups=top_1000&sort=user_rating,desc&count=${movieCount}&start=${startMovieNumber}&ref_=adv_nxt`,
        (error, response, html) => {
          if (!error && response.statusCode === 200) {
            this.#extractFieldsFromHTML(html);
            resolve({ message: "Extraction successful" });
          } else {
            reject(error);
          }
        })
    })
  }

  /**
   * Crawl the top 1000 movies from IMDB and save to local storage
   */
  async crawl() {
    let moviesPerPage = 250
    for(let i = 0; i < 4; i++){
      await this.makeRequestAndExtractFields( moviesPerPage*i + 1, moviesPerPage );
    }
    this.#saveDataToJsonFile();
  }

  /**
   * Save extracted data, from private class field to "./movies.json" file
   */
  #saveDataToJsonFile() {
    fs.writeFile("movies.json", JSON.stringify(this.#fetchedData, null, 2), function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log("Writing to file was successful");
      }
    })
  }

}

const obj = new Crawler();
obj.crawl();