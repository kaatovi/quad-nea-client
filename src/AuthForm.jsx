import { useState } from 'react';
import { apiFetch } from './api';

function AuthForm({onLoggedIn}) {
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setSubmitting(true);

        try{
            if (mode === 'register'){
                await apiFetch('/auth/register', {
                    method: "POST",
                    body: JSON.stringify({email, password}),
                });
            }
            const {token} = await apiFetch('/auth/login', {
                method: "POST",
                body: JSON.stringify({email, password}),
            });
            localStorage.setItem('token', token);
            onLoggedIn(token);
        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{mode === 'login' ? 'Log in' : 'Create account'}</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            /> 
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {error && <p>{error}</p>}

            <button type="submit" disabled={submitting}>
                {submitting ? "Please wait..." : mode === "login" ? "Log in" : "Register"}
            </button>

            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                {mode === "login" ? "Need an account?" : "Already have an account?"}
            </button>
        </form>
    );
}

export default AuthForm;