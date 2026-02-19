export interface Env {
  Bindings: {
    FRONTEND_URL: string;
    //Google-OAuth
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  };

  Variables: {
    //  user: typeof auth.$Infer.Session.user | null;
  };
}
