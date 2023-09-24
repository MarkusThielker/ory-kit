<script lang="ts">
    import type { UiNode, UiNodeAnchorAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeAnchorAttributes;
</script>

<button
    on:click={(e) => {
        e.stopPropagation()
        e.preventDefault()
        window.location.href = attributes.href
    }}>
{attributes.title.text}
</button>
