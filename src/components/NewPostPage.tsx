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
import { CircleMinus, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function NewPostPage() {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | undefined>(undefined);
  const [currentCarouselItem, setCurrentCarouselItem] = React.useState(1);
	const [itemsTextarea, setItemsTextarea] = React.useState<{ [key: number]: string; }>({});

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
	}

	const appendPostItem = () => {
	}

	const onPost = () => {
	}

  const carouselItems = [
    "https://via.placeholder.com/300x400/0000FF",
    "https://via.placeholder.com/300x400/FF0000",
    "https://via.placeholder.com/300x400/00FF00",
    "https://via.placeholder.com/300x400/FFFF00",
  ];

  return (  // why images are not shown in the carousel?
    <div className="flex flex-col items-center gap-2">
      <Carousel setApi={setCarouselApi} className="w-full max-w-xs">
        <CarouselContent>
          {carouselItems.map((item: string, index: number) => (
            <CarouselItem key={index} className="flex justify-center">
							<div className="w-[300px] h-[400px] relative">
								<span className="text-zinc-900 font-bold absolute top-5 right-5">
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
			<Textarea value={itemsTextarea[currentCarouselItem] ?? ''} onChange={onTextareaValueChange} placeholder="Write something..." className="bg-zinc-600" />
			<div className="flex justify-center gap-2 items-center">
				<Button onClick={removeCurrentPostItem}><CircleMinus /></Button>
				<Button onClick={onPost}>Post</Button>
				<Button onClick={appendPostItem}><CirclePlus /></Button>
			</div>
    </div>
  );
}
