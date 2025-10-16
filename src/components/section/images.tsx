/** biome-ignore-all lint/nursery/useImageSize: <- Just ignore the lint error -> */
/** biome-ignore-all lint/performance/noImgElement: <- Just ignore the lint error -> */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Image as TMDBImage } from "@/types/tmdb";

type ImagesSectionProps = {
    title: string;
    images: TMDBImage[];
};

export function ImagesSection({ title, images }: ImagesSectionProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    if (images.length === 0) {
        return null;
    }

    const currentImage = images[selectedIndex];

    const goToPrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
                    {/** biome-ignore lint/style/noMagicNumbers: <- Just ignore the lint error -> */}
                    {images.slice(0, 15).map((image, index) => (
                        <Dialog
                            key={image.file_path}
                            open={isOpen && selectedIndex === index}
                        >
                            <DialogTrigger asChild>
                                <button
                                    className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-muted"
                                    onClick={() => {
                                        setSelectedIndex(index);
                                        setIsOpen(true);
                                    }}
                                    type="button"
                                >
                                    <img
                                        alt={`${title} ${index + 1}`}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        loading="lazy"
                                        src={`https://image.tmdb.org/t/p/w200${image.file_path}`}
                                    />
                                    
                                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                                </button>
                            </DialogTrigger>

                            <DialogContent className="max-w-3xl">
                                <div className="relative">
                                    <img
                                        alt={`${title} ${selectedIndex + 1}`}
                                        className="w-full rounded-lg"
                                        src={`https://image.tmdb.org/t/p/original${currentImage.file_path}`}
                                    />

                                    {images.length > 1 && (
                                        <>
                                            <Button
                                                className="-translate-y-1/2 absolute top-1/2 left-4"
                                                onClick={goToPrevious}
                                                size="icon"
                                                variant="secondary"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                className="-translate-y-1/2 absolute top-1/2 right-4"
                                                onClick={goToNext}
                                                size="icon"
                                                variant="secondary"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>

                                            <div className="-translate-x-1/2 absolute bottom-4 left-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                                                {selectedIndex + 1} /{" "}
                                                {images.length}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
