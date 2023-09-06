import { writable } from "svelte/store";
import type { Identity } from "@ory/client";
import { frontendApi } from "$lib/ory";
import { browser } from "$app/environment";

const store = () => {

    let { subscribe, set } = writable<Identity | null>({} as Identity);

    return {
        subscribe,
        loadIdentity: async () => {
            if (browser) {
                try {
                    await frontendApi.toSession().then((response) => {
                        if (response.status === 200) {
                            set(response.data.identity);
                        }
                    });
                } catch (_) {
                    set(null);
                }
            }
        }
    }
}
export default store();
