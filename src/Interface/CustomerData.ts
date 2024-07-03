export interface CustomerData {
    id: number;
    name: string;
    email: string; // Assuming e
    deliveryAddress: string;
    paymentPreferences?: string; // paymentPreferences is optional
}
