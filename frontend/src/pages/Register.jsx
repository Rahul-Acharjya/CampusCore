import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import logo from '../assets/nlu-logo.png';

export default function Register() {
  const { role = 'student' } = useParams();
  const nav = useNavigate();
  const { register } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    studentId: '',
    teacherId: '',
    email: '',
    password: '',
    departmentId: '',
    semester: 1,
    phoneNumber: ''
  });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get('/departments').then(x => setDepartments(x.data)).catch(() => {});
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      await register(role, form);
      setSuccess(true);
    } catch (e) {
      setErr(e.response?.data?.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-screen">
      <button className="back-home" onClick={() => nav('/')}>
        <ArrowLeft size={16} /> Back to CampusCore
      </button>

      <div className="auth-card register-card">
        <img src={logo} className="auth-logo" />
        <span className="eyebrow">ACCOUNT ACTIVATION</span>

        {success ? (
          <>
            <div className="preview-icon" style={{ margin: '28px auto 18px' }}>
              <CheckCircle2 size={24} />
            </div>
            <h1>{role === 'student' ? 'Student' : 'Teacher'} <em>account created.</em></h1>
            <p>Your registration was accepted and authentication is ready. You can now return to the login page.</p>
            <button className="primary-submit" onClick={() => nav(`/login/${role}`)}>
              Continue to sign in
            </button>
            <div className="auth-note">Account created securely · Password stored as a hash</div>
          </>
        ) : (
          <>
            <h1>{role === 'student' ? 'Student' : 'Teacher'} <em>registration.</em></h1>
            <p>Your university record must be created by an administrator before registration.</p>

            <form onSubmit={submit}>
              <label>Full name</label>
              <input required value={form.fullName} onChange={e => set('fullName', e.target.value)} />

              <label>{role === 'student' ? 'Student ID / Roll Number' : 'Administrator-issued Teacher ID'}</label>
              <input
                required
                value={role === 'student' ? form.studentId : form.teacherId}
                onChange={e => set(role === 'student' ? 'studentId' : 'teacherId', e.target.value)}
              />

              <label>University email</label>
              <input type="email" required value={form.email} onChange={e => set('email', e.target.value)} />

              <label>Department</label>
              <select required value={form.departmentId} onChange={e => set('departmentId', e.target.value)}>
                <option value="">Select department</option>
                {departments.map(d => <option key={d._id} value={d._id}>{d.departmentName}</option>)}
              </select>

              {role === 'student' ? (
                <>
                  <label>Semester</label>
                  <select value={form.semester} onChange={e => set('semester', Number(e.target.value))}>
                    {Array.from({ length: 8 }, (_, i) => <option key={i + 1}>{i + 1}</option>)}
                  </select>
                </>
              ) : (
                <>
                  <label>Phone number (optional)</label>
                  <input value={form.phoneNumber} onChange={e => set('phoneNumber', e.target.value)} />
                </>
              )}

              <label>Password</label>
              <input
                type="password"
                minLength="8"
                required
                value={form.password}
                onChange={e => set('password', e.target.value)}
              />

              {err && <div className="form-error">{err}</div>}

              <button className="primary-submit" disabled={busy}>
                {busy ? 'Creating account…' : 'Verify & create account'}
              </button>
            </form>

            <div className="auth-register">
              Already registered? <Link to={`/login/${role}`}>Sign in</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
