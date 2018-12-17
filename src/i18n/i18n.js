import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './langs/cn'
import en from './langs/en'

Vue.use(VueI18n)

const messages = {
  en,
  cn
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

export default i18n
