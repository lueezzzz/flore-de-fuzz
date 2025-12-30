"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { RegisterFormType } from "@/types/form";
import { RegisterFormSchema } from "@/schemas/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/router";
import { useUserStore } from "@/states/user";

const supabase = createClient();

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(formData: RegisterFormType) {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (authError && !authData.user) {
        form.setError("email", { message: authError.message });
        return;
      } else {
        const { error: dbError } = await supabase.from("user").insert([
          {
            auth_id: authData.user?.id,
          },
        ]);
        if (dbError) {
          console.error("Error: ", dbError.message);
          form.setError("root", { message: dbError.message });
        } else {
          setUser({
            auth_id: authData.user?.id || "",
            email: authData.user?.email || "",
            created_at: new Date(),
          });
          router.push("/");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
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
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  id="form-confirm-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm Password"
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
              {isLoading ? "Signing up..." : "Submit"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </>
  );
}
