import useIamStore from "@/iam/application/iam.store.js";

/**
 * Adds the IAM bearer token to outbound requests when a user is authenticated.
 *
 * @param {import('axios').AxiosRequestConfig} config - The Axios request configuration object.
 * @returns {import('axios').AxiosRequestConfig} The modified Axios request configuration object with the Authorization header added if the user is signed in.
 */
export const iamInterceptor = (config) => {
    const store = useIamStore();
    const { isSignedIn, currentToken } = store;
    if (isSignedIn) {
        config.headers.Authorization = `Bearer ${currentToken}`;
        console.log(config);
    }
    return config;
}