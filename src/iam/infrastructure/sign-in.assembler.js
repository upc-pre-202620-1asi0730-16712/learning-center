import {SignInResource} from "@/iam/infrastructure/sign-in.resource.js";

export class SignInAssembler {
    static toResourceFromResponse(response) {
        console.log(response);
        if (response.status !== 200) {
            console.error(`Error occurred while signing in: ${response.statusText}`);
            return null;
        }
        return new SignInResource(response.data);
    }
}