import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { useAtom } from "jotai";
import croppedPostImageAtom from "@/atoms/croppedPostImageAtom";


export default function EditPostImageButton({ disabled }: { disabled: boolean }) {
  const [image, setImage] = useState<File | null>(null); // Holds uploaded image
  const [croppedImage, setCroppedImage] = useAtom(croppedPostImageAtom); // Holds cropped image
  const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [scale, setScale] = useState(1.2);

  const editorRef = useRef<AvatarEditor | null>(null); // Ref to AvatarEditor

  const [fileName, setFileName] = useState<string>("Select image"); // Placeholder text

  // Handle file input change, open modal when file is selected
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setFileName(file.name); // Update placeholder with the selected file name
      setIsDialogOpen(true); // Open the modal
    }
  };

  // Handle cropping image
  const handleCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage().toDataURL();
      setCroppedImage(canvas); // Save the cropped image as base64
      setIsDialogOpen(false); // Close the modal after cropping
    }
  };

  // Render the component
  return (
    <>
      {/* Custom File Input Placeholder */}
      <div className="flex justify-center items-center gap-2">
				<Button variant="outline" disabled={disabled}>
					<Label htmlFor="file-upload" className="cursor-pointer">
						{fileName}
					</Label>
				</Button>

        {/* File input */}
        <Input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload} // Trigger when file is selected
        />
			</div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="dark bg-background text-foreground max-w-96">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>Adjust and crop your profile image.</DialogDescription>
          </DialogHeader>

          {/* Avatar Editor, shown if an image is uploaded */}
          {image && (
            <div className="flex flex-col items-center gap-4">
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={180}
                height={240}
                border={20}
                borderRadius={5}
                scale={scale} // Controlled scale value
              />

              {/* Slider for controlling the scale */}
              <div className="w-full flex items-center justify-center">
                <Label className="mr-4">Zoom:</Label>
                <Input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-3/4"
                />
              </div>
            </div>
          )}

          {/* Footer with Cancel and Save Buttons */}
          <DialogFooter className="w-full flex flex-row items-center justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={disabled} type="button" variant="outline" onClick={handleCrop}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Display cropped image if available */}
      {croppedImage && (
        <div className="flex justify-center items-center">
          <img src={croppedImage} alt="Cropped image" className="w-[90px] h-[120px]" />
        </div>
      )}
    </>
  );
}
