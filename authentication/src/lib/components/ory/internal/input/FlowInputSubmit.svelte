<script lang="ts">
    import { fromNode, t } from "$lib/i18n";
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    /** the node to render */
    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;
</script>

<!--
@component
# Do NOT use this internal component outside of the flow component tree!

This component is used by the flow component to render a form submit button.
-->

<button
    class="btn-primary"
    name={attributes.name}
    type="submit"
    value={attributes.value}
>
    {$t(fromNode(node), node.meta.label?.context)}
</button>
