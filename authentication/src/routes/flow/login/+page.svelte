<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { page } from "$app/stores";
    import type { FrontendApiCreateBrowserLoginFlowRequest, LoginFlow, UpdateLoginFlowBody } from "@ory/client";
    import identity from "$lib/stores/identity";
    import LogoutButton from "$lib/components/ory/LogoutButton.svelte";
    import Messages from "$lib/components/ory/Messages.svelte";
    import { goto } from "$app/navigation";
    import { handleFlowError } from "$lib/ory/handleFlowError";
    import { get } from "svelte/store";

    const searchParams = get(page).url.searchParams

    let promise: Promise<LoginFlow>;

    const flowId = searchParams.get("flow");
    if (flowId) {

        promise = frontendApi
            .getLoginFlow({id: flowId})
            .then((it) => it.data);

    } else {

        const requestParameters = {
            return: Boolean(searchParams.get("return")),
            aal: searchParams.get("aal"),
            returnTo: searchParams.get("return_to"),
            loginChallenge: searchParams.get("login_challenge"),
        } as FrontendApiCreateBrowserLoginFlowRequest

        promise = frontendApi
            .createBrowserLoginFlow(requestParameters)
            .then((it) => it.data);
    }

    const handleSubmit = async (
        {detail: {flow, body, setLoadingFalse}}: CustomEvent<{
            flow: LoginFlow,
            body: UpdateLoginFlowBody,
            setLoadingFalse: () => void
        }>
    ) => {

        searchParams.set('flow', flow.id);
        await goto(`?${searchParams.toString()}`, {replaceState: true});

        await frontendApi.updateLoginFlow({
            flow: flow.id,
            updateLoginFlowBody: body,
        })
            .then(() => {
                if (flow.return_to) {
                    window.location.href = flow?.return_to
                    return
                }
                identity.loadIdentity("/")
            })
            .catch(handleFlowError("login"))
            .catch((err) => {
                if (err.response?.status === 400) {
                    promise = Promise.resolve(err.response.data)
                }
            })
            .finally(setLoadingFalse);
    }

</script>

<svelte:head>
    <title>{$t("page.login.title")}</title>
</svelte:head>

<div class="space-y-8">
    {#await promise then flow}

        <div class="max-w-lg mx-auto">
            {#if flow.ui.messages}
                <Messages messages={flow.ui.messages} />
            {/if}
        </div>

        <Flow
            {flow}
            title={$t("page.login.title")}
            group="password"
            on:submit={handleSubmit}
        />

        <Flow
            {flow}
            group="oidc"
            on:submit={handleSubmit}
        />

        {#if flow.requested_aal === "aal2" || flow.requested_aal === "aal3"}

            <Flow
                {flow}
                title={$t("page.settings.totp.title")}
                group="totp"
                on:submit={handleSubmit}
            />

            <Flow
                {flow}
                title={$t("page.settings.webauthn.title")}
                group="webauthn"
                on:submit={handleSubmit}
            />

            <Flow
                {flow}
                title={$t("page.settings.lookup_secret.title")}
                group="lookup_secret"
                on:submit={handleSubmit}
            />

            <div class="flex card">
                <LogoutButton />
            </div>
        {/if}

        {#if flow.requested_aal === "aal1"}
            <div class="alternative-actions">
                <a href="/flow/recovery">{$t("page.login.forgot")}</a>
                <a href="/flow/registration">{$t("page.login.registration")}</a>
            </div>
        {/if}
    {/await}
</div>
