import React, { useEffect, useState } from 'react'

import AddButton from '@components/AddButton'
import Header from '@components/Header'
import Loading from '@components/Loading'
import Map from '@components/Map'

import { getApi } from '@services/api'
import endpoints from '@config/endpoints'

function App() {
  const [issues, setIssues] = useState(null)

  useEffect(() => {
    getApi(endpoints.issues)
      .then(setIssues)
      .catch(err => {
        // TODO handle error
        console.error(err)
      })
  }, [])

  return (
    <>
      <Header />
      {issues ? (
        <Map issues={issues} />
      ) : (
        <Loading />
      )}
      <AddButton />
    </>
  )
}

export default App
