<script lang="ts">
    import ory from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import type { RecoveryFlow } from "@ory/client";
    import { onMount } from "svelte";
    import identity from "$lib/stores/identity";
    import { get } from "svelte/store";
    import { page } from "$app/stores";

    let promise: Promise<RecoveryFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = ory
            .getRecoveryFlow({ id: get(page).url.searchParams.get("flow")! })
            .then((it) => it.data);
    } else {
        promise = ory.createBrowserRecoveryFlow().then((it) => it.data);
    }

    onMount(() => {
        if ($identity) {
            window.location.replace("/");
        }
    });
</script>

<svelte:head>
    <title>{$t("page.recovery.title")}</title>
</svelte:head>

{#await promise then flow}
    <Flow
        ui={flow.ui}
        title={$t("page.recovery.title")}
        messages={flow.ui.messages}
    />
{/await}
