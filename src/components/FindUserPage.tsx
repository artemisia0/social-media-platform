import UserPreviewCard from '@/components/UserPreviewCard';
import { Loader } from 'lucide-react'
import { gql, useQuery } from '@apollo/client'
import { ScrollArea } from '@/components/ui/scroll-area'
import findUserPageSelectedUsernameAtom from '@/atoms/findUserPageSelectedUsernameAtom'
import { useAtom} from 'jotai'
import UserProfile from '@/components/UserProfile'


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
		<div className="min-h-dvh w-full">
			{findUserPageSelectedUsername}
			{findUserPageSelectedUsername && (
					<UserProfile username={findUserPageSelectedUsername} />
				)
			}
			<ScrollArea className="h-[calc(100vh-100px)] w-full">
				<div className="p-4 flex flex-col gap-2 items-center max-w-[720px]">
					{usersData.map((userData) => (
						<UserPreviewCard onClick={() => setFindUserPageSelectedUsername(userData.username)} key={userData.username} data={userData} />
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

