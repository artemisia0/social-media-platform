import { Button } from '@/components/ui/button'


export default function NonAuthedRootPage() {
	return (
		<div className="w-full h-dvh flex flex-col gap-8 justify-center items-center bg-background text-foreground">
			<span className="font-black text-2xl">
				{"Social Media Platform"}
			</span>
			<div className="flex items-center gap-6">
				<Button>
					Sign In
				</Button>
				<Button>
					Sign Up
				</Button>
			</div>
		</div>
	)
}

