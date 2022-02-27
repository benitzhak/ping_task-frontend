import axios from 'axios'

export const pingService = {
    pingRequest,
    getPings
}

async function pingRequest(url, count) {
    const res = await axios.post(`http://localhost:3030/api/ping/${url}/${count}`)
    return res.data
}

async function getPings() {
    const res = await axios.get(`http://localhost:3030/api/ping`)
    return res.data
}