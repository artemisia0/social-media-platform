import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
	DialogDescription,
  DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { useRef, useState, ReactElement } from 'react'
import { useMutation, gql } from '@apollo/client'

import { LoaderIcon } from 'lucide-react'

import { useSetAtom } from 'jotai'
import sessionTokenAtom from '@/atoms/sessionTokenAtom'


const signInMutation = gql`
mutation SignIn($username: String!, $password: String!) {
	signIn(username: $username, password: $password) {
		status {
			ok
			message
		}
		sessionToken
	}
}
`

export default function SignInButton() {
	const [signIn, signInResponse] = useMutation(signInMutation)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const usernameInputRef = useRef<HTMLInputElement | null>(null)
	const passwordInputRef = useRef<HTMLInputElement | null>(null)
	const setSessionToken = useSetAtom(sessionTokenAtom)

	const onSubmit = () => {
		const username = usernameInputRef.current?.value ?? ''
		const password = passwordInputRef.current?.value ?? ''
		signIn({
			variables: {
				username,
				password,
			}
		}).then(
				(res) => {
					setErrorMessage(null)
					const tok = res.data?.signIn?.sessionToken
					if (tok) {
						if (localStorage) {
							localStorage.setItem('sessionToken', tok!)
						}
						setSessionToken(tok!)
					}
				},
				(err) => {
					console.error(err)
					setErrorMessage(err.toString())
				}
			)
	}

	let gqlErrors: ReactElement[] = []
	if (signInResponse?.error?.graphQLErrors) {
		gqlErrors = signInResponse.error.graphQLErrors.map(
			({ message }, i) => (<li className="text-destructive-foreground " key={i}>{message}</li>)
		)
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					Sign In
				</Button>
			</DialogTrigger>
			<DialogContent className="dark bg-background text-foreground max-w-96">
				<DialogHeader>
					<DialogTitle>
						Sign In
					</DialogTitle>
					<DialogDescription>
						Please provide all the neccessary credentials below to sign into your account.
					</DialogDescription>
					<div className="my-4 text-sm">
						{signInResponse.data?.signIn?.status?.ok === false &&
							<div className="text-destructive-foreground mt-2">
								{signInResponse.data?.signIn?.status?.message}
							</div>
						}
						{gqlErrors.length > 0 &&
							<ul className="mt-2">
								{gqlErrors}
							</ul>
						}
						{errorMessage && 
							<div className="text-destructive-foreground mt-2">
								{errorMessage}
							</div>
						}
						{signInResponse.loading &&
							<div className="flex items-center justify-center mt-2">
								<LoaderIcon className="animate-spin" />
							</div>
						}
					</div>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<Input placeholder="Username" ref={usernameInputRef} />
					<Input placeholder="Password" type="password" ref={passwordInputRef} />
				</div>
				<DialogFooter className="w-full flex flex-row items-center justify-end gap-2">
					<DialogClose asChild>
						<Button type="button" variant="ghost">
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" variant="outline" onClick={onSubmit}>
						Sign In
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

