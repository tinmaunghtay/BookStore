import { getCountry } from "./CountriesAPI";

export default function ExtractData(json) {
  let ctryMap = new Map();
  let booksMap = new Map();
  let authorsMap = new Map();
  console.log('json', json);
  const list = [];
  let included = json.included;
  included.forEach((elem) => {
    if (elem.type === "countries") {
      ctryMap.set(elem.id, elem.attributes.code);
    }
    if (elem.type === "books") {
      const book = {
        id: elem.id,
        name: elem.attributes.name,
        copiesSold: elem.attributes.copiesSold,
        authorId: elem.relationships.author.data.id,
      };
      booksMap.set(elem.id, book);
    }
    if (elem.type === "authors") {
      authorsMap.set(elem.id, elem.attributes.fullName);
    }
  });

  let data = json.data;
  console.log('data', data);
  data.forEach(async (elem) => {
    console.log('elem', elem);
    if (elem.type === "stores") {

      const bookList = elem.relationships.books?elem.relationships.books.data:[];
      console.log(bookList)
      const books = [];
      bookList.forEach((book) => {
        const itemBook = booksMap.get(book.id);
        itemBook.authorName = authorsMap.get(itemBook.authorId);
        books.push(itemBook);
      });

      let ctryCode = ctryMap.get(elem.relationships.countries.data.id);
      const ctryJson = await getCountry(ctryCode);
      console.log('jsonCtry', ctryJson)

      let itm = {
        id: elem.id,
        name: elem.attributes.name,
        website: elem.attributes.website,
        rating: elem.attributes.rating,
        storeImage: elem.attributes.storeImage,
        establishmentDate: elem.attributes.establishmentDate,
        countryCode: ctryCode,
        countryFlag: ctryJson.flags.png,
        books: books,
      };
      console.log('itm', itm);
      
      list.push(itm);
    }

    const ret = { list };
    console.log('ret', ret);
    return ret;
  });
}
