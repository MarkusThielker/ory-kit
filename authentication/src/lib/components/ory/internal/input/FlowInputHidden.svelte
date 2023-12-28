<script lang="ts">
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;
</script>

<input name={attributes.name} type="hidden" value={attributes.value} />
