// Simulasi untuk pengembangan frontend, bukan autentikasi nyata.
export async function mockLogin({ identifier, password }) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedIdentifier = identifier.trim().toLowerCase();

  const validIdentifier =
    normalizedIdentifier === 'alif@mail.com' ||
    normalizedIdentifier === '081234567890';

  if (!validIdentifier || password !== 'Demo12345!') {
    throw new Error('Email/nomor HP atau password salah');
  }

  return {
    accessToken: 'mock-token-not-valid-for-api',
    message: 'Login simulasi berhasil',
    user: {
      id: 'demo-customer',
      name: 'Customer Demo',
      email: 'alif@mail.com',
      hp: '081234567890',
      role: 'CUSTOMER',
    },
  };
}