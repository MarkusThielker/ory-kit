<script lang="ts">
    import { t } from "$lib/i18n";
    import type { UiNode, UiNodeAnchorAttributes } from "@ory/client";

    /** the node to render */
    export let node: UiNode;
    const attributes = node.attributes as UiNodeAnchorAttributes;
</script>

<!--
@component
# Do NOT use this internal component outside of the flow component tree!

This component is used by the flow component to render an anchor node.
-->

<button
    on:click={(e) => {
        e.stopPropagation()
        e.preventDefault()
        window.location.href = attributes.href
    }}>
    {$t(`ory.${attributes.title?.id}`, attributes.title.context)}
</button>
