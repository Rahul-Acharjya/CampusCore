import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/nlu-logo.png';

const labels = { student: 'Student', teacher: 'Teacher', admin: 'Administrator' };

export default function Login() {
  const { role = 'student' } = useParams();
  const nav = useNavigate();
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await login({ ...form, role: role.toUpperCase() });
      setSuccess(true);
    } catch (e) {
      setErr(e.response?.data?.message || 'Unable to sign in. Check your API and database connection.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-backdrop"></div>
      <button className="back-home" onClick={() => nav('/')}>
        <ArrowLeft size={16} /> Back to CampusCore
      </button>

      <div className="auth-card">
        <img src={logo} className="auth-logo" />
        <span className="eyebrow">NORTH LAKHIMPUR UNIVERSITY</span>

        {success ? (
          <>
            <div className="preview-icon" style={{ margin: '28px auto 18px' }}>
              <CheckCircle2 size={24} />
            </div>
            <h1>{labels[role] || 'User'} <em>authenticated.</em></h1>
            <p>Authentication successful. Your credentials were verified and a secure session was issued.</p>
            <button className="primary-submit" onClick={() => { localStorage.removeItem('cc_token'); nav('/'); }}>
              Return to CampusCore
            </button>
            <div className="auth-note">JWT session active · Password verified securely</div>
          </>
        ) : (
          <>
            <h1>{labels[role] || 'User'} <em>sign in.</em></h1>
            <p>Access your academic workspace securely.</p>

            <form onSubmit={submit}>
              <label>University email</label>
              <input
                type="email"
                required
                placeholder="name@nlu.ac.in"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
              />

              <label>Password</label>
              <div className="password-wrap">
                <input
                  type={show ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              {err && <div className="form-error">{err}</div>}

              <button className="primary-submit" disabled={busy}>
                {busy ? 'Signing in…' : 'Sign in securely'} <ShieldCheck size={16} />
              </button>
            </form>

            {role !== 'admin' && (
              <div className="auth-register">
                New to CampusCore? <Link to={`/register/${role}`}>Create account</Link>
              </div>
            )}

            <div className="auth-note">Protected university access · Do not share your password</div>
          </>
        )}
      </div>
    </div>
  );
}
