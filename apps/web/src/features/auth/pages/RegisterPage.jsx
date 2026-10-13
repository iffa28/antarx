import FormField from '../../../components/FormField.jsx';
import './RegisterPage.css';
import { useState } from 'react';

function RegisterPage({ onGoToLogin }) {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: String(formData.get('name') ?? '').trim(),
      email: String(formData.get('email') ?? '')
        .trim()
        .toLowerCase(),
      hp: String(formData.get('hp') ?? '').trim(),
      password: String(formData.get('password') ?? ''),
    };

    if (!data.name) {
      setMessage('Nama lengkap tidak boleh hanya berisi spasi.');
      return;
    }

    if (!data.hp) {
      setMessage('Nomor HP tidak boleh hanya berisi spasi.');
      return;
    }

    setMessage('Form diterima secara lokal. Akun belum disimpan.');
  }

  return (
    <main className="register-page">
      <section className="register-card" aria-labelledby="register-title">
        <h1 id="register-title">Daftar akun AntarX</h1>
        <p>Buat akun Customer untuk menggunakan layanan AntarX.</p>

        <form onSubmit={handleSubmit}>
          <FormField
            id="register-name"
            label="Nama lengkap"
            name="name"
            autoComplete="name"
            required
          />

          <FormField
            id="register-email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />

          <FormField
            id="register-hp"
            label="Nomor HP"
            name="hp"
            type="tel"
            autoComplete="tel"
            required
          />

          <FormField
            id="register-password"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            aria-describedby="register-password-hint"
            required
          />

          <small id="register-password-hint">Gunakan minimal 8 karakter.</small>

          <button type="submit">Daftar</button>
          <p role="status">{message}</p>
        </form>

        <button type="button" onClick={onGoToLogin}>
          Kembali ke login
        </button>
      </section>
    </main>
  );
}

export default RegisterPage;
