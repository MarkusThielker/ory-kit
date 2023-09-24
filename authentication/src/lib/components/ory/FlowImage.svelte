<script lang="ts">
    import type { UiNode, UiNodeImageAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeImageAttributes;
</script>

<img alt={node.meta.label?.text} class="w-56 h-56 rounded-shape" src={attributes.src} />
