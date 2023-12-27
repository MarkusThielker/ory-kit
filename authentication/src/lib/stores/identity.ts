import { writable } from "svelte/store";
import type { Identity } from "@ory/client";
import { frontendApi } from "$lib/ory";
import { browser } from "$app/environment";

const store = () => {

    let {subscribe, set} = writable<Identity | undefined>({} as Identity);

    return {
        subscribe,
        set: (identity: Identity) => {
            set(identity);
        },
        loadIdentity: async (redirect?: string) => {
            if (browser) {
                await frontendApi.toSession()
                    .then((response) => {
                        if (response.status === 200) {
                            set(response.data.identity);
                            if (redirect) {
                                window.location.replace(redirect)
                            }
                        }
                    })
                    .catch((error) => {
                        set(undefined)
                        switch (error.response?.status) {
                            case 403:
                            case 422:
                                window.location.replace(error.response?.data.redirect_browser_to)
                                return
                            case 401:
                                return
                        }
                    });
            }
        }
    }
}
export default store();
