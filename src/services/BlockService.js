import {httpLang} from './HttpService'

export function getLastedBlock (lang, param) {
    return httpLang(lang).get('/wallet/wallet/blkinfo?height=' + param.height)
}