import { CardWrapper } from "@/components/auth/card-wrapper";
import { SignUpForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SignUp Page",
};

const SignUpPage = () => {
    return (

        <CardWrapper
            headerLabel="Create an account"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/signin"
        >
            <SignUpForm />
        </CardWrapper>
    );
}

export default SignUpPage;