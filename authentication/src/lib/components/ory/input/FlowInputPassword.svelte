<script lang="ts">
    import Messages from "$lib/components/ory/Messages.svelte";
    import PasswordToggle from "$lib/components/ory/input/FlowInputPasswordToggle.svelte";
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;

    let isHidden = true;
</script>

<fieldset>
    <label class="flex flex-col">
        <span>{node.meta.label?.text}</span>
        <span class="inline-flex items-center">
            <input
                class="text-input"
                disabled={attributes.disabled}
                name={attributes.name}
                placeholder={node.meta.label?.text}
                required={attributes.required}
                type={isHidden ? "password" : "text"}
                value={attributes.value ?? ""}
            />
            <PasswordToggle bind:isHidden classNames="-ml-8" />
        </span>
    </label>
</fieldset>

<Messages messages={node.messages} />
