<script lang="ts">
    import type { UiNode, UiNodeInputAttributes } from "@ory/client";
    import { UiNodeInputAttributesTypeEnum } from "@ory/client/api";
    import FlowInputText from "$lib/components/ory/input/FlowInputText.svelte";
    import FlowInputPassword from "$lib/components/ory/input/FlowInputPassword.svelte";
    import FlowInputNumber from "$lib/components/ory/input/FlowInputNumber.svelte";
    import FlowInputCheckbox from "$lib/components/ory/input/FlowInputCheckbox.svelte";
    import FlowInputHidden from "$lib/components/ory/input/FlowInputHidden.svelte";
    import FlowInputEmail from "$lib/components/ory/input/FlowInputEmail.svelte";
    import FlowInputSubmit from "$lib/components/ory/input/FlowInputSubmit.svelte";
    import FlowInputButton from "$lib/components/ory/input/FlowInputButton.svelte";
    import FlowInputTel from "$lib/components/ory/input/FlowInputTel.svelte";
    import FlowInputDateTimeLocal from "$lib/components/ory/input/FlowInputDateTimeLocal.svelte";
    import FlowInputDate from "$lib/components/ory/input/FlowInputDate.svelte";
    import FlowInputUrl from "$lib/components/ory/input/FlowInputUrl.svelte";

    export let node: UiNode;
    const attributes = node.attributes as UiNodeInputAttributes;
</script>

{#if attributes.type === UiNodeInputAttributesTypeEnum.Text}
    <FlowInputText {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Password}
    <FlowInputPassword {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Number}
    <FlowInputNumber {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Checkbox}
    <FlowInputCheckbox {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Hidden}
    <FlowInputHidden {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Email}
    <FlowInputEmail {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Tel}
    <FlowInputTel {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Submit}
    <FlowInputSubmit {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Button}
    <FlowInputButton {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.DatetimeLocal}
    <FlowInputDateTimeLocal {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Date}
    <FlowInputDate {node} />
{:else if attributes.type === UiNodeInputAttributesTypeEnum.Url}
    <FlowInputUrl {node} />
{/if}
