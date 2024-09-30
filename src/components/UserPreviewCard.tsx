
export default function UserPreviewCard({ data }: { data: { [key: string]: string; } }) {
	return (
		<div className="w-full rounded-lg border border-zinc-600 p-2 flex gap-2 items-center">
			<img className="w-16 h-16 rounded-full" src={data.avatar} alt={data.username + ' avatar image'} />
			<div className="flex flex-col">
				<span>
					{data.username}
				</span>
				<div className="flex gap-1 text-sm">
					<span>
						{data.firstName}
					</span>
					<span>
						{data.lastName}
					</span>
				</div>
			</div>
		</div>
	);
}

