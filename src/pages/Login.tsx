// src/pages/Login.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLogin } from '../hooks/useLogin';
import '../styles/login.css';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, login: authLogin } = useAuth();
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const phoneRegex = /^\+998\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Iltimos, to‘g‘ri telefon raqam kiriting (+998901234567)');
            return;
        }

        if (password.length < 6) {
            alert('Parol kamida 6 ta belgidan iborat bo‘lishi kerak');
            return;
        }

        try {
            const userData = await login(phoneNumber, password);
            authLogin(userData.tokens, {
                ...userData,
                name: userData.first_name 
                    ? `${userData.first_name} ${userData.last_name || ''}`.trim() 
                    : undefined
            });
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src="https://i.imgur.com/w5JwPT9.png" alt="CRM System" />
            </div>
            <div className="login-right">
                <div className="login-form-container">
                    <h2>Noventer</h2>
                    <p className="login-description">Crm tizimi bilan biznesingizni rivojlantiring</p>

                    {error && (
                        <div className="error-message">
                            {error === 'Telefon raqam yoki parol noto‘g‘ri' ? (
                                <>
                                    <p>Kiritilgan ma'lumotlar noto‘g‘ri</p>
                                    <p>Iltimos, qaytadan urinib ko‘ring</p>
                                </>
                            ) : (
                                error
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="phone">Telefon raqam</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="+998901234567"
                                pattern="\+998\d{9}"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Parolingiz</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Kamida 6 ta belgi"
                                required
                                minLength={6}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="login-button" 
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Kirish jarayonda...
                                </>
                            ) : 'Kirish'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;