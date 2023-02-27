const axios = require("axios");
const cheerio = require("cheerio");

// axios로 html 받고 cheerio로 html parse.
async function crawl2(page) {
    const html = await axios.get(`https://www.thinkcontest.com/Contest/CateField.html?page=${page}&c=12&s=ing`);
    
    const $ = cheerio.load(html.data);

    let res = []

    // const $all_contest = $('tbody', '.contest-table');
    $('.contest-table > tbody > tr').each((i, el) => {
        // console.log($(el).html());
        const name = $(el).find('td > div > a').text();
        const place = $(el).find('td:eq(1)').text();
        const dday = $(el).find('td:eq(2) > p').text();
        const term = $(el).find('td:eq(3)').text();
        const link = $(el).find('td > div > a').attr('href');
        
        const res_json = {
            idx: i,
            name: name,
            place: place,
            dday: dday,
            term: term,
            link: link,
        }

        res.push(res_json);
    });
    
    return res;
}

module.exports = { crawl2 }