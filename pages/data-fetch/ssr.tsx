/**
 * SERVER SIDE RENDER - SSR
 */

import { ReactElement } from 'react'
import { NextPublicState } from '../../interfaces/NextPublicState'
import { State } from '../../interfaces/State'

interface ServerSideRenderedProps {
  envState: State[]
  nextPublicState: NextPublicState[]
}

/**
 *
 * @param {ServerSideRenderedProps} ServerSideRenderedProps interface of the serverside props
 * @param {ServerSideRenderedProps.envState} ServerSideRenderedProps.envState
 * fetched data of the envirment properties
 * @param {ServerSideRenderedProps.nextPublicState} ServerSideRenderedProps.nextPublicState
 * fetched data of the next envirment properties
 * @returns {ReactElement} React elements of server side page
 */
export default function ServerSideRendered({
  envState,
  nextPublicState,
}: ServerSideRenderedProps): ReactElement {
  return (
    <div>
      {envState.length > 0 && (
        <div>
          {/* If using env variables if want to use in the browser need to be add NEXT_PUBLIC_
          annotation */}
          {/* <h1>{`Enviroment MOCK_API_URL- ${process.env.MOCK_API_URL ?? ''}`}</h1> */}
          {envState.map(
            (e): ReactElement => (
              <h3 key={e.id}>{e.firstName}</h3>
            )
          )}
        </div>
      )}
      <div>
        <h1>
          {`Enviroment NEXT_PUBLIC_MOCK_API_URL- ${
            process.env.NEXT_PUBLIC_MOCK_API_URL ?? ''
          }`}
        </h1>
        {nextPublicState.map(
          (e): ReactElement => (
            <h3 key={e.id}>{e.firstName}</h3>
          )
        )}
      </div>
    </div>
  )
}

/**
 *
 * @param {URL} url url of the data the will be returned from
 */
async function fetchDataByURL(url: URL): Promise<[]> {
  return fetch(`${url.toString()}users`).then(async (res) => res.json())
}

interface GetServerSideProps {
  props: {
    envState: Array<{}>
    nextPublicState: Array<{}>
  }
}

/**
 * Server side props of the
 */
export async function getServerSideProps(): Promise<GetServerSideProps> {
  const mockApiUrl = new URL(process.env.MOCK_API_URL ?? '')
  const nextPublicApiUrl = new URL(process.env.NEXT_PUBLIC_MOCK_API_URL ?? '')
  const envState = await fetchDataByURL(mockApiUrl)

  const nextPublicState = await fetchDataByURL(nextPublicApiUrl)
  return {
    props: {
      envState,
      nextPublicState, // will be passed to the page component as props
    },
  }
}
