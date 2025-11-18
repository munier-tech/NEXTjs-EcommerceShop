import { create } from "zustand";

interface CustomOrderState {
  productName: string;
  description: string;
  budget: number | null;
  productLink: string;
  image: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  loading: boolean;
  success: boolean;
  error: string | null;
  setField: (field: keyof Omit<CustomOrderState, 'setField' | 'submitOrder' | 'clearError' | 'resetForm' | 'loading' | 'success' | 'error'>, value: string | number | null) => void;
  submitOrder: () => Promise<void>;
  clearError: () => void;
  resetForm: () => void;
}

export const useCustomOrderStore = create<CustomOrderState>((set, get) => ({
  // Initial state
  productName: "",
  description: "",
  budget: null,
  productLink: "",
  image: "",
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  loading: false,
  success: false,
  error: null,

  // Actions
  setField: (field, value) => set({ 
    [field]: value, 
    error: null // Clear error when user edits
  }),

  clearError: () => set({ error: null }),

  resetForm: () => set({
    productName: "",
    description: "",
    budget: null,
    productLink: "",
    image: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    success: false,
    error: null,
  }),

  submitOrder: async () => {
    const state = get();
    set({ loading: true, error: null });

    try {
      // Only send the form data, not the entire store state
      const formData = {
        productName: state.productName,
        description: state.description,
        budget: state.budget,
        productLink: state.productLink,
        image: state.image,
        customerName: state.customerName,
        customerEmail: state.customerEmail,
        customerPhone: state.customerPhone,
      };

      console.log("Submitting form data:", formData);

      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response error:", errorText);
        throw new Error(`HTTP error! status: ${res.status}, response: ${errorText}`);
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (data.success) {
        set({ success: true });
        // Optionally reset form after successful submission
        // get().resetForm();
      } else {
        throw new Error(data.message || "Failed to submit order");
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to submit order";
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));