import type { PageLoad } from "./$types";
import identityStore from "$lib/stores/identity";
import { browser } from "$app/environment";
import { get } from "svelte/store";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({url}) => {

    if (!url.searchParams.has("flow") && !url.searchParams.has("login_challenge")) {
        await identityStore.loadIdentity();
        if (browser && get(identityStore)) {
            redirect(301, "/");
        }
    }
}
