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
import { Textarea } from "@/components/ui/textarea"

import { useRef } from 'react'

import { CirclePlus } from 'lucide-react'

import { useAtom } from 'jotai'
import croppedPostImageAtom from '@/atoms/croppedPostImageAtom'

import EditPostImageButton from '@/components/EditPostImageButton'


export default function AddPostButton({ loading, carouselItems, setCarouselItems, itemsTextarea, setItemsTextarea }: { loading: boolean; carouselItems: string[]; setCarouselItems: any; itemsTextarea: { [key: number]: string; }; setItemsTextarea: any; }) {
	const closeButtonRef = useRef<HTMLButtonElement | null>(null)
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)
	const [croppedPostImage, setCroppedPostImage] = useAtom(croppedPostImageAtom)

	const onSubmit = () => {
		setItemsTextarea({ ...itemsTextarea, [carouselItems.length + 1]: textareaRef.current?.value || '' })
		setCarouselItems([...carouselItems, croppedPostImage])
		if (closeButtonRef.current) {
			closeButtonRef.current.click()
		}
		if (textareaRef.current) {
			textareaRef.current.value = ''
		}
		setCroppedPostImage('')
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" disabled={loading}><CirclePlus /></Button>
			</DialogTrigger>
			<DialogContent className="dark bg-background text-foreground max-w-96">
				<DialogHeader>
					<DialogTitle>
						Add post item
					</DialogTitle>
					<DialogDescription>
						Please provide a post item image to present it to your friends and write some description (optional) which You will be able to change later.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2">
					<EditPostImageButton disabled={loading} />
					<Textarea placeholder="Write an image description" ref={textareaRef} />
				</div>
				<DialogFooter className="w-full flex flex-row items-center justify-end gap-2">
					<DialogClose asChild>
						<Button type="button" variant="ghost" ref={closeButtonRef}>
							Cancel
						</Button>
					</DialogClose>
					<Button type="submit" variant="outline" onClick={onSubmit}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

