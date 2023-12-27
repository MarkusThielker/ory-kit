import type { LayoutLoad } from "./$types";
import identityStore from "$lib/stores/identity";
import { get } from "svelte/store";
import { browser } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = async () => {
    await identityStore.loadIdentity();

    if (browser && !get(identityStore)) {
        redirect(301, "/")
    }
}
