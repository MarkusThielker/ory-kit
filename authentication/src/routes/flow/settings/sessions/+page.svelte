<script lang="ts">
</script>

<svelte:head>
    <title>{$t("page.settings.title")} - {$t("page.settings.sessions.title")}</title>
</svelte:head>

<div class="space-y-8">

    <div class="card grid grid-cols-2 text-center">

        <a href="/flow/settings" class="text-xl">{$t("page.settings.profile.title")}</a>

        <a href="/flow/settings/sessions" class="text-xl font-semibold">{$t("page.settings.sessions.title")}</a>

    </div>

</div>
