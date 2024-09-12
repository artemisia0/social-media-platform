import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRef, useState } from 'react'
import { useMutation, gql } from '@apollo/client'

import { LoaderIcon } from 'lucide-react'


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
					const tok = res.data?.signIn?.sessionToken
					if (tok) {
						(localStorage!).setItem('sessionToken', tok!)
						(window!).location.reload()
					}
				},
				(err) => {
					console.error(err)
					setErrorMessage(err.toString())
				}
			)
	}

	let gqlErrors = []
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
						<p>
							Please provide all the neccessary credentials below to sign into your account.
						</p>
						{signInResponse.data?.signIn?.status?.ok === false &&
							<p className="text-destructive-foreground mt-2">
								{signInResponse.data?.signIn?.status?.message}
							</p>
						}
						{gqlErrors.length > 0 &&
							<ul className="mt-2">
								{gqlErrors}
							</ul>
						}
						{errorMessage && 
							<p className="text-destructive-foreground mt-2">
								{errorMessage}
							</p>
						}
						{signInResponse.loading &&
							<p className="flex items-center justify-center mt-2">
								<LoaderIcon className="animate-spin" />
							</p>
						}
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<Input name="username" placeholder="Username" ref={usernameInputRef} />
					<Input name="password" placeholder="Password" type="password" ref={passwordInputRef} />
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

