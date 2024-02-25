"use client";

import type { InputProps } from "@nextui-org/react";

import React from "react";
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
type SignUpProps = {
  toggleAuthMode: () => void;
  signUp: (formData: FormData) => void;
};
export default function SignUp({ toggleAuthMode }: SignUpProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);
  const { signUp } = useAuth();
  const inputClasses: InputProps["classNames"] = {
    inputWrapper:
      "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
  };

  const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
      <p className="pb-2 text-xl font-medium">Sign Up</p>
      <form
        className="flex flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const username = formData.get("username") as string;
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;
          await signUp(username, email, password);
        }}
      >
        <Input
          isRequired
          classNames={inputClasses}
          label="Username"
          name="username"
          placeholder="Enter your username"
          type="text"
          variant="bordered"
        />
        <Input
          isRequired
          classNames={inputClasses}
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
        />
        <Input
          isRequired
          classNames={inputClasses}
          endContent={
            <button type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <Icon
                  className="pointer-events-none text-2xl text-foreground/50"
                  icon="solar:eye-closed-linear"
                />
              ) : (
                <Icon
                  className="pointer-events-none text-2xl text-foreground/50"
                  icon="solar:eye-bold"
                />
              )}
            </button>
          }
          label="Password"
          name="password"
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          variant="bordered"
        />
        <Input
          isRequired
          classNames={inputClasses}
          endContent={
            <button type="button" onClick={toggleConfirmVisibility}>
              {isConfirmVisible ? (
                <Icon
                  className="pointer-events-none text-2xl text-foreground/50"
                  icon="solar:eye-closed-linear"
                />
              ) : (
                <Icon
                  className="pointer-events-none text-2xl text-foreground/50"
                  icon="solar:eye-bold"
                />
              )}
            </button>
          }
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm your password"
          type={isConfirmVisible ? "text" : "password"}
          variant="bordered"
        />
        <Checkbox
          isRequired
          classNames={{
            base: "py-4",
            label: "text-foreground/50",
            wrapper: "before:border-foreground/50",
          }}
          size="sm"
        >
          I agree with the&nbsp;
          <Link color="foreground" href="#" size="sm">
            Terms
          </Link>
          &nbsp; and&nbsp;
          <Link color="foreground" href="#" size="sm">
            Privacy Policy
          </Link>
        </Checkbox>
        <Button className={buttonClasses} type="submit">
          Sign Up
        </Button>
      </form>
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className={buttonClasses}
          startContent={<Icon icon="fe:google" width={24} />}
        >
          Continue with Google
        </Button>
        <Button
          className={buttonClasses}
          startContent={<Icon icon="fe:github" width={24} />}
        >
          Continue with Github
        </Button>
      </div>
      <p className="text-center text-small text-foreground/50">
        Already have an account?&nbsp;
        <Link color="foreground" href="#" size="sm" onClick={toggleAuthMode}>
          Log In
        </Link>
      </p>
    </div>
  );
}
