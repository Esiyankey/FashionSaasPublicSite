import { apiClient } from "./http-client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  businessId?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export async function login(input: { email: string; password: string }): Promise<AuthSession> {
  return apiClient.post<AuthSession>("/auth/login", { body: input });
}

export async function register(input: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthSession> {
  return apiClient.post<AuthSession>("/auth/register", { body: input });
}

export async function logout(refreshToken: string): Promise<void> {
  return apiClient.post<void>("/auth/logout", { body: { refreshToken } });
}

export async function getCurrentUser(): Promise<AuthUser> {
  return apiClient.get<AuthUser>("/auth/me");
}

export async function refreshSession(refreshToken: string): Promise<AuthSession> {
  return apiClient.post<AuthSession>("/auth/refresh", { body: { refreshToken } });
}
