
import { httpLang } from './HttpService'



/** Rancher - Cluster Service ***/

export function clusterAdd (lang, clusterInfo) {
  return httpLang(lang).post('/rancher/clusters', clusterInfo)
}

export function clusterList (lang) {
  return httpLang(lang).get('/rancher/clusters')
}

export function clusterSearch (lang, queryData) {
  return httpLang(lang).post('/rancher/clusters/search', queryData)
}

export function clusterDelete (lang, id) {
  return httpLang(lang).delete(`/rancher/clusters/${id}`)
}

export function clusterInfo (lang, id) {
  return httpLang(lang).get(`/rancher/clusters/${id}`)
}

export function clusterModify (lang, id, newClusterInfo) {
  return httpLang(lang).put(`/rancher/clusters/${id}`, newClusterInfo)
}

export function clusterRegistCluster (lang, rid) {
  return httpLang(lang).get(`/rancher/clusters/${rid}`)
}



/** Rancher - Host Service ***/
export function hostAdd (lang, hostInfo) {
  return httpLang(lang).post('/rancher/hosts', hostInfo)
}

export function hostList (lang) {
  return httpLang(lang).get('/rancher/hosts')
}

export function hostSearch (lang, queryData) {
  return httpLang(lang).post('/rancher/hosts/search', queryData)
}

export function hostDelete (lang, id) {
  return httpLang(lang).delete(`/rancher/hosts/${id}`)
}

export function hostInfo (lang, id) {
  return httpLang(lang).get(`/rancher/hosts/${id}`)
}

export function hostModify (lang, id, newClusterInfo) {
  return httpLang(lang).put(`/rancher/hosts/${id}`, newClusterInfo)
}



/** Rancher - RancherServer Service ***/
export function rancherAdd (lang, rancherInfo) {
  return httpLang(lang).post('/rancher/ranchers', rancherInfo)
}

export function rancherList (lang) {
  return httpLang(lang).get('/rancher/ranchers')
}

export function rancherSearch (lang, queryData) {
  return httpLang(lang).post('/rancher/ranchers/search', queryData)
}

export function rancherDelete (lang, id) {
  return httpLang(lang).delete(`/rancher/ranchers/${id}`)
}

export function rancherInfo (lang, id) {
  return httpLang(lang).get(`/rancher/ranchers/${id}`)
}

export function rancherModify (lang, id, newClusterInfo) {
  return httpLang(lang).put(`/rancher/ranchers/${id}`, newClusterInfo)
}
