'use client'

import { ApolloProvider } from '@apollo/client'
import createGqlClient from '@/graphql/createGqlClient'
import AuthedRootPage from '@/components/AuthedRootPage'
import NonAuthedRootPage from '@/components/NonAuthedRootPage'
import darkThemeAtom from '@/atoms/darkThemeAtom'
import { useAtomValue, useAtom } from 'jotai'
import sessionDataAtom from '@/atoms/sessionDataAtom'
import sessionTokenAtom from '@/atoms/sessionTokenAtom'
import { useEffect } from 'react'
import { getSessionData } from '@/actions/session'


export default function RootPage({ defaultSessionToken }: { defaultSessionToken: string; }) {
	const darkTheme = useAtomValue(darkThemeAtom)
	const [sessionData, setSessionData] = useAtom(sessionDataAtom)
	const [sessionToken, setSessionToken] = useAtom(sessionTokenAtom)

	useEffect(
		() => {
			if (localStorage) {
				const tok = localStorage.getItem('sessionToken')
				if (tok) {
					setSessionToken(tok!)
				}
			}
		}, [setSessionToken]
	)

	useEffect(
		() => {
			if (sessionToken) {
				getSessionData(sessionToken!).then(
					(res) => setSessionData(res)
				)
			}
		}, [sessionToken, setSessionData]
	)

	const gqlClient = createGqlClient(sessionToken ?? defaultSessionToken)

	return (
		<ApolloProvider client={gqlClient}>
			<div className={darkTheme ? 'dark bg-zinc-900 text-slate-100' : ' '}>
				{sessionData.username
					? <AuthedRootPage />
					: <NonAuthedRootPage />
				}
			</div>
		</ApolloProvider>
	)
}

