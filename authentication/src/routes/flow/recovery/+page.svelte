<script lang="ts">
    import { frontendApi } from "$lib/ory";
    import { t } from "$lib/i18n";
    import Flow from "$lib/components/ory/Flow.svelte";
    import type { RecoveryFlow, UpdateRecoveryFlowBody, } from "@ory/client";
    import identity from "$lib/stores/identity";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { handleFlowError } from "$lib/ory/handleFlowError";
    import type { AxiosError } from "axios";

    const searchParams = get(page).url.searchParams

    let promise: Promise<RecoveryFlow>;

    const flowId = searchParams.get("flow");
    if (flowId) {

        promise = frontendApi
            .getRecoveryFlow({id: flowId})
            .then((it) => it.data);

    } else {

        promise = frontendApi
            .createBrowserRecoveryFlow()
            .then((it) => it.data);
    }

    const handleSubmit = async (
        {detail: {flow, body, setLoadingFalse}}: CustomEvent<{
            flow: RecoveryFlow,
            body: UpdateRecoveryFlowBody,
            setLoadingFalse: () => void
        }>
    ) => {

        searchParams.set('flow', flow.id);
        await goto(`?${searchParams.toString()}`, {replaceState: true});

        await frontendApi.updateRecoveryFlow({
            flow: flow.id,
            updateRecoveryFlowBody: body,
        })
            .then(({data}) => {
                identity.loadIdentity()
                promise = Promise.resolve(data)
            })
            .catch(handleFlowError("recovery"))
            .catch((err: AxiosError) => {
                if (err.response?.status === 400) {
                    promise = Promise.resolve(err.response?.data as RecoveryFlow)
                    return
                }
                return Promise.reject(err)
            })
            .finally(setLoadingFalse);
    }

</script>

<svelte:head>
    <title>{$t("page.recovery.title")}</title>
</svelte:head>

{#await promise then flow}
    <Flow
        {flow}
        title={$t("page.recovery.title")}
        group="code"
        messages={flow.ui.messages}
        on:submit={handleSubmit}
    />
{/await}
