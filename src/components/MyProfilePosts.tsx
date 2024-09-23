import PostCard from '@/components/PostCard';
import type PostData from '@/types/PostData';
import { gql, useQuery } from '@apollo/client';
import { useAtomValue } from 'jotai';
import sessionDataAtom from '@/atoms/sessionDataAtom';


const postsDataQuery = gql`
query PostsData($username: String!) {
	postsData(username: $username) {
		result {
			_id
			authorUsername
			usersWhoLiked
			images
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
		<div className="flex flex-wrap w-full items-center p-2 m-2 border rounded-lg border-slate-600 gap-2">
			{postsData && postsData.map(
				(postData: PostData, index) => (
					<PostCard key={index} data={postData} />
				)
			)}
		</div>
	)
}

