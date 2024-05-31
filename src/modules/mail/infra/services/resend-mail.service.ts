import { IMailService, type SendMailPayload } from "../../domain/services/mail.service";

export class ResendMailService implements IMailService {
  send(data: SendMailPayload): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
