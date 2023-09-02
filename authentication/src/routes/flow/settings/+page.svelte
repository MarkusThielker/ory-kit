<script lang="ts">
    import ory from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import type { SettingsFlow } from "@ory/client";
    import identity from "$lib/stores/identity";

    let promise: Promise<SettingsFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = ory
            .getSettingsFlow({ id: get(page).url.searchParams.get("flow")! })
            .then((it) => it.data);
    } else {
        promise = ory.createBrowserSettingsFlow().then((it) => it.data);
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
        <Flow
            ui={flow.ui}
            title={$t("page.settings.profile.title")}
            groups={["profile"]}
            messages={flow.ui.messages}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.password.title")}
            groups={["password"]}
            messages={flow.ui.messages}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.totp.title")}
            groups={["totp"]}
            messages={flow.ui.messages}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.webauthn.title")}
            groups={["webauthn"]}
            messages={flow.ui.messages}
        />

        <Flow
            ui={flow.ui}
            title={$t("page.settings.lookup_secret.title")}
            groups={["lookup_secret"]}
            messages={flow.ui.messages}
        />
    {/await}
</div>
