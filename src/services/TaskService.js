import { http } from './HttpService'

export function getAllTasks () {
  return http().get('/task')
}

export function getTaskById (id) {
  return http().get(`/task/${id}`)
}

export function createTask (task) {
  return http().post('/task', task)
}

export function deleteTask (id) {
  return http().delete(`/task/${id}`)
}

export function updateTask (task) {
  return http().put('/task', task)
}

export function configNetwork (network) {
  return http().post('/config_network', network)
}

export function configNetworkResult (host) {
  return http().post('/config_network_result', host)
}
