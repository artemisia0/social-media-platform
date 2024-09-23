import type PostData from '@/types/PostData';


export default function PostCard({ postData }: { postData: PostData }) {

	// fetch most liked comment data

	return (
		<div className="w-48 h-64 rounded-lg border border-slate-600 shadow p-2 flex flex-col items-center justify-center">
			{JSON.stringify(postData)}
		</div>
	)
}

