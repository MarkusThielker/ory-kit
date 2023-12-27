import type { PageLoad } from "./$types";
import identityStore from "$lib/stores/identity";

export const load: PageLoad = async () => {
    await identityStore.loadIdentity();
}
