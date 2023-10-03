<script lang="ts">
    import { t, fromNode } from "$lib/i18n";
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;
</script>

<button
    class="btn-primary"
    name={attributes.name}
    type="button"
    value={attributes.value}
    on:click={(e) => {
        if (attributes.onclick) {
            e.stopPropagation()
            e.preventDefault()
            const run = new Function(attributes.onclick);
            run();
        }
    }}
>
    {$t(fromNode(node), node.meta.label?.context)}
</button>
