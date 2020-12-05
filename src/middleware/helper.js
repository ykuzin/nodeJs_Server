const axios = require('axios')
const { AUTH_TOKEN } = process.env
const options = {
    headers: { 'X-Leeloo-AuthToken': AUTH_TOKEN },
}
const helper = async (id, name, email, from, createdAt) => {
    try {
        const response = await axios.get(
            `https://api.stage.leeloo.ai/api/v1/accounts/${id}?include=orders`,
            options,
        )
        let orders1 = []
        if (response.data.included.orders.length) {
            response.data.included.orders.map(
                ({ id, price, currency, status, updatedAt }) => {
                    const timeToOrderAfterRegister =
                        new Date(updatedAt).getTime() -
                        new Date(createdAt).getTime()
                    orders1.push({
                        id,
                        price,
                        currency,
                        status,
                        timeToOrderAfterRegister,
                    })
                },
            )

            return { id, name, email, from, orders: orders1 }
        } else {
            return { id, name, email, from, orders: [] }
        }
    } catch (e) {
        console.log(e.message)
    }
}
module.exports = helper
