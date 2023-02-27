const express = require("express");
const app = express();
const port = 3000;
const { crawl2 } = require("./service/cheerio_crawl");

app.get("/thinkgood/:page", async (req, res) => {

    const page = req.params.page;
    const result = await crawl2(page);
    
    return res.send(result);
});

app.listen(port, () => {
    console.log("Example app is listening in " + port);
});