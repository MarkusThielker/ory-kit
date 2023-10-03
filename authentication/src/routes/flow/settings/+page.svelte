<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import type { SettingsFlow } from "@ory/client";
    import identity from "$lib/stores/identity";
    import Messages from "$lib/components/ory/Messages.svelte";

    let promise: Promise<SettingsFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = frontendApi
            .getSettingsFlow({ id: get(page).url.searchParams.get("flow")! })
            .then((it) => it.data);
    } else {
        promise = frontendApi.createBrowserSettingsFlow().then((it) => it.data);
    }

    onMount(() => {
        if (!$identity) {
            window.location.replace("/flow/login");
        }
    });
</script>

<svelte:head>
    <title>{$t("page.settings.title")}</title>
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
            title={$t("page.settings.profile.title")}
            groups={["profile"]}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.password.title")}
            groups={["password"]}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.totp.title")}
            groups={["totp"]}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.webauthn.title")}
            groups={["webauthn"]}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.lookup_secret.title")}
            groups={["lookup_secret"]}
        />
    {/await}
</div>
