import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
 

export default function SignInButton() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">
					Sign In
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] dark bg-background text-foreground">
				<DialogHeader>
					<DialogTitle>
						Sign In
					</DialogTitle>
					<DialogDescription>
						Please provide all the neccessary credentials below to sign into your account.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div>
				<DialogFooter>
					<Button type="submit" variant="outline">
						Sign In
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

