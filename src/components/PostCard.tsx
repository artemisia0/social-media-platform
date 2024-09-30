import type PostData from '@/types/PostData';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";


export default function PostCard({ data }: { data: PostData }) {

	// fetch most liked comment data
	
	const carouselItems = data.images
	const texts = data.texts

	return (
		<div className="rounded-lg border border-slate-600 shadow p-4 text-slate-100">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {carouselItems.map((item: string, index: number) => (
            <CarouselItem key={index} className="flex flex-col items-center">
							<div className="w-[300px] h-[400px] relative">
								<span className="text-zinc-900 font-bold absolute top-5 right-5">
									{index+1}/{carouselItems.length}
								</span>
											<img
									width={300}
									height={400}
									src={item}
									alt={`carousel item ${index + 1}`}
									className="rounded-lg border border-slate-600"
								/>
							</div>
							<div className="mt-2 text-slate-100">
								{texts[index]}
							</div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
		</div>
	)
}

