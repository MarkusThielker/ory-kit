<script lang="ts">
    import { fromNode, t } from "$lib/i18n";
    import Messages from "$lib/components/ory/Messages.svelte";
    import PasswordToggle from "$lib/components/ory/internal/input/FlowInputPasswordToggle.svelte";
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    /** the node to render */
    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;

    let isHidden = true;
</script>

<!--
@component
# Do NOT use this internal component outside of the flow component tree!

This component is used by the flow component to render a password input.
-->

<fieldset>
    <label class="flex flex-col">
        <span>{$t(fromNode(node), node.meta.label?.context)}</span>
        <span class="inline-flex items-center">
            <input
                class="text-input"
                disabled={attributes.disabled}
                name={attributes.name}
                placeholder={$t(fromNode(node), node.meta.label?.context)}
                required={attributes.required}
                type={isHidden ? "password" : "text"}
                value={attributes.value ?? ""}
            />
            <PasswordToggle bind:isHidden classNames="-ml-8" />
        </span>
    </label>
</fieldset>

<Messages messages={node.messages} />
