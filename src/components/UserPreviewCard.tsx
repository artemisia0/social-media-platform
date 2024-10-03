
export default function UserPreviewCard({ data, onClick }: { onClick: any; data: { [key: string]: string; } }) {
	return (
		<div tabIndex={0} onClick={onClick} className="hover:bg-zinc-800 w-full rounded-lg border border-zinc-600 p-2 flex gap-4 items-center">
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

