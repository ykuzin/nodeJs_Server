const axios = require('axios')
const { putToCache, getValueByKey, getAllTheData } = require('../storage')
const helper = require('./helper')
const { AUTH_TOKEN } = process.env
const options = {
    headers: { 'X-Leeloo-AuthToken': AUTH_TOKEN },
}
function gettingData(req, res) {
    let page = req.query.page
    if (page === undefined || page === null) {
        page = 1
    }
    const offset = (Math.ceil(page / 5) - 1) * 50
    axios
        .get(
            `https://api.stage.leeloo.ai/api/v1/accounts?limit=50&offset=${offset}`,
            options,
        )
        .then((response) => {
            let pm = []

            response.data.data.map(({ id, name, email, from, createdAt }) => {
                pm.push(helper(id, name, email, from, createdAt))
            })
            Promise.all(pm)
                .then((result) => {
                    const temp = result.slice((page - 1) * 10, page * 10)
                    putToCache('unique_key'.concat(Date.now().toString()), temp)
                    res.send(temp)
                })
                .catch((e) => {
                    console.log(e.message)
                })
        })
        .catch((err) => console.log(err.message))
}

module.exports = gettingData
