import { ArrowLeft } from 'lucide-react'

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";


export default function PostViewer({ data, onClose }: { data: any; onClose: any; }) {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | undefined>(undefined);
  const [currentCarouselItem, setCurrentCarouselItem] = React.useState(1);
	const texts = data.texts;
	const carouselItems = data.images

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

	return (
		<div className="flex flex-col items-center justify-center h-dvh gap-2">
			<Button className="absolute border border-zinc-600 rounded-full top-20 left-5 hover:text-slate-100 text-slate-100 hover:bg-zinc-700 bg-zinc-800" onClick={onClose}>
				<ArrowLeft />
			</Button>
			<div className="flex flex-col items-center gap-2">
				{texts.length > 0 && (<>
					<Carousel setApi={setCarouselApi} className="w-full max-w-xs">
						<CarouselContent>
							{carouselItems.map((item: string, index: number) => (
								<CarouselItem key={index} className="flex justify-center">
									<div className="w-[300px] h-[400px] relative">
										<span className="rounded-lg backdrop-blur bg-slate-100/80 p-2 text-zinc-900 font-bold absolute top-5 right-5">
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
					{texts[currentCarouselItem - 1] && (
							<div className="text-slate-100 p-2 m-2 rounded-lg bg-zinc-800 border border-zinc-600">
								{texts[currentCarouselItem - 1]}
							</div>
						)
					}
				</>)}
			</div>
		</div>
	)
}

