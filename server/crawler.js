const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

class Crawler {
  #fetchedData = []; // private field

  getFetchedData() {
    return this.#fetchedData;
  }

  #extractFieldsFromHTML(html) {
    const $ = cheerio.load(html);
    $(".lister-item-content").each((index, element) => {

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

  async crawl() {
    let moviesPerPage = 250
    for(let i = 0; i < 4; i++){
      await this.makeRequestAndExtractFields( moviesPerPage*i + 1, moviesPerPage );
    }
    this.#saveDataToJsonFile();
  }

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