import fetch from "node-fetch";
import * as cheerio from "cheerio";

const getListOfManga = ($) => {
  const listOfManga = [];
  let temp = {};

  const className = "media-body";

  const listOfMangaHTML = $(`.${className}`);

  listOfMangaHTML;
  const descendantElements = listOfMangaHTML.find(
    ".media-heading > .chart-title"
  );

  descendantElements.each(function (i, element) {
    // console.log(
    //   element.children[0].children[0].data,
    //   " - ",
    //   element.attribs.href
    // );
    listOfManga.push({
      name: element.children[0].children[0].data,
      url: element.attribs.href,
    });
  });

  return listOfManga;
};

const main = async () => {
  let listOfManga = [];

  for (let page = 1; page < 53; page++) {
    const response = await fetch(
      `https://scanmanga-vf.ws/filterList?page=${page}&cat=&alpha=&sortBy=name&asc=true&author=&artist=&tag=`
    );
    const html = await response.text();
    const $ = cheerio.load(html);

    listOfManga.push(...getListOfManga($));

    console.log(...listOfManga);
  }
};

main();
