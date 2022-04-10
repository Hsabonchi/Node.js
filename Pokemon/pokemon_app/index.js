const superagent = require('superagent');
const config = require('./config.json');

const fetch_pic = async () => {

    const Url_brows = `${config.url}pokemon?limit=150`;
    console.log(Url_brows)
    try {
        const response = await superagent.get(Url_brows);
        return response.body;
    } catch (error) {
        return error;
    }
};

const search_pokemon = async (keyword) => {
    console.log(`index.js  ${keyword}`)
    const url_search = `${config.url}pokemon/${keyword}`;
    console.log(url_search)

    try {
        const response = await superagent.get(url_search);
        return response.body;
    } catch (error) {
        return error;
    }
};

// export these functions so they can be used
module.exports = {
    search_pokemon,
    fetch_pic
}
