// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const url = process.env.API_URL + '/api/create_task'
    console.log(url)
    let response = await axios.post(url, req.body, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    res.status(response.status).json(response.data)
}
