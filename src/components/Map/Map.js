import React, { memo, useEffect } from 'react'

import { createIssuesLayer, initMap } from '@services/map'

import styles from './Map.module.css'

const ID = 'map'

function Map({ issues }) {
  useEffect(() => {
    initMap(ID).then(() => {
      createIssuesLayer(issues)
    })
  }, [])

  return (
    <div className={styles['map-box']}>
      <div
        className={styles.map}
        id={ID}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}

export default memo(Map)
