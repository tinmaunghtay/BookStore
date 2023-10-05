import React from "react";
import { useEffect, useState } from "react";
import Card from "./Card";
import { getCountry } from "../../CountriesAPI";

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const api = "http://localhost:3001/stores";

    const headers = {
      "Content-Type":
        'application/vnd.api+json; ext="https://jsonapi.org/ext/version"',
    };

    const fetchStores = async () => {
      let response = await (await fetch(api, { headers })).json();
      Extract(response);
    };

    fetchStores();
  }, [refresh]);

  const Extract = (json) => {
    let ctryMap = new Map();
    let booksMap = new Map();
    let authorsMap = new Map();
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
    data.forEach(async (elem) => {
      if (elem.type === "stores") {
        const bookList = elem.relationships.books
          ? elem.relationships.books.data
          : [];

        const books = [];
        bookList.forEach((book) => {
          const itemBook = booksMap.get(book.id);
          itemBook.authorName = authorsMap.get(itemBook.authorId);
          books.push(JSON.stringify(itemBook));
        });

        let ctryCode = ctryMap.get(elem.relationships.countries.data.id);
        const ctryJson = await getCountry(ctryCode);

        const sortedBooks = []
          .concat(books)
          .sort((a, b) => a.copiesSold - b.copiesSold)
          .slice(0, 2);

        const establishmentDate = new Date(elem.attributes.establishmentDate);
        const yyyy = establishmentDate.getFullYear();
        let mm = establishmentDate.getMonth() + 1;
        let dd = establishmentDate.getDate();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        const formattedDate = dd + "." + mm + "." + yyyy;

        let itm = {
          id: elem.id,
          name: elem.attributes.name,
          website: elem.attributes.website,
          rating: elem.attributes.rating,
          storeImage: elem.attributes.storeImage,
          establishmentDate: formattedDate,
          countryCode: ctryCode,
          countryFlag: ctryJson.flags.png,
          books: sortedBooks,
        };

        list.push(itm);
      }

      setCards(list);
      setRefresh(false);
    });
  };

  return (
    <>
      <div>
        <button value={refresh} onClick={() => setRefresh(true)}>
          Click to reload!
        </button>
      </div>
      {cards?.length === 0 ? (
        <div>
          <h1> No book store</h1>
        </div>
      ) : Array.isArray(cards) ? (
        cards.map((item, index) => {
          return (
            <div key={item.id}>
              <Card
                key={item.id.toString()}
                id={item.id}
                storeName={item.name}
                storeImage={item.storeImage}
                country={item.country}
                countryCode={item.countryCode}
                countryFlag={item.countryFlag}
                website={item.website}
                rating={item.rating}
                establishmentDate={item.establishmentDate}
                books={item.books}
              />
            </div>
          );
        })
      ) : null}
    </>
  );
};

export default CardList;
