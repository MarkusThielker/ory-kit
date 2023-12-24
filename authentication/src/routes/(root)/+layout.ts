import type { LayoutLoad } from './$types'
import { loadTranslations, locale } from "$lib/i18n";
import { get } from "svelte/store";
import identityStore from "$lib/stores/identity";

// noinspection JSUnusedGlobalSymbols
export const load: LayoutLoad = async (params) => {

    const { pathname } = params.url;
    await loadTranslations(get(locale) ?? 'en', pathname);

    await identityStore.loadIdentity();

    return {};
}
