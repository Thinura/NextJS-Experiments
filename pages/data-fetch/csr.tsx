/**
 * CLIENT SIDE RENDER - CSR
 */

import { ReactElement, useEffect, useState } from 'react'

interface State {
  id: string
  firstName: string
}

interface NextPublicState {
  id: string
  firstName: string
}

/**
 * @returns {ReactElement} return elements of client side rendering
 */
export default function ClientSideRendered(): ReactElement {
  const [state, setState] = useState([])
  const [nextPublicState, setNextPublicState] = useState([])

  /**
   *
   */
  async function getDataByNextPublicEnv(): Promise<void> {
    // console.log(
    //   'NEXT_PUBLIC_MOCK_API_URL',
    //   process.env.NEXT_PUBLIC_MOCK_API_URL,
    // );
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_API_URL ?? ''}/users`
    )
    const data = await resposne.json()
    // console.log('getDataByNodePublicEnv data ', data);
    setNextPublicState(data)
  }

  /**
   *
   */
  async function getDataByEnv(): Promise<void> {
    // Even though URL is undefined in the browser from server end you can it show it
    // console.log('MOCK_API_URL ', process.env.MOCK_API_URL);
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_API_URL ?? ''}/users`
    )
    const data = await resposne.json()
    // console.log('getDataByEnv data ', data);
    setState(data)
  }

  useEffect(() => {
    if (state.length === 0) {
      void getDataByEnv()
    }
    if (nextPublicState.length === 0) {
      void getDataByNextPublicEnv()
    }
  }, [nextPublicState.length, state.length])

  return (
    <div>
      {state.length > 0 && (
        <div>
          <h1>
            {`Enviroment MOCK_API_URL- ${process.env.MOCK_API_URL ?? ''}`}
          </h1>
          {state.map((e: State) => (
            <h3 key={e.id}>{e.firstName}</h3>
          ))}
        </div>
      )}
      <div>
        <h1>
          {`Enviroment NEXT_PUBLIC_MOCK_API_URL- ${
            process.env.NEXT_PUBLIC_MOCK_API_URL ?? ''
          }`}
        </h1>
        {nextPublicState.map((e: NextPublicState) => (
          <h3 key={e.id}>{e.firstName}</h3>
        ))}
      </div>
    </div>
  )
}
