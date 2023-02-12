import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import translationRO from './ro.json'
import translationRU from './ru.json'

export const resources = {
    ro: {
        translation: translationRO,
    }, ru: {
        translation: translationRU,
    },
}

i18n.use(initReactI18next).init({
    resources, lng: 'ro', fallbackLng: 'ro', interpolation: {
        escapeValue: false,
    },
})