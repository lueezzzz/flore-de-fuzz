"use client";

import { CheckoutFormSchema } from "@/schemas/form";
import { createClient } from "@/supabase/client";
import { CheckoutFormType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { listRegions } from "@jobuntux/psgc";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const supabase = createClient();

export default function CheckoutForm() {
  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      city: "",
      region: "",
    },
  });

  const regions = listRegions();

  async function handleCheckout(formData: CheckoutFormType) {
    console.log(formData);
  }

  return (
    <>
      <form id="checkout-form" onSubmit={form.handleSubmit(handleCheckout)}>
        <FieldGroup>
          <FieldLabel>Email</FieldLabel>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
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
          <FieldLabel>Shipping address</FieldLabel>
          <div className="flex">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-firstName"
                    aria-invalid={fieldState.invalid}
                    placeholder="First name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-lastName"
                    aria-invalid={fieldState.invalid}
                    placeholder="Last name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="address"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="form-address"
                  aria-invalid={fieldState.invalid}
                  placeholder="Address"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex">
            <Controller
              name="zipCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-zipCode"
                    aria-invalid={fieldState.invalid}
                    placeholder="Zip code"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-city"
                    aria-invalid={fieldState.invalid}
                    placeholder="City"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="region"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem
                        key={region.regCode}
                        value={region.regionName}
                      >
                        {region.regionName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="form-phoneNumber"
                  aria-invalid={fieldState.invalid}
                  placeholder="Phone"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Field>
          <Button type="submit" form="checkout-form">
            Submit
          </Button>
        </Field>
      </form>
    </>
  );
}
