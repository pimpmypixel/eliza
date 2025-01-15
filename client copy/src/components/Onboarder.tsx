import { Button } from "@/components/ui/button";

interface OnboarderProps {
    town: string;
    submit: () => void;
    switchLocation: () => void;
    selectedDuration: string | null;
    setSelectedDuration: (duration: string | null) => void;
    selectedCategories: string[];
    setSelectedCategories: (categories: string[] | ((prev: string[]) => string[])) => void;
    durations: string[];
    categories: string[];
}

export function Onboarder({
    town,
    switchLocation,
    submit,
    selectedDuration,
    setSelectedDuration,
    selectedCategories,
    setSelectedCategories,
    durations,
    categories
}: OnboarderProps) {
    return (
        <div className="text-center text-sm text-muted-foreground">
            <div>
                Hi there! I'm <span className="text-blue-500 font-bold">AI-TINERARY</span><br />
                your realtime travel assistant!<br />
                So what do you want to do in <Button
                    size="xs"
                    className="text-xs p-1 ml-1 bg-secondary text-primary-foreground"
                    onClick={switchLocation}
                >
                    {town}
                </Button>
            </div>

            <hr className="my-2" />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <span className="font-bold">How much time do we have?</span>
                    <div className="flex flex-wrap gap-2">
                        {durations.map((duration) => (
                            <Button
                                size="xs"
                                className="text-xs p-1"
                                key={duration}
                                variant={selectedDuration === duration ? "default" : "outline"}
                                onClick={() => setSelectedDuration(duration === selectedDuration ? null : duration)}
                            >
                                {duration}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="my-2" />

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <span className="font-bold">Select your desired activities</span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                size="xs"
                                className="text-xs p-1"
                                variant={selectedCategories.includes(category) ? "default" : "outline"}
                                onClick={() => {
                                    setSelectedCategories(prev => prev.length >= 3 && !prev.includes(category) ? prev :
                                        prev.includes(category)
                                            ? prev.filter(c => c !== category)
                                            : [...prev, category]
                                    );
                                }}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            {selectedDuration && selectedCategories.length > 0 && (
                <>
                    <hr className="my-2" />
                    <Button
                        size="xs"
                        variant="outline"
                        className="text-primary w-full text-lg py-1 mt-2"
                        onClick={submit}
                    >
                        Go!
                    </Button>
                </>
            )}
        </div>
    );
}