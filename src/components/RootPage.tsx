'use client'

import { getSessionData } from '@/actions/session'
import type SessionData from '@/types/SessionData'
import { ApolloProvider } from '@apollo/client'
import createGqlClient from '@/graphql/createGqlClient'
import { useEffect, useState } from 'react'


export default function RootPage({ defaultSessionToken }: { defaultSessionToken: string; }) {
	const [sessionToken, setSessionToken] = useState<string | undefined>(undefined)
	const [sessionData, setSessionData] = useState<SessionData>({
		username: undefined,
		userRole: undefined,
	})

	useEffect(
		() => {
			if (window?.localStorage != undefined) {
				const tok = localStorage.getItem('sessionToken')
				if (tok != undefined) {
					setSessionToken(tok!)
					getSessionData(tok!)
						.then(
							(res) => {
								setSessionData(res)
							}
						)
				}
			}
		}, []
	)

	const gqlClient = createGqlClient(sessionToken ?? defaultSessionToken)
	if (sessionData.username == null) {
		return (
			<ApolloProvider client={gqlClient}>
				<div>
					{"Sign up or sign in"}
				</div>
			</ApolloProvider>
		)
	}

	return (
		<ApolloProvider client={gqlClient}>
			<div>
				{"Sign out"}
			</div>
		</ApolloProvider>
	)
}

