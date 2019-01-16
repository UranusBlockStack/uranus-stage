import {httpLang} from './HttpService'

export function getLastedBlock (lang, param) {
    return httpLang(lang).post('/email/getblkinfo', param)
}