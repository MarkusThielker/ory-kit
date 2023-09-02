<script lang="ts">
    import type { UiNode, UiNodeTextAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeTextAttributes;
</script>

{attributes.text.text}
