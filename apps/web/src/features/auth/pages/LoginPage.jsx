import { useState } from 'react';
import { mockLogin } from '../api/mockLogin';
import './LoginPage.css';
import FormField from '../../../components/FormField';

function LoginPage({ onGoToRegister }) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) return;

    const formData = new FormData(event.currentTarget);
    const identifier = String(formData.get('identifier') ?? '').trim();
    const password = String(formData.get('password') ?? '');

    if (!identifier) {
      setMessage('Email atau nomor HP tidak boleh hanya berisi spasi.');
      return;
    }

    setMessage('');
    setIsLoading(true);

    try {
      const result = await mockLogin({ identifier, password });
      setMessage(`${result.message}. Selamat datang, ${result.user.name}.`);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan. Coba lagi.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title">Masuk ke AntarX</h1>
        <p>Gunakan email atau nomor HP yang terdaftar.</p>

        <form onSubmit={handleSubmit}>
          <FormField
            id="identifier"
            label="Email atau nomor HP"
            name="identifier"
            autoComplete="username"
            required
          />

          <FormField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
          <p role="status">{message}</p>
        </form>
        <p>
          Belum punya akun?{' '}
          <button type="button" onClick={onGoToRegister} disabled={isLoading}>
            Daftar disini
          </button>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
