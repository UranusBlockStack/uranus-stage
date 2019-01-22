
import {httpLang} from './HttpService'

import axios from 'axios'
import * as auth from './AuthService'

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
export function joinCluster (lang, queryData) {
    return httpLang(lang).post(`/rancher/hosts/${hostId}/cluster/${clusterId}`)
}

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

//获取集群下的所有主机
export function clusterHosts (lang, id) {
    return httpLang(lang).get(`/rancher/clusters/${id}/hosts`)
}

/** Rancher - RancherServer Service ***/
export function rancherAdd (lang, rancherInfo) {
  return httpLang(lang).post('/rancher/rancher_servers', rancherInfo)
}

export function rancherList (lang) {
  return httpLang(lang).get('/rancher/rancher_servers/')
}

export function rancherSearch (lang, queryData) {
  return httpLang(lang).post('/rancher/rancher_servers/search', queryData)
}

export function rancherDelete (lang, id) {
  return httpLang(lang).delete(`/rancher/rancher_servers/${id}`)
}

export function rancherInfo (lang, id) {
  return httpLang(lang).get(`/rancher/rancher_servers/${id}`)
}

export function rancherModify (lang, id, newClusterInfo) {
  return httpLang(lang).put(`/rancher/rancher_servers/${id}`, newClusterInfo)
}

/** Rancher - AppController Service ***/
export function appList (lang, queryData) {
  return httpLang(lang).post('/rancher/apps/search', queryData)
}

export function appDetail (lang, appId) {
  return httpLang(lang).get(`/rancher/apps/${appId}`)
}

export function appVersion (lang, appId, version) {
  return httpLang(lang).get(`/rancher/apps/${appId}/versions/${version}`)
}

export function appByUser (lang, queryData) {
    return httpLang(lang).post('/rancher/app_users/search', queryData)
}

/** Rancher - Project Controller Service ***/
export function projectList (lang, queryData) {
    return httpLang(lang).post('/rancher/projects/search', queryData)
}

export function apptListByProjectId (lang, projectId) {
    return httpLang(lang).get(`/rancher/projects/${projectId}/apps`)
}

export function projectListById (lang, projectId) {
    return httpLang(lang).get(`/rancher/projects/${projectId}`)
}

/** Rancher - App Instance Controller Service ***/
export function appInstanceSearch (lang, queryData) {
  return httpLang(lang).post('/rancher/app_instances/search', queryData)
}

export function appInstanceWorkLoads (lang, appId) {
    return httpLang(lang).get(`/rancher/app_instances/${appId}/workloads`)
}

export function appInstanceDeploy (lang, params) {
    return httpLang(lang).post('/rancher/app_instances', params)
}

export function deleteAppById (lang, appId) {
    return httpLang(lang).delete(`/rancher/app_instances/${appId}`)
}

/** Statistics Controller Service ***/
export function statisticsProjects (lang) {
    return httpLang(lang).get('/rancher/statistics/projects')
}


export function statisticsGlobalUraPower (lang, type) {
    return httpLang(lang).get(`/rancher/statistics/computes/${type}`)
}

export function hosts (lang) {
    return httpLang(lang).get('/rancher/statistics/hosts')
}
