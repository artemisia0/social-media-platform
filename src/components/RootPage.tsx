'use client'

import { getSessionData } from '@/actions/session'
import type SessionData from '@/types/SessionData'
import { ApolloProvider } from '@apollo/client'
import createGqlClient from '@/graphql/createGqlClient'
import { ReactElement, useEffect, useState, useRef } from 'react'
import PostsPage from '@/components/PostsPage'
import ChatsPage from '@/components/ChatsPage'
import NewPostPage from '@/components/NewPostPage'
import FindUserPage from '@/components/FindUserPage'
import MyProfilePage from '@/components/MyProfilePage'
import { Newspaper, Speech, Plus, Search, User } from 'lucide-react'


export default function RootPage({ defaultSessionToken }: { defaultSessionToken: string; }) {
	const [sessionToken, setSessionToken] = useState<string | undefined>(undefined)
	const [sessionData, setSessionData] = useState<SessionData>({
		username: undefined,
		userRole: undefined,
	})
	const [activeIndex, setActiveIndex] = useState(0)
	const scrollContainerRef = useRef<HTMLDivElement | null>(null)
	const postsPageRef = useRef<HTMLDivElement | null>(null)
	const chatsPageRef = useRef<HTMLDivElement | null>(null)
	const newPostPageRef = useRef<HTMLDivElement | null>(null)
	const findUserPageRef = useRef<HTMLDivElement | null>(null)
	const myProfilePageRef = useRef<HTMLDivElement | null>(null)

	const pageRefs = [postsPageRef, chatsPageRef, newPostPageRef, findUserPageRef, myProfilePageRef]

	const scrollIntoPageWithIndex = (index: number) => {
		if (pageRefs[index]?.current) {
			pageRefs[index].current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
		}
	}

	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const scrollLeft = scrollContainerRef.current.scrollLeft
			const pageWidth = scrollContainerRef.current.clientWidth
			const newIndex = Math.round(scrollLeft / pageWidth)
			setActiveIndex(newIndex)
		}
	}

	useEffect(
		() => {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.addEventListener('scroll', handleScroll)
			}
		}, []
	)

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

	const navIcons = [<Newspaper key={0} />, <Speech key={1} />, <Plus key={2} />, <Search key={3} />, <User key={4} />]

	const pageElements = [
		<PostsPage sessionData={sessionData} key={0} />,
		<ChatsPage sessionData={sessionData} key={1} />,
		<NewPostPage sessionData={sessionData} key={2} />,
		<FindUserPage sessionData={sessionData} key={3} />,
		<MyProfilePage sessionData={sessionData} key={4} />
	]

	return (
		<ApolloProvider client={gqlClient}>
			<div className="relative min-h-dvh w-full">
				<div className="flex justify-evenly items-center absolute left-1/2 bottom-0 transform -translate-x-1/2 max-w-[640px] p-4 w-full">
					{navIcons.map(
						(icon: ReactElement, index: number) => (
							<button key={index} className={'rounded-full h-10 w-10 transition-all duration-700 ease-in-out flex justify-center items-center ' + (activeIndex === index ? ' font-bold text-lg bg-blue-100' : '')} onClick={() => scrollIntoPageWithIndex(index)}>
								{icon}
							</button>
						)
					)}
				</div>
				<div className="min-h-dvh w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide" ref={scrollContainerRef}>
					<div className="flex w-[500vw]">
						{pageElements.map(
							(page: ReactElement, index: number) => (
								<div key={index} className="snap-center w-screen min-h-dvh flex items-center justify-center snap-always" ref={pageRefs[index]}>
									{page}
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</ApolloProvider>
	)
}

