import { Button } from '@/components/ui/button'
import SignInButton from '@/components/SignInButton'


export default function NonAuthedRootPage() {
	return (
		<div className="w-full h-dvh flex flex-col gap-8 justify-center items-center bg-background text-foreground">
			<span className="font-black text-2xl">
				{"Social Media Platform"}
			</span>
			<div className="flex items-center gap-6">
				<SignInButton />
				<Button>
					Sign Up
				</Button>
			</div>
		</div>
	)
}

