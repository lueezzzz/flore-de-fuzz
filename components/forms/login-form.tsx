"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { LoginFormType } from "@/types/form";
import { LoginFormSchema } from "@/schemas/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/states/user";

const supabase = createClient();

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(formData: LoginFormType) {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
      if (authError && !authData.user) {
        form.setError("email", { message: authError.message });
        return;
      }
      setUser({
        auth_id: authData.user?.id || "",
        email: authData.user?.email || "",
        created_at: new Date(),
      });

      router.push("/home");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form id="register-form" onSubmit={form.handleSubmit(handleLogin)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  id="form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="username@email.com"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="form-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password here"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <Button type="submit" form="register-form" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
