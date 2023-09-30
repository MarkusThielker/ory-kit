<script lang="ts">
    import { page } from "$app/stores";
    import { frontendApi } from "$lib/ory";
    import { onMount } from "svelte";
    import { get } from "svelte/store";

    onMount(() => {
        const requestParameters: {returnTo?: string} = {}
        if (get(page).url.searchParams.get("return_to")) {
            requestParameters.returnTo = get(page).url.searchParams.get("return_to")! as string
        }

        frontendApi.createBrowserLogoutFlow(requestParameters)
            .then((it) => it.data)
            .then((it) => window.location.replace(it.logout_url));
    });
</script>
