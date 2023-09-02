<script lang="ts">
    import Messages from "$lib/components/ory/Messages.svelte";
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;
</script>

<fieldset>
    <label>
        <span>{node.meta.label?.text}</span>
        <input
            class="text-input"
            disabled={attributes.disabled}
            name={attributes.name}
            placeholder={node.meta.label?.text}
            required={attributes.required}
            type="url"
            value={attributes.value ?? ""}
        />
    </label>
</fieldset>

<Messages messages={node.messages} />
