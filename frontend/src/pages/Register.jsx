import Form from '../components/Form.jsx'

function Register() {
    return <Form route='accounts/user/register/' method='register' /> // import api (accounts) route, NOT the url from the App.jsx
}

export default Register;