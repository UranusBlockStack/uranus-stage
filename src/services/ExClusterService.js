import {http} from './HttpService'

export function getCluster (serverCode) {
  return http(serverCode).get('/v3/cluster')
}

export function rancherLogin (serverCode, param) {
  return http(serverCode).post('/v3-public/localProviders/local?action=login', param)
}
