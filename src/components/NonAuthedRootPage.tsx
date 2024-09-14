import SignInButton from '@/components/SignInButton'
import SignUpButton from '@/components/SignUpButton'


export default function NonAuthedRootPage() {
	return (
		<div className="w-full h-dvh flex flex-col gap-8 justify-center items-center">
			<span className="font-black text-2xl">
				{"Social Media Platform"}
			</span>
			<div className="flex items-center gap-6">
				<SignInButton />
				<SignUpButton />
			</div>
		</div>
	)
}

