import { ISubscriptionData } from '..';

export abstract class ISubscriptionsGateway {
  abstract listAll(filter: ISubscriptionFilter): Promise<ISubscriptionData>;
  abstract getById(id: number): Promise<ISubscriptionData>;
  abstract create(data: ISubscriptionData): Promise<ISubscriptionData>;
  abstract update(id: number, data: ISubscriptionData): Promise<ISubscriptionData>;
  abstract delete(refreshToken: string): Promise<boolean>;
}

export interface ISubscriptionFilter {
  ids: number[];
  price: number;
}
