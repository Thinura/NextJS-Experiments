/**
 * INCREMENTAL STATIC GENERATION - OSR
 */

import { GetStaticPropsResult } from 'next'
import { ReactElement } from 'react'
import { NextPublicState } from '../../interfaces/NextPublicState'
import { State } from '../../interfaces/State'

interface IncrementalStaticGenerationProps {
  envState: State[]
  nextPublicState: NextPublicState[]
}

/**
 *
 * @param {IncrementalStaticGenerationProps} IncrementalStaticGenerationProps
 * interface of the static side props
 * @param {IncrementalStaticGenerationProps.envState} IncrementalStaticGenerationProps.envState
 * fetched data of the envirment properties
 * @param {
 * IncrementalStaticGenerationProps.nextPublicState
 * } IncrementalStaticGenerationProps.nextPublicState
 * fetched data of the next envirment properties
 * @returns {ReactElement} React elements of server side page
 */
export default function IncrementalStaticGeneration({
  envState,
  nextPublicState,
}: IncrementalStaticGenerationProps): ReactElement {
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
  envState: Array<{}>
  nextPublicState: Array<{}>
}

/**
 * Server side props of the
 */
export async function getStaticProps(): Promise<GetStaticPropsResult<GetServerSideProps>> {
  const mockApiUrl = new URL(process.env.MOCK_API_URL ?? '')
  const nextPublicApiUrl = new URL(process.env.NEXT_PUBLIC_MOCK_API_URL ?? '')
  const envState = await fetchDataByURL(mockApiUrl)

  const nextPublicState = await fetchDataByURL(nextPublicApiUrl)
  return {
    props: {
      envState,
      nextPublicState, // will be passed to the page component as props
    },

    /**
     * NextJS will attempt to re-generate the page:
     * - When a request comes in
     * - At most once every second
     */
    revalidate: 100, // In seconds
  }
}
