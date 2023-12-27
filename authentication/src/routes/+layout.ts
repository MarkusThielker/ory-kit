import type { LayoutLoad } from './$types'
import { loadTranslations, locale } from "$lib/i18n";
import { get } from "svelte/store";

export const load: LayoutLoad = async (params) => {
    await loadTranslations(get(locale) ?? 'en', params.url.pathname);
}
