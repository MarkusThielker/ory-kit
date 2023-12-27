<script lang="ts">
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { onMount } from "svelte";
    import identity from "$lib/stores/identity";
    import type { RegistrationFlow, UpdateRegistrationFlowBody } from "@ory/client";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import { frontendApi } from "$lib/ory";
    import Messages from "$lib/components/ory/Messages.svelte";
    import { goto } from "$app/navigation";
    import { handleFlowError } from "$lib/ory/handleFlowError";
    import { browser } from "$app/environment";

    $: isAuthenticated = $identity && browser;
    const searchParams = get(page).url.searchParams

    let promise: Promise<RegistrationFlow>;

    const flowId = searchParams.get("flow");
    if (flowId) {

        promise = frontendApi
            .getRegistrationFlow({id: flowId})
            .then((it) => it.data);

    } else {

        promise = frontendApi
            .createBrowserRegistrationFlow()
            .then((it) => it.data);
    }

    const handleSubmit = async (
        {detail: {flow, body, setLoadingFalse}}: CustomEvent<{
            flow: RegistrationFlow,
            body: UpdateRegistrationFlowBody,
            setLoadingFalse: () => void
        }>
    ) => {

        searchParams.set('flow', flow.id);
        await goto(`?${searchParams.toString()}`, {replaceState: true});

        await frontendApi.updateRegistrationFlow({
            flow: flow.id,
            updateRegistrationFlowBody: body,
        })
            .then(async ({data}) => {
                identity.set(data.identity)
                if (data.continue_with) {
                    for (const item of data.continue_with) {
                        switch (item.action) {
                            case "show_verification_ui":
                                await goto("/flow/verification?flow=" + item.flow.id)
                                return
                        }
                    }
                }
                await goto(flow?.return_to || "/")
            })
            .catch(handleFlowError("registration"))
            .catch((err) => {
                if (err.response?.status === 400) {
                    promise = Promise.resolve(err.response.data)
                }
            })
            .finally(setLoadingFalse);
    }

    onMount(() => {
        if (isAuthenticated) {
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
            {flow}
            title={$t("page.registration.title")}
            group="password"
            on:submit={handleSubmit}
        />

        <Flow
            {flow}
            group="oidc"
            on:submit={handleSubmit}
        />

        <div class="alternative-actions">
            <a href="/flow/login">{$t("page.registration.login")}</a>
        </div>
    {/await}
</div>
