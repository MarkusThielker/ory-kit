<script lang="ts">
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    /** the node to render */
    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;
</script>

<!--
@component
# Do NOT use this internal component outside of the flow component tree!

This component is used by the flow component to render a hidden input.
-->

<input name={attributes.name} type="hidden" value={attributes.value} />
