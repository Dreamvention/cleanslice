import { ISubscriptionPlanData } from '../subscriptionPlan';

export interface ISubscriptionData {
  id: number;
  userId: number;
  subscriptionPlan: ISubscriptionPlanData;
}
