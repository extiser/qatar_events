import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import en from './translations/en'
import ar from './translations/ar'

const i18next = i18n
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',
        // debug: true,
        resources: {
            en,
            ar
        },
    });

export default i18next