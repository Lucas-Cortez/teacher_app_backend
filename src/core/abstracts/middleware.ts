export interface IMiddleware<Request, Response, Next> {
  use(req: Request, res: Response, next: Next): void;
}
