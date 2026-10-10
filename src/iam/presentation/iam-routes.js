const signInForm = () => import('@/iam/presentation/components/views/sign-in-form.vue');
const signUpForm = () => import('@/iam/presentation/components/views/sign-up-form.vue');
const iamRoutes = [
    {
        path: 'sign-in',
        name: 'iam-sign-in',
        command: signInForm,
        meta: {
            title: 'Sign In',
        }
    },
    {
        path: 'sign-up',
        name: 'iam-sign-up',
        command: signUpForm,
        meta: {
            title: 'Sign Up',
        }
    }
];

export default iamRoutes;

