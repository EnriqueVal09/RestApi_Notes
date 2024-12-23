import { useState } from 'react';
import accounts from '../services/accounts';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Form.css'; // css file route
import LoadingIndicator  from './LoadingIndicator';

function Form( {route, method} ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const name = method === "login" ? "Login" : "Register";
    
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await accounts.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                console.log("Access token guardado:", res.data.access);
                console.log("Refresh token guardado:", res.data.refresh);
                navigate('/')
            } else {
                navigate('/login');
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <h1>{name}</h1>
            <input 
                className='form-input'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Username'
            />
            {name !== 'Login' && (
                <input 
                    className='form-input'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                />
            )}
            <input 
                className='form-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            {loading && <LoadingIndicator />}
            <button className='form-button' type='submit'>
                {name}
            </button>
        </form>
    )
} 

export default Form;
