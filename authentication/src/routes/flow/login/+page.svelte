<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import type { LoginFlow } from "@ory/client";
    import identity from "$lib/stores/identity";
    import { browser } from "$app/environment";
    import LogoutButton from "$lib/components/ory/LogoutButton.svelte";

    let promise: Promise<LoginFlow>;
    if (get(page).url.searchParams.get("flow")) {
        promise = frontendApi
            .getLoginFlow({ id: get(page).url.searchParams.get("flow")! })
            .then((it) => it.data);

        if ($identity && browser) {
            window.location.replace("/");
        }
    } else {

        const requestParameters: {refresh?: boolean, aal?: string, returnTo?: string, loginChallenge?: string} = {}
        if (get(page).url.searchParams.get("refresh")) {
            requestParameters.refresh = Boolean(get(page).url.searchParams.get("refresh")!);
        }
        if (get(page).url.searchParams.get("aal")) {
            requestParameters.aal = get(page).url.searchParams.get("aal")! as string
        }
        if (get(page).url.searchParams.get("return_to")) {
            requestParameters.returnTo = get(page).url.searchParams.get("return_to")! as string
        }
        if (get(page).url.searchParams.get("login_challenge")) {
            requestParameters.loginChallenge = get(page).url.searchParams.get("login_challenge")! as string
        }

        promise = frontendApi.createBrowserLoginFlow(requestParameters).then((it) => it.data);
    }
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

            {#await frontendApi.createBrowserLogoutFlow() then flow}
                <div class="flex card">
                    <LogoutButton />
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
