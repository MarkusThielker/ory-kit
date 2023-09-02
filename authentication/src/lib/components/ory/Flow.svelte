<script lang="ts">
    import FlowSet from "$lib/components/ory/FlowSet.svelte";
    import Messages from "$lib/components/ory/Messages.svelte";
    import type { Message, UiContainer, UiNode, UiText } from "@ory/client";

    export let ui: UiContainer;
    export let title: string = "";
    export let groups: string[] = [];
    export let messages: UiText[] | Message[] | undefined;

    groups = ["default", ...groups];
    let nodes = ui.nodes.filter((node: UiNode) =>
        // If no groups are specified, show all nodes
        groups.length == 1 ? true : groups.includes(node.group)
    );

    // only show flow if there are non-default nodes
    $: showFlow = nodes.find((node: UiNode) => node.group !== "default");
</script>

{#if showFlow}
    <div class="card">
        <p class="heading mb-2">{title}</p>

        {#if messages}
            <Messages {messages} />
        {/if}

        <form action={ui.action} method={ui.method}>
            <FlowSet {nodes} />
        </form>
    </div>
{/if}
