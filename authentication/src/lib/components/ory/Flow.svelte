<script lang="ts">
    import FlowSet from "$lib/components/ory/internal/FlowSet.svelte";
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

    /** the flow object returned by the ORY sdk */
    export let flow: Flows
    /** the title to show inside at the top of the card */
    export let title: string = ""
    /** the internal of UI nodes to show in the card */
    export let group: Groups
    /** The messages to show inside the card. Leave empty to show no messages */
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

<!--
@component

# Flow
A flow is a collection of UI nodes, provided by the Ory Kratos API, that are rendered in a card.
The flow component is responsible for rendering the UI nodes and handling the submission of the form.
Always specify the `group` prop and pass the flow object, otherwise the component will not render anything.
To handle submission of the form, listen to the `submit` event. The properties contain the flow, form
data and a function to reset the loading state.

## Example
```svelte
<Flow
    {flow}
    group="password"
    on:submit={({flow, body, setLoadingFalse}) => ...}/>
```
-->

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
