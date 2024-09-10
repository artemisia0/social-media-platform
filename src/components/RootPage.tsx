'use client'

import { getSessionData } from '@/actions/session'
import type SessionData from '@/types/SessionData'
import { ApolloProvider } from '@apollo/client'
import createGqlClient from '@/graphql/createGqlClient'
import { useEffect, useState } from 'react'
import PostsPage from '@/components/PostsPage'
import ChatsPage from '@/components/ChatsPage'
import NewPostPage from '@/components/NewPostPage'
import FindUserPage from '@/components/FindUserPage'
import MyProfilePage from '@/components/MyProfilePage'


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
	if (false && sessionData.username == null) {  // REMOVE 'false &&' later
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
			<div className="min-h-dvh w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide">
				<div className="flex w-[500vw]">
					<PostsPage sessionData={sessionData} />
					<ChatsPage sessionData={sessionData} />
					<NewPostPage sessionData={sessionData} />
					<FindUserPage sessionData={sessionData} />
					<MyProfilePage sessionData={sessionData} />
				</div>
			</div>
		</ApolloProvider>
	)
}

