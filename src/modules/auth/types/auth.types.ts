export type AuthCredentials = {
  email: string;
  password: string;
};

export type AccountIdentity = {
  id: string;
  email: string;
};

export type JwtPayload = {
  subId: string;
  email: string;
};
