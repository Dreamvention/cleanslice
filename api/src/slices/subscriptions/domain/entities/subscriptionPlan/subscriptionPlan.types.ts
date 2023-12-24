export interface ISubscriptionPlanData {
  id: number;
  name: string;
  price: number;
  providerId: string;
  provider: Providers;
}

export type Providers = 'stripe' | 'paypal' | 'braintree';
