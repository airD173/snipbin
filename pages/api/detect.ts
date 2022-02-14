import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosRequestConfig } from 'axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const snippet = req.body.snippet

  if (snippet) {
    const data = JSON.stringify({ snippets: [snippet] })
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://lang.myst.rs/api/detect',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    return axios(config)
      .then((response) =>
        res.status(200).json({ data: response.data.languages[0] })
      )
      .catch((err) => res.status(400).json({ error: err }))
  }

  return res.status(400).json({ error: 'No content' })
}
