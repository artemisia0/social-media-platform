import UserPreviewCard from '@/components/UserPreviewCard';
import { Loader } from 'lucide-react'
import { gql, useQuery } from '@apollo/client'
import { ScrollArea } from '@/components/ui/scroll-area'
import findUserPageSelectedUsernameAtom from '@/atoms/findUserPageSelectedUsernameAtom'
import { useAtom} from 'jotai'
import UserProfile from '@/components/UserProfile'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'


const usersDataQuery = gql`
query {
	usersData {
		username
		firstName
		lastName
		avatar
	}
}
`

export default function FindUserPage() {
	const usersDataResponse = useQuery(usersDataQuery)
	const usersData = usersDataResponse?.data?.usersData ?? []
	const [findUserPageSelectedUsername, setFindUserPageSelectedUsername] = useAtom(findUserPageSelectedUsernameAtom)

	if (usersDataResponse.error) {
		return (
			<div className="min-h-dvh flex justify-center items-center">
				<div className="text-red-500">
					{usersDataResponse.error.message}
				</div>
			</div>
		)
	}

	if (usersDataResponse.loading) {
		return (
			<div className="min-h-dvh flex justify-center items-center">
				<Loader className="animate-spin" />
			</div>
		)
	}

	return (
		<div className="min-h-dvh w-full relative">
			{findUserPageSelectedUsername
				? (
					<>
						<UserProfile username={findUserPageSelectedUsername} />
						<Button className="text-slate-100 bg-zinc-800 hover:bg-zinc-700 hover:text-slate-100 rounded-full absolute top-5 left-5 border border-slate-600 shadow" onClick={() => setFindUserPageSelectedUsername(null)}>
							<ArrowLeft />
						</Button>
					</>
				) : (
					<ScrollArea className="h-[calc(100vh-100px)] w-full">
						<div className="p-4 flex flex-col gap-2 items-center max-w-[720px]">
							{usersData.map((userData: any) => (
								<UserPreviewCard onClick={() => setFindUserPageSelectedUsername(userData.username)} key={userData.username} data={userData} />
							))}
						</div>
					</ScrollArea>
				)
			}
		</div>
	)
}

