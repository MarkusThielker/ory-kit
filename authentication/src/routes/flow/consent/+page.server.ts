import { oauthApi } from "$lib/server/ory";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {

    const consentChallenge = url.searchParams.get("consent_challenge");
    if (!consentChallenge) {
        return { status: 400 };
    }

    console.log("consentChallenge", consentChallenge);

    const request = await oauthApi
        .getOAuth2ConsentRequest({ consentChallenge })
        .then((it) => it.data);

    return {
        oauth2ConsentRequest: request,
    };
};
