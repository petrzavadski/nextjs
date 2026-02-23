export type Response<Entity> = Promise<{
  isError: boolean;
  data?: Entity;
}>;
