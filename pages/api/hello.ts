// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'

interface Data {
  name: string
}

/**
 *
 * @param {NextApiResponse<Data>} response response of the api operation
 */
export default function handler(response: NextApiResponse<Data>): void {
  response.status(200).json({ name: 'John Doe' })
}
