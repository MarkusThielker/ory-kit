<script lang="ts">
    import { t } from "$lib/i18n";
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
    {$t(`ory.${attributes.title?.id}`, attributes.title.context)}
</button>
