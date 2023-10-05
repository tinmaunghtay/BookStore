const api = "https://restcountries.com/v3.1/alpha"

const headers = {
    'Content-Type': 'application/json'
}

export const getCountry = async (code) =>
    {
      let response = await (await fetch(`${api}/${code}`, {headers})).json();
      console.log('ctry', response[0]);
      return response[0];
    };

