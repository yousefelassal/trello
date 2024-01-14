const axios = require('axios');
const cheerio = require('cheerio');

async function getOpenGraphImage(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ogImage = $('meta[property="og:image"]').attr('content');
    return ogImage;
}

module.exports = {
    getOpenGraphImage,
};
