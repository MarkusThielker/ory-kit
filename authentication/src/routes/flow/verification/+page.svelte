<script lang="ts">
    import ory from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { page } from "$app/stores";
    import type { VerificationFlow } from "@ory/client";
    import { get } from "svelte/store";
    import { onMount } from "svelte";
    import identity from "$lib/stores/identity";

    let promise: Promise<VerificationFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = ory
            .getVerificationFlow({
                id: get(page).url.searchParams.get("flow")!,
            })
            .then((it) => it.data);
    } else {
        promise = ory.createBrowserVerificationFlow().then((it) => it.data);
    }

    onMount(() => {
        if ($identity) {
            window.location.replace("/");
        }
    });
</script>

<svelte:head>
    <title>{$t("page.verification.title")}</title>
</svelte:head>

{#await promise then flow}
    <Flow
        ui={flow.ui}
        title={$t("page.verification.title")}
        messages={flow.ui.messages}
    />
{/await}
