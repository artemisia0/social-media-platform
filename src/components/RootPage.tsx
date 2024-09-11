'use client'

import { getSessionData } from '@/actions/session'
import type SessionData from '@/types/SessionData'
import { ApolloProvider } from '@apollo/client'
import createGqlClient from '@/graphql/createGqlClient'
import { useEffect, useState } from 'react'
import AuthedRootPage from '@/components/AuthedRootPage'
import NonAuthedRootPage from '@/components/NonAuthedRootPage'


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

	return (
		<ApolloProvider client={gqlClient}>
			{sessionData.username
				? <AuthedRootPage sessionData={sessionData} />
				: <NonAuthedRootPage />
			}
		</ApolloProvider>
	)
}

