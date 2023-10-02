import i18n from 'sveltekit-i18n';
import { browser } from '$app/environment'
import type { UiNode } from '@ory/client';

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

export const fromNode = (node: UiNode) => {
    return 'page.ory.' + (node.meta?.label?.id === 1070002 ? `traits.${node.meta?.label?.text}` : node.meta?.label?.id.toString()) ?? "";
};

if (browser) {
    const langCode = window.navigator.language.substring(0, 2);
    localStorage.setItem('locale', langCode);
    locale.set(langCode);
}
