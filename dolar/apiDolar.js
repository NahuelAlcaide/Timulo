const axios = require('axios');
const cheerio = require('cheerio');

async function fetchData(callback) {
    const urls = {
      blue: 'https://dolarhoy.com/i/cotizaciones/dolar-blue',
      solidario: 'https://dolarhoy.com/i/cotizaciones/banco-nacion',
      ccl: 'https://dolarhoy.com/i/cotizaciones/dolar-contado-con-liquidacion',
      bolsa: 'https://dolarhoy.com/i/cotizaciones/dolar-mep',
      oficial: 'https://dolarhoy.com/i/cotizaciones/dolar-bancos-y-casas-de-cambio'
    };
  
    let ventaText = `La puta madre el dolar está a: `;
  
    for (const [name, url] of Object.entries(urls)) {
      try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const value = parseInt($('.data__valores p:nth-of-type(2)').text().match(/\d+/)[0]);
        ventaText += `\nDolar ${name}: ${value}`;
      } catch (error) {
        console.error(error);
      }
    }

  callback(ventaText);
}

module.exports = { fetchData };