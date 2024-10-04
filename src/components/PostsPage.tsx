import { gql, useQuery } from '@apollo/client';
import { ScrollArea } from '@/components/ui/scroll-area'
import PostViewer from '@/components/PostViewer'
import { Loader } from 'lucide-react'


export default function PostsPage() {
	const { loading, error, data } = useQuery(gql`
		query {
			allPostsData {
				status {
					ok
					message
				}
				result {
					images
					texts
					createdAt
					_id
					authorUsername
					usersWhoLiked
				}
			}
		}
	`);

	if (loading) {
		return (
			<div className="h-dvh flex justify-center items-center">
				<Loader className="animate-spin" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="h-dvh flex justify-center items-center">
				<div>
					<p className="text-red-500 text-lg font-bold">Error</p>
					<p className="text-red-500">{error.message}</p>
				</div>
			</div>
		)
	}

	return (
		<ScrollArea className="h-[calc(100vh-160px)] w-full">
			<div className="flex flex-col gap-0 items-center w-full">
				{data?.allPostsData?.result && data.allPostsData.result.map((post: any) => (
					<PostViewer data={post} key={post._id} onClose={undefined} />
				))}
			</div>
		</ScrollArea>
	)
}

