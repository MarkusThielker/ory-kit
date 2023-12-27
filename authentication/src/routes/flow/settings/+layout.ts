import type { LayoutLoad } from "./$types";
import identityStore from "$lib/stores/identity";

export const load: LayoutLoad = async () => {
    await identityStore.loadIdentity();
}
