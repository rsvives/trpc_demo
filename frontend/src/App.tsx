import './App.css'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../../server/api'
import { useEffect } from 'react'

const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: 'http://localhost:3000/trpc'
  })]
})

function App() {


  const fetchHi = async () => {
    const result = await client.hi.query()
    console.log(result)
  }
  const mutateData = async () => {
    const result = await client.logToServer.mutate('this is a mutation')
    console.log(result)
    return result
  }

  useEffect(() => {
    fetchHi()
    mutateData()
  }, [])

  return (
    <>
      <h1>hello world</h1>
    </>
  )
}

export default App
