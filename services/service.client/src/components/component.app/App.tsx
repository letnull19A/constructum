import React, { useEffect, useState } from 'react'
import './../../scss/style.general.scss'
import './App.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthRouting } from '../../routers/router.auth'
import { PublicRouting } from '../../routers/router.public'
import { AuthContext, IUserContext } from '../../contexts/context.user'
import { IJwtPayload } from 'constructum-interfaces'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>()
	const [user, setUser] = useState<IJwtPayload | null>(null)

	const value: IUserContext = { isAuthenticated, user, setIsAuthenticated, setUser }

	useEffect(() => {
		setIsAuthenticated(
			localStorage.getItem('token') !== null &&
				localStorage.getItem('token') !== undefined &&
				localStorage.getItem('token') !== '' &&
				localStorage.getItem('token') !== '{}'
		)
		setUser(JSON.parse(localStorage.getItem('token') ?? '{}'))
	}, [])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="app">
					<PublicRouting />
					<AuthRouting />
				</div>
			</Router>
		</AuthProvider>
	)
}
