<script lang="ts">
    import { onMount } from "svelte";
    import type { UiNode, UiNodeScriptAttributes } from "@ory/client";
    import { browser } from "$app/environment";

    /** the node to render */
    export let node: UiNode;
    const attributes = node.attributes as UiNodeScriptAttributes;

    const script = document.createElement("script")

    onMount(() => {
        
        if (browser) {
            script.async = true
            script.src = attributes.src
            script.async = attributes.async
            script.crossOrigin = attributes.crossorigin
            script.integrity = attributes.integrity
            script.referrerPolicy = attributes.referrerpolicy
            script.type = attributes.type
            document.body.appendChild(script)
        }
        
        return () => { document.body.removeChild(script) }
    })
</script>

<!--
@component
# Do NOT use this internal component outside of the flow component tree!

This component is used by the flow component to render a script node.
-->
