export interface SignIn {
  auth: (signInParams: SignIn.Params) => Promise<SignIn.Result>;
}

export namespace SignIn {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
  };
}
