import {IamApi} from "@/iam/infrastructure/iam-api.js";
import {defineStore} from "pinia";
import {ref} from "vue";
import {SignInAssembler} from "@/iam/infrastructure/sign-in.assembler.js";
import {UserAssembler} from "@/iam/infrastructure/user.assembler.js";
import {SignUpAssembler} from "@/iam/infrastructure/sign-up.assembler.js";
import {User} from "@/iam/domain/user.entity.js";

const iamApi = new IamApi();

const useIamStore = defineStore('iam', () => {

    const users = ref([]);

    const errors = ref([]);

    const usersLoaded = ref(false);

    const isSignedIn = ref(false);

    const currentUsername = ref(null);

    const currentUserId = ref(0);

    const currentToken = ref(null);

    function signIn(signInCommand, router) {
        console.log(signInCommand);
        iamApi.signIn(signInCommand)
        .then(response => {
            let signInResource = SignInAssembler.toResourceFromResponse(response);
            if (signInResource) {
                let currentUser = UserAssembler.toEntityFromResource(signInResource);
                currentUsername.value = currentUser.username;
                currentUserId.value = currentUser.id;
                localStorage.setItem('token', signInResource.token);
                isSignedIn.value = true;
                console.log(`Signed in as ${currentUsername.value}`);
                errors.value = [];
                router.push({name: 'home'});
            } else {
                isSignedIn.value = false;
                console.log(`Sign in failed: ${response.status} - ${response.statusText}`);
                errors.value.push(new Error('Sign in failed'));
                router.push({name: 'iam-sign-in'});
            }
        })
        .catch(error => {
            isSignedIn.value = false;
            currentUsername.value = error.name;
            console.error(error);
            errors.value.push(error);
            router.push({name: 'iam-sign-in'});
        });
    }

    function signUp(signUpCommand, router) {

        iamApi.signUp(signUpCommand)
        .then(response => {
            let signUpResource = SignUpAssembler.toResourceFromResponse(response);
            if (signUpResource) {
                console.log(signUpResource.message);
                errors.value = [];
                router.push({name: 'iam-sign-in'});
            } else {
                console.log(`Sign up failed: ${response.status} - ${response.statusText}`);
                errors.value.push(new Error('Sign up failed'));
                router.push({name: 'iam-sign-up'});
            }
        })
        .catch(error => {
            console.log(error);
            errors.value.push(error);
            router.push({name: 'iam-sign-up'});
        });
    }

    function signOut() {
        currentUsername.value = null;
        currentUserId.value = 0;
        localStorage.removeItem('token');
        isSignedIn.value = false;
        console.log('User signed out');
        errors.value = [];
    }

    function fetchUsers() {
        iamApi.getUsers()
            .then(response => {
                users.value = UserAssembler.toEntitiesFromResponse(response);
                usersLoaded.value = true;
                console.log(`Fetched ${users.value.length} users`);
                errors.value = [];
            })
            .catch(error => {
                console.error(error);
                errors.value.push(error);
            });
    }

    return {
        users,
        errors,
        usersLoaded,
        currentUsername,
        currentUserId,
        currentToken,
        isSignedIn,
        signIn,
        signUp,
        signOut,
        fetchUsers
    };
});

export default useIamStore;