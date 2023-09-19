import {
    Configuration,
    OAuth2Api,
} from "@ory/client";
import { env } from "$env/dynamic/private";

export const oauthApi = new OAuth2Api(new Configuration(
    {
        basePath: env.HYDRA_ADMIN_API,
        baseOptions: {
            withCredentials: true,
        },
    }
))
