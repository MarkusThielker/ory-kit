import i18n from 'sveltekit-i18n';
import { browser } from '$app/environment'

const config = ({
    fallbackLocale: 'en',
    initialLocale: browser ? localStorage.getItem('locale') : 'en',
    loaders: [
        {
            locale: 'en',
            key: 'page',
            loader: async () => (
                await import('./en.json')
            ).default,
        },
        {
            locale: 'de',
            key: 'page',
            loader: async () => (
                await import('./de.json')
            ).default,
        },
    ]
});

// noinspection JSUnusedGlobalSymbols
export const { t, locale, locales, loading, loadTranslations } = new i18n(config);

if (browser) {
    const langCode = window.navigator.language.substring(0, 2);
    localStorage.setItem('locale', langCode);
    locale.set(langCode);
}
