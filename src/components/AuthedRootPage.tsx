import PostsPage from '@/components/PostsPage'
import ChatsPage from '@/components/ChatsPage'
import NewPostPage from '@/components/NewPostPage'
import FindUserPage from '@/components/FindUserPage'
import MyProfilePage from '@/components/MyProfilePage'
import { Newspaper, MessageCircle, Plus, Search, User } from 'lucide-react'
import { ReactElement, useCallback, useState, useRef, useEffect } from 'react'


export default function AuthedRootPage() {
	const [activeIndex, setActiveIndex] = useState<number>(0)

	const scrollContainerRef = useRef<HTMLDivElement | null>(null)

	const postsPageRef = useRef<HTMLDivElement | null>(null)
	const chatsPageRef = useRef<HTMLDivElement | null>(null)
	const newPostPageRef = useRef<HTMLDivElement | null>(null)
	const findUserPageRef = useRef<HTMLDivElement | null>(null)
	const myProfilePageRef = useRef<HTMLDivElement | null>(null)

	const pageRefs = [postsPageRef, chatsPageRef, newPostPageRef, findUserPageRef, myProfilePageRef]

	const handleScroll = useCallback(() => {
		if (scrollContainerRef.current) {
			const scrollLeft = scrollContainerRef.current.scrollLeft
			const pageWidth = scrollContainerRef.current.clientWidth
			const newIndex = Math.round(scrollLeft / pageWidth)
			if (activeIndex === null || newIndex != activeIndex) {
				setActiveIndex(newIndex)
			}
		}
	}, [activeIndex])

	const scrollIntoPageWithIndex = (index: number) => {
		if (pageRefs[index]?.current) {
			pageRefs[index].current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
		}
	}

	useEffect(
		() => {
			if (scrollContainerRef.current) {
				scrollContainerRef.current.addEventListener('scroll', handleScroll)
			}
		}, [handleScroll]
	)

	const navIcons = [<Newspaper key={0} />, <MessageCircle key={1} />, <Plus key={2} />, <Search key={3} />, <User key={4} />]

	const pageElements = [
		<PostsPage key={0} />,
		<ChatsPage key={1} />,
		<NewPostPage key={2} />,
		<FindUserPage key={3} />,
		<MyProfilePage key={4} />
	]

	return (
		<div className="relative min-h-dvh w-full">
			<div className="flex justify-evenly items-center absolute left-1/2 bottom-0 transform -translate-x-1/2 max-w-[640px] p-4 w-full">
				{navIcons.map(
					(icon: ReactElement, index: number) => (
						<button key={index} className={'rounded-full h-10 w-10 transition-all duration-1000 ease-in-out flex justify-center items-center ' + (activeIndex === index ? ' font-bold text-lg text-zinc-900 bg-slate-100' : '')} onClick={() => scrollIntoPageWithIndex(index)}>
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
	)
}

