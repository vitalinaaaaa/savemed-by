import Leaflet from 'leaflet'
import 'leaflet.markercluster/dist/leaflet.markercluster'

import {
  MAP_INITIAL_LOCATION,
  MAP_INITIAL_ZOOM,
  MAP_MAX_ZOOM,
  MAP_MAX_CLUSTERING_ZOOM,
  MAP_CLUSTER_S_MAX,
  MAP_CLUSTER_M_MAX
} from '@config/constants'
import { MAP_ACCESS_TOKEN, MAP_STYLE } from '@config/keys'

let map = null

function getGeolocation() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      resolve([coords.latitude, coords.longitude])
    }, () => {
      resolve(MAP_INITIAL_LOCATION)
    })
  })
}

export function initMap(id) {
  return new Promise(resolve => {
    getGeolocation().then(center => {
      map = Leaflet.map(id, {
        center,
        zoom: MAP_INITIAL_ZOOM,
        maxZoom: MAP_MAX_ZOOM
      })

      Leaflet.mapboxGL({
        accessToken: MAP_ACCESS_TOKEN,
        style: MAP_STYLE
      }).addTo(map)

      resolve()
    })
  })
}

export function createIssuesLayer(items) {
  function getSize(count) {
    if (count <= MAP_CLUSTER_S_MAX) {
      return 's'
    }

    if (count <= MAP_CLUSTER_M_MAX) {
      return 'm'
    }

    return 'l'
  }

  const markers = Leaflet.markerClusterGroup({
    spiderfyOnMaxZoom: true,
    disableClusteringAtZoom: MAP_MAX_CLUSTERING_ZOOM,
    iconCreateFunction: cluster => {
      const count = cluster.getChildCount()

      return Leaflet.divIcon({
        className: 'cluster-box',
        html: `<div class="cluster cluster-${getSize(count)}">${count}</div>`
      })
    }
  })

  items.forEach(item => {
    const text = String(item.description).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    const { link, phone, telegramNickName } = item

    const icon = Leaflet.divIcon({
      className: 'avatar-box',
      html: `<a href="https://t.me/${telegramNickName}/" target="_blank" rel="noopener noreferrer">
                <div class="avatar avatar-${item.role}"></div>
             </a>
             <span class="message">
                ${phone}
                <br/>
                ${text}
                ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer">Помочь деньгами</a>` : ''}
             </span>`
    })
    icon.options.iconSize = [48, 48]

    markers.addLayer(new Leaflet.marker(new Leaflet.LatLng(item.latitude, item.longitude), { icon }))
  })

  map.addLayer(markers, { chunkedLoading: true })
}
