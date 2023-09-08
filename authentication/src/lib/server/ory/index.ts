import {
    Configuration,
    OAuth2Api,
} from "@ory/client";

export const oauthApi = new OAuth2Api(new Configuration(
    {
        basePath: "http://localhost:4445",
        baseOptions: {
            withCredentials: true,
        },
    }
))
