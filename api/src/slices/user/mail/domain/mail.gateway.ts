import { ICreateMailData } from './mail.types';

export abstract class IMailGateway {
  abstract sendMail(data: ICreateMailData): Promise<boolean>;
}
