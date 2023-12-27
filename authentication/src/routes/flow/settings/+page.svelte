<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import type { SettingsFlow, UpdateSettingsFlowBody } from "@ory/client";
    import Messages from "$lib/components/ory/Messages.svelte";
    import { goto } from "$app/navigation";
    import { handleFlowError } from "$lib/ory/handleFlowError";

    const searchParams = get(page).url.searchParams

    let promise: Promise<SettingsFlow>;

    const flowId = searchParams.get("flow");
    if (flowId) {

        promise = frontendApi
            .getSettingsFlow({id: flowId})
            .then((it) => it.data);

    } else {

        promise = frontendApi
            .createBrowserSettingsFlow()
            .then((it) => it.data);
    }

    const handleSubmit = async (
        {detail: {flow, body, setLoadingFalse}}: CustomEvent<{
            flow: SettingsFlow,
            body: UpdateSettingsFlowBody,
            setLoadingFalse: () => void
        }>
    ) => {

        searchParams.set('flow', flow.id);
        await goto(`?${searchParams.toString()}`, {replaceState: true});

        await frontendApi.updateSettingsFlow({
            flow: flow.id,
            updateSettingsFlowBody: body,
        })
            .then(({data}) => {
                promise = Promise.resolve(data)

                if (data.continue_with) {
                    for (const item of data.continue_with) {
                        switch (item.action) {
                            case "show_verification_ui":
                                goto("/verification?flow=" + item.flow.id)
                                return
                        }
                    }
                }

                if (data.return_to) {
                    window.location.href = data.return_to
                    return
                }
            })
            .catch(handleFlowError("settings"))
            .finally(setLoadingFalse);
    }

</script>

<svelte:head>
    <title>{$t("page.settings.title")} - {$t("page.settings.profile.title")}</title>
</svelte:head>

<div class="space-y-8">

    <div class="card grid grid-cols-2 text-center">

        <a href="/flow/settings" class="text-xl font-semibold">{$t("page.settings.profile.title")}</a>

        <a href="/flow/settings/sessions" class="text-xl">{$t("page.settings.sessions.title")}</a>

    </div>

    {#await promise then flow}

        <div class="max-w-lg mx-auto">
            {#if flow.ui.messages}
                <Messages messages={flow.ui.messages}/>
            {/if}
        </div>

        <Flow
                {flow}
                title={$t("page.settings.profile.title")}
                group="profile"
                on:submit={handleSubmit}
        />

        <Flow
                {flow}
                title={$t("page.settings.password.title")}
                group="password"
                on:submit={handleSubmit}
        />

        <Flow
                {flow}
                title={$t("page.settings.oidc.title")}
                group="oidc"
                on:submit={handleSubmit}
        />

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
    {/await}
</div>
