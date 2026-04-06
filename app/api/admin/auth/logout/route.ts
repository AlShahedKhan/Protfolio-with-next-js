import { createAdminLogoutResponse } from '@/lib/admin-auth-logout';

export async function POST() {
  return createAdminLogoutResponse();
}
