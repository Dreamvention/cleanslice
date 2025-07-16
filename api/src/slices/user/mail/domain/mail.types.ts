export interface IMailData {
  id: string;
  subject: string;
  content: string;
  recipientEmail: string;
  senderEmail: string;
  status: MailStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateMailData {
  subject: string;
  content: string;
  recipientEmail: string;
  senderEmail: string;
}

export interface IUpdateMailData {
  subject?: string;
  content?: string;
  recipientEmail?: string;
  senderEmail?: string;
  status?: MailStatus;
}

export enum MailStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}
