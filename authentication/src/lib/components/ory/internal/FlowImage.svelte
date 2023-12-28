<script lang="ts">
    import type { UiNode, UiNodeImageAttributes } from "@ory/client";

    /** the node to render */
    export let node: UiNode;
    const attributes = node.attributes as UiNodeImageAttributes;
</script>

<!--
@component
# Do NOT use this internal component outside of the flow component tree!

This component is used by the flow component to render an image node.
-->

<img alt={node.meta.label?.text} class="w-56 h-56 rounded-shape" src={attributes.src} />
