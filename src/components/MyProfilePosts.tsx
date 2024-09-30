import PreviewPostCard from '@/components/PreviewPostCard';
import type PostData from '@/types/PostData';
import { gql, useQuery } from '@apollo/client';
import { useAtomValue } from 'jotai';
import sessionDataAtom from '@/atoms/sessionDataAtom';
import { ScrollArea } from '@/components/ui/scroll-area'


const postsDataQuery = gql`
query PostsData($username: String!) {
	postsData(username: $username) {
		result {
			_id
			authorUsername
			usersWhoLiked
			images
			texts
			createdAt
		}
		status {
			ok
			message
		}
	}
}
`

export default function MyProfilePosts() {
	const sessionData = useAtomValue(sessionDataAtom)
	const postsDataResponse = useQuery(postsDataQuery, {
		variables: {
			username: sessionData.username,
		}
	})

	const postsData: PostData[] = postsDataResponse.data?.postsData?.result

	// handle graphql errors
	if (postsDataResponse.error) {
		return (
			<div className="flex flex-col items-center justify-center w-full h-96">
				{postsDataResponse.error.graphQLErrors.map(
					(error: any, index: number) => (
						<p key={index} className="text-red-500">
							{error.message}
						</p>
					)
				)}
			</div>
		)
	}

	// handle if status is not ok
	if (!postsDataResponse.loading && !postsDataResponse.data.postsData.status.ok) {
		return (
			<div className="flex flex-col items-center justify-center w-full h-96">
				<p className="text-red-500">
					{postsDataResponse.data.postsData.status.message}
				</p>
			</div>
		)
	}

	// display posts
	return (
		<ScrollArea className="p-0 min-h-[calc(100vh-340px)] max-w-full">
			<div className="flex flex-wrap items-center justify-center p-2 m-4 border rounded-lg border-slate-600 gap-2 max-w-full">
				{postsData && postsData.map(
					(postData: PostData, index) => (
						<PreviewPostCard key={index} data={postData} />
					)
				)}
			</div>
		</ScrollArea>
	)
}

