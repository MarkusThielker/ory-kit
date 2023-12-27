<script lang="ts">
    import FlowSet from "$lib/components/ory/FlowSet.svelte";
    import Messages from "$lib/components/ory/Messages.svelte";
    import type {
        LoginFlow,
        Message,
        RecoveryFlow,
        RegistrationFlow,
        SettingsFlow,
        UiNode,
        UiText,
        UpdateLoginFlowBody,
        UpdateRecoveryFlowBody,
        UpdateRegistrationFlowBody,
        UpdateSettingsFlowBody,
        UpdateVerificationFlowBody,
        VerificationFlow
    } from "@ory/client";
    import { createEventDispatcher } from "svelte";

    type Values = Partial<
        | UpdateLoginFlowBody
        | UpdateRegistrationFlowBody
        | UpdateRecoveryFlowBody
        | UpdateSettingsFlowBody
        | UpdateVerificationFlowBody
    >

    type Groups =
        | "oidc"
        | "password"
        | "profile"
        | "totp"
        | "webauthn"
        | "link"
        | "lookup_secret"
        | "code"

    type Flows =
        | LoginFlow
        | RegistrationFlow
        | SettingsFlow
        | VerificationFlow
        | RecoveryFlow

    export let flow: Flows
    export let title: string = ""
    export let group: Groups
    export let messages: UiText[] | Message[] | undefined = undefined

    const groups = ["default"];
    if (group) {
        group === "oidc" && groups.pop();
        groups.push(group);
    }

    let nodes = flow.ui.nodes.filter((node: UiNode) =>
        groups.includes(node.group)
    );

    // only show flow if there are non-default nodes
    $: showFlow = nodes.find((node: UiNode) => node.group !== "default")

    const dispatch = createEventDispatcher()
    let isLoading = false

    const handleSubmit = (event: SubmitEvent) => {

        // Prevent all native handlers
        event.stopPropagation()
        event.preventDefault()

        // Prevent double submission!
        if (isLoading) {
            return
        }

        const form = event.currentTarget

        let body: Values | undefined

        if (form && form instanceof HTMLFormElement) {
            const formData = new FormData(form)

            // map the entire form data to JSON for the request body
            body = Object.fromEntries(formData) as Values

            if (event.submitter) {
                const submitterTyped = event.submitter as HTMLInputElement
                body = {
                    ...body,
                    ...{[submitterTyped.name]: submitterTyped.value},
                }
            }
        }

        isLoading = true

        dispatch("submit", {flow, body, setLoadingFalse: () => isLoading = false})
    }

</script>

{#if showFlow}
    <div class="card">
        <p class="heading mb-2">{title}</p>

        {#if messages}
            <Messages {messages}/>
        {/if}

        <form class={`flex relative duration-300 ${isLoading ? 'opacity-30' : ''}`} on:submit={handleSubmit}>
            <FlowSet {nodes} />
        </form>
    </div>
{/if}
