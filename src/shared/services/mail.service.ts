export interface SendMailPayload {
  from: string;
  to: string[];
  subject: string;
  body: string;
  // template: string;
  // variables?: Record<string, string>;
}

export const MailService = Symbol.for("MailService");

export interface IMailService {
  send(data: SendMailPayload): Promise<void>;
}
