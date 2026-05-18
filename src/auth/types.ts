export type GatewayAuthResponse = {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  user?: {
    userId?: string;
    email?: string;
    roles?: string[];
  };
};
