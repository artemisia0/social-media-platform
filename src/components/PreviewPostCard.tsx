import type PostData from '@/types/PostData';

export default function PreviewPostCard({ data }: { data: PostData }) {
	
	const carouselItems = data.images

	return (
		<div className="rounded-lg border border-slate-600 shadow p-0 text-slate-100">
			<img
				width={90}
				height={120}
				src={carouselItems[0]}
				alt={`preview post card image`}
				className="rounded-lg border border-slate-600"
			/>
		</div>
	)
}

