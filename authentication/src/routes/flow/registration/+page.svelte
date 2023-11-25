<script lang="ts">
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { onMount } from "svelte";
    import identity from "$lib/stores/identity";
    import type { RegistrationFlow } from "@ory/client";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import { frontendApi } from "$lib/ory";
    import Messages from "$lib/components/ory/Messages.svelte";

    let promise: Promise<RegistrationFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = frontendApi
            .getRegistrationFlow({
                id: get(page).url.searchParams.get("flow")!,
            })
            .then((it) => it.data);
    } else {
        promise = frontendApi.createBrowserRegistrationFlow().then((it) => it.data);
    }

    onMount(() => {
        if ($identity) {
            window.location.replace("/");
        }
    });
</script>

<svelte:head>
    <title>{$t("page.registration.title")}</title>
</svelte:head>

<div class="space-y-8">
    {#await promise then flow}

        <div class="max-w-lg mx-auto">
            {#if flow.ui.messages}
                <Messages messages={flow.ui.messages} />
            {/if}
        </div>

        <Flow
            ui={flow.ui}
            title={$t("page.registration.title")}
            group="password"
        />

        <Flow
            ui={flow.ui}
            group="oidc"
        />

        <div class="alternative-actions">
            <a href="/flow/login">{$t("page.registration.login")}</a>
        </div>
    {/await}
</div>
