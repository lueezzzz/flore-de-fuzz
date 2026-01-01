import { CheckoutFormType } from "@/types/form";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutState {
  checkoutData: CheckoutFormType | null;

  setCheckoutData: (data: CheckoutFormType | null) => void;

  resetCheckoutData: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      checkoutData: null,
      paymentInfo: null,

      setCheckoutData: (data) => set({ checkoutData: data }),

      resetCheckoutData: () => set({ checkoutData: null }),
    }),
    { name: "checkout-store" }
  )
);
