<script lang="ts">
    import { t } from "$lib/i18n";
    import { goto } from "$app/navigation";
</script>

<button
        class="btn-primary fixed top-6 left-6 w-8 max-w-fit inline-flex items-center justify-center"
        on:click={() => goto("/")}
>
    <span class="inline-flex items-center justify-center space-x-2 mx-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span>{$t('page.common.back')}</span>
    </span>
</button>

<slot />
