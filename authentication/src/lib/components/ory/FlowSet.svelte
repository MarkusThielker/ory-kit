<script lang="ts">
    import type { UiNode } from "@ory/client";
    import { UiNodeTypeEnum } from "@ory/client";
    import FlowImage from "$lib/components/ory/FlowImage.svelte";
    import FlowText from "$lib/components/ory/FlowText.svelte";
    import FlowInput from "$lib/components/ory/input/FlowInput.svelte";

    export let nodes: Array<UiNode>;
</script>

<div class="flex flex-col space-y-1">
    {#each nodes as node}
        {#if node.type === UiNodeTypeEnum.Input}
            <FlowInput {node} />
        {:else if node.type === UiNodeTypeEnum.Text}
            <FlowText {node} />
        {:else if node.type === UiNodeTypeEnum.Img}
            <FlowImage {node} />
        {:else if node.type === UiNodeTypeEnum.A}
            <!-- <FlowA {node} /> -->
        {:else if node.type === UiNodeTypeEnum.Script}
            <!-- <FlowScript {node} /> -->
        {:else}
            Unknown node type: {node.attributes.type}
        {/if}
    {/each}
</div>
