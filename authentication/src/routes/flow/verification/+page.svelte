<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { page } from "$app/stores";
    import type { VerificationFlow } from "@ory/client";
    import { get } from "svelte/store";

    let promise: Promise<VerificationFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = frontendApi
            .getVerificationFlow({
                id: get(page).url.searchParams.get("flow")!,
            })
            .then((it) => it.data);
    } else {
        window.location.replace("/");
    }
</script>

<svelte:head>
    <title>{$t("page.verification.title")}</title>
</svelte:head>

{#await promise then flow}
    <Flow
        {flow}
        title={$t("page.verification.title")}
        group="code"
        messages={flow.ui.messages}
    />
{/await}
