import { httpLang } from './HttpService'

export function deleteApp(lang, projectName, name, version) {
  return httpLang(lang).delete(`/catalog/charts/${projectName}/${name}/${version}`)
}

export function addApp(lang, projectName, appId) {
  return httpLang(lang).post(`/catalog/charts/${projectName}/${appId}`)
}

export function constructImageUrl (imgUrl, appRid) {
  return imgUrl + appRid + '/icon'
}
