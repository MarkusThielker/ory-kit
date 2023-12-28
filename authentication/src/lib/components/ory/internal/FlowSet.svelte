<script lang="ts">
    import type { UiNode } from "@ory/client";
    import { UiNodeTypeEnum } from "@ory/client";
    import FlowImage from "$lib/components/ory/internal/FlowImage.svelte";
    import FlowText from "$lib/components/ory/internal/FlowText.svelte";
    import FlowInput from "$lib/components/ory/internal/FlowInput.svelte";
    import FlowScript from "./FlowScript.svelte";
    import FlowAnchor from "./FlowAnchor.svelte";

    /** the node to render */
    export let nodes: Array<UiNode>;
</script>

<!--
@component
# Do NOT use this internal component outside of the flow component tree!

This component is used by the flow component to determine the node type and render the node depending on that type.
-->

<div class="flex flex-col space-y-1 w-full">
    {#each nodes as node}
        {#if node.type === UiNodeTypeEnum.Input}
            <FlowInput {node} />
        {:else if node.type === UiNodeTypeEnum.Text}
            <FlowText {node} />
        {:else if node.type === UiNodeTypeEnum.Img}
            <FlowImage {node} />
        {:else if node.type === UiNodeTypeEnum.A}
            <FlowAnchor {node} />
        {:else if node.type === UiNodeTypeEnum.Script}
            <FlowScript {node} />
        {:else}
            Unknown node type: {node.type}
        {/if}
    {/each}
</div>
