import React, { useRef } from 'react'
import {
	ContainerLogin,
	Form,
	ContainerButtonSubmit
} from './styles/indexStyles';

export const Login = ()=>{

	const user = useRef();
	const password = useRef();

	const sendLogin = async () =>{
		const data = {
			user: user.current.value,
			password: password.current.value
		};
	}

	return (
		<ContainerLogin>
			<Form>
				<p>Login</p>

				<input ref={ user } type="text" placeholder="User"/>
				<input ref={ password } type="text" placeholder="Password"/>

				<ContainerButtonSubmit>
					<a href="/">Ovidaste tu contraseña?</a>
					<button type="submit" onClick={e=>{
						e.preventDefault();
						sendLogin();	
					}}>
						login
					</button>
				</ContainerButtonSubmit>
			</Form>
		</ContainerLogin>
	)
}