<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import { page } from "$app/stores";
    import type { UpdateVerificationFlowBody, VerificationFlow } from "@ory/client";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    import { handleFlowError } from "$lib/ory/handleFlowError";
    import identity from "$lib/stores/identity";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    $: isAuthenticated = $identity && browser;
    const searchParams = get(page).url.searchParams

    let promise: Promise<VerificationFlow>;

    const flowId = searchParams.get("flow");
    if (flowId) {

        promise = frontendApi
            .getVerificationFlow({id: flowId})
            .then((it) => it.data);

    } else {

        const returnTo = searchParams.get("return_to");

        promise = frontendApi
            .createBrowserVerificationFlow({returnTo: returnTo ? returnTo : undefined})
            .then((it) => it.data)
    }

    const handleSubmit = async (
        {detail: {flow, body, setLoadingFalse}}: CustomEvent<{
            flow: VerificationFlow,
            body: UpdateVerificationFlowBody,
            setLoadingFalse: () => void
        }>
    ) => {

        searchParams.set('flow', flow.id);
        await goto(`?${searchParams.toString()}`, {replaceState: true});

        await frontendApi.updateVerificationFlow({
            flow: flow.id,
            updateVerificationFlowBody: body,
        })
            .then(({data}) => {
                promise = Promise.resolve(data)
            })
            .catch(handleFlowError("verification", (flow) => {
                promise = Promise.resolve(flow)
            }))
            .catch((err) => {
                switch (err.response?.status) {
                    case 410:
                    // Status code 410 means the request has expired - so let's load a fresh flow!
                    case 403:
                        // Status code 403 implies some other issue (e.g. CSRF) - let's reload!
                        return window.location.replace("/flow/verification")
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
    <title>{$t("page.verification.title")}</title>
</svelte:head>

{#await promise then flow}
    <Flow
        {flow}
        title={$t("page.verification.title")}
        group={"code"}
        messages={flow.ui.messages}
        on:submit={handleSubmit}
    />
{/await}
