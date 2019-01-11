import { httpLang } from './HttpService'

/** 钱包 - Wallet Service ***/
export function walletConfirmCode (lang, mobile_email) {
    return httpLang(lang).get(`/wallet/wallet/confirmcode/${mobile_email}`)
}

export function walletPay (lang) {
    return httpLang(lang).post('/wallet/wallet/pay')
}

export function walletReferenceFee (lang) {
    return httpLang(lang).get('/wallet/wallet/referencefee')
}

export function getTradeLogCurrentUser (lang, direction, page, size) {
    return httpLang(lang).get(`/wallet/wallet/trades?direction=${direction}&page=${page}&size=${size}`)
}

export function getTradeListFromUser (lang, userId, page, size) {
    return httpLang(lang).get(`/wallet/wallet/trades/from/${userId}?page=${page}&size=${size}`)
}

export function getTradeListToUser (lang, userId, page, size) {
    return httpLang(lang).get(`/wallet/wallet/trades/from/${userId}?page=${page}&size=${size}`)
}

export function walletGetTradeByHash (lang, hash) {
    return httpLang(lang).get(`/wallet/wallet/trades/${hash}`)
}

export function walletTransfer (lang, transInfo) {
    return httpLang(lang).post('/wallet/wallet/transfer', transInfo)
}



