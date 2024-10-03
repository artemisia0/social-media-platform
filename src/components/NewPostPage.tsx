import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import { CircleMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gql, useMutation } from "@apollo/client";
import { useAtomValue } from "jotai";
import sessionDataAtom from "@/atoms/sessionDataAtom";
import AddPostButton from '@/components/AddPostButton';


const createPostMutation = gql`
mutation CreatePost($texts: [String!]!, $images: [String!]!, $authorUsername: String!) {
	createPost(texts: $texts, images: $images, authorUsername: $authorUsername) {
		status {
			ok
			message
		}
	}
}
`

export default function NewPostPage() {
	const sessionData = useAtomValue(sessionDataAtom);
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | undefined>(undefined);
  const [currentCarouselItem, setCurrentCarouselItem] = React.useState(1);
	const [itemsTextarea, setItemsTextarea] = React.useState<{ [key: number]: string; }>({});
	const [createPost, createPostResponse] = useMutation(createPostMutation);
	const [carouselItems, setCarouselItems] = React.useState<string[]>([
	]);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCarouselItem = () => {
      setCurrentCarouselItem(carouselApi.selectedScrollSnap() + 1);
    };

    updateCarouselItem(); // Initial setting of the carousel item

    carouselApi.on("select", updateCarouselItem); // Update when selection changes
  }, [carouselApi]);

	const onTextareaValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setItemsTextarea((prev) => ({
			...prev,
			[currentCarouselItem]: event.target.value,
		}));
	}

	const removeCurrentPostItem = () => {
		if (carouselItems.length === 0) {
			return;
		}
		const currentCarouselItemIndex = currentCarouselItem - 1;
		setItemsTextarea((prev) => {
			const res = {}
			for (const key in prev) {
				if (Number(key) < currentCarouselItem) {
					res[key] = prev[key];
				} else if (Number(key) > currentCarouselItem) {
					res[key-1] = prev[key];
				}
			}
			return res
		});
		setCarouselItems((prev) => (
			prev.filter((_, index) => index !== currentCarouselItemIndex)
		));
		setCurrentCarouselItem((prev) => Math.max(1, prev - 1));
	}

	const onPost = () => {
		const texts = Array.from({length: carouselItems.length}).map((_, index) => itemsTextarea[index + 1] ?? '')
		createPost({
			variables: {
				authorUsername: sessionData.username,
				texts,
				images: carouselItems,
			}
		}).then(
				() => {
					const searchParams = new URLSearchParams(window.location.search);
					searchParams.set('pageIndex', '4');
					window.location.search = searchParams.toString();
				}
			)
	}

  return (
    <div className="flex flex-col items-center gap-2">
			{Object.keys(itemsTextarea).length > 0 && (<>
				<Carousel setApi={setCarouselApi} className="w-full max-w-xs">
					<CarouselContent>
						{carouselItems.map((item: string, index: number) => (
							<CarouselItem key={index} className="flex justify-center">
								<div className="w-[300px] h-[400px] relative">
									<span className="rounded-lg backdrop-blur bg-slate-100/10 p-2 text-zinc-900 font-bold absolute top-5 right-5">
										{currentCarouselItem}/{carouselItems.length}
									</span>
												<img
										width={300}
										height={400}
										src={item}
										alt={`carousel item ${index + 1}`}
										className="rounded-lg border border-slate-600"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<Textarea value={itemsTextarea[currentCarouselItem] ?? ''} onChange={onTextareaValueChange} placeholder="Write something..." className="text-slate-100 bg-zinc-800 border border-zinc-600" />
			</>)}
			<div className="flex justify-center gap-2 items-center">
				<Button variant="outline" disabled={createPostResponse.loading || Object.keys(itemsTextarea).length === 0} onClick={removeCurrentPostItem}><CircleMinus /></Button>
				<Button variant="outline" disabled={createPostResponse.loading || Object.keys(itemsTextarea).length === 0} onClick={onPost}>Post</Button>
				<AddPostButton loading={createPostResponse.loading} carouselItems={carouselItems} setCarouselItems={setCarouselItems} itemsTextarea={itemsTextarea} setItemsTextarea={setItemsTextarea} />
			</div>
    </div>
  );
}
