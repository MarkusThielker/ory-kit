import { oauthApi } from "$lib/server/ory";
import type { PageServerLoad } from "./$types";
import { redirect, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {

    const consentChallenge = url.searchParams.get("consent_challenge");
    if (!consentChallenge) {
        return { status: 400 };
    }

    const requestRequest = await oauthApi
        .getOAuth2ConsentRequest({ consentChallenge })
        .then((it) => it.data);

    return {
        oauth2ConsentRequest: requestRequest,
    };
};

export const actions: Actions = {
	accept: async ({ request }) => {
        const data = await request.formData();
        const response = await oauthApi.acceptOAuth2ConsentRequest({ 
            consentChallenge: data.get("consentChallenge") as string 
        })
        throw redirect(303, response.data.redirect_to)
    },
	reject: async ({ request }) => {
        const data = await request.formData();
        const response = await oauthApi.rejectOAuth2ConsentRequest({ 
            consentChallenge: data.get("consentChallenge") as string 
        })
        throw redirect(303, response.data.redirect_to)
    }
};
