import { CardWrapper } from "@/components/auth/card-wrapper";
import { SignInForm } from "@/components/auth/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignIn Page",
};

const SignInPage = () => {
    return (

        <CardWrapper
            headerLabel="Welcome back"
            backButtonLabel="Don't have an account?"
            backButtonHref="/auth/signup"
        >
            <SignInForm />
        </CardWrapper>
    );
}

export default SignInPage;