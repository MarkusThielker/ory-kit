<script lang="ts">
    import ory from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import type { LoginFlow } from "@ory/client";
    import identity from "$lib/stores/identity";

    let promise: Promise<LoginFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = ory
            .getLoginFlow({ id: get(page).url.searchParams.get("flow")! })
            .then((it) => it.data);
    } else {
        promise = ory.createBrowserLoginFlow().then((it) => it.data);
    }

    onMount(() => {
        if ($identity) {
            window.location.replace("/");
        }
    });
</script>

<svelte:head>
    <title>{$t("page.login.title")}</title>
</svelte:head>

<div class="space-y-8">
    {#await promise then flow}
        <Flow
            ui={flow.ui}
            title={$t("page.login.title")}
            groups={["password"]}
            messages={flow.ui.messages}
        />

        {#if flow.requested_aal === "aal2" || flow.requested_aal === "aal3"}
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

            {#await ory.createBrowserLogoutFlow() then flow}
                <div class="flex card">
                    <a
                        href={flow.data.logout_url}
                        data-sveltekit-preload-data="tap"
                        class="btn-secondary w-full"
                    >
                        {$t("page.logout.title")}
                    </a>
                </div>
            {/await}
        {/if}

        {#if flow.requested_aal === "aal1"}
            <div class="alternative-actions">
                <a href="/flow/recovery">{$t("page.login.forgot")}</a>
                <a href="/flow/registration">{$t("page.login.registration")}</a>
            </div>
        {/if}
    {/await}
</div>
