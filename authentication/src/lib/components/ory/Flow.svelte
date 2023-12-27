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
</script>

{#if showFlow}
    <div class="card">
        <p class="heading mb-2">{title}</p>

        {#if messages}
            <Messages {messages}/>
        {/if}

        <form action={ui.action} method={ui.method}>
            <FlowSet {nodes} />
        </form>
    </div>
{/if}
