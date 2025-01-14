import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useStore } from "@/store/useStore";
import { useNavigate } from "react-router-dom";

const steps = [
    {
        id: 'destination',
        title: 'Where do you want to go?',
        description: 'Enter your dream destination',
    },
    {
        id: 'dates',
        title: 'When are you planning to travel?',
        description: 'Select your travel dates',
    },
    {
        id: 'duration',
        title: 'How long will you stay?',
        description: 'Choose your trip duration',
    },
    {
        id: 'style',
        title: 'What\'s your travel style?',
        description: 'Select your preferred way of traveling',
    },
    {
        id: 'budget',
        title: 'What\'s your budget?',
        description: 'Select your budget range per day',
    }
];

export default function TripWizard() {
    const {
        currentStep,
        setCurrentStep,
        isSubmitting,
        setIsSubmitting
    } = useStore((state) => state.app);

    const {
        tripData,
        updateTripData
    } = useStore((state) => state.trip);

    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Add your submission logic here
        console.log('Trip Data:', tripData);
        navigate('/agent');
        setIsSubmitting(false);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                            id="destination"
                            placeholder="e.g., Paris, France"
                            value={tripData.destination}
                            onChange={(e) => updateTripData('destination', e.target.value)}
                        />
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4">
                        <Label>Start Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !tripData.startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {tripData.startDate ? format(tripData.startDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={tripData.startDate}
                                    onSelect={(date) => updateTripData('startDate', date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <Label>Duration</Label>
                        <RadioGroup
                            value={tripData.duration}
                            onValueChange={(value) => updateTripData('duration', value)}
                        >
                            {['Weekend', 'Week', '2 Weeks', 'Month+'].map((duration) => (
                                <div key={duration} className="flex items-center space-x-2">
                                    <RadioGroupItem value={duration} id={duration} />
                                    <Label htmlFor={duration}>{duration}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <Label>Travel Style</Label>
                        <RadioGroup
                            value={tripData.travelStyle}
                            onValueChange={(value) => updateTripData('travelStyle', value)}
                        >
                            {['Luxury', 'Comfort', 'Backpacker', 'Budget'].map((style) => (
                                <div key={style} className="flex items-center space-x-2">
                                    <RadioGroupItem value={style} id={style} />
                                    <Label htmlFor={style}>{style}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <Label>Daily Budget</Label>
                        <RadioGroup
                            value={tripData.budget}
                            onValueChange={(value) => updateTripData('budget', value)}
                        >
                            {['$0-100', '$100-200', '$200-500', '$500+'].map((budget) => (
                                <div key={budget} className="flex items-center space-x-2">
                                    <RadioGroupItem value={budget} id={budget} />
                                    <Label htmlFor={budget}>{budget}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container max-w-2xl mx-auto py-10">
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-8">
                        {/* Progress */}
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                            <p className="text-muted-foreground">{steps[currentStep].description}</p>
                        </div>

                        {/* Step Content */}
                        {renderStep()}

                        {/* Navigation */}
                        <div className="flex justify-between pt-4">
                            <div>
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                >
                                    Back
                                </Button>
                            </div>
                            <div>
                                <Button
                                    className="mr-2"
                                    variant="outline"
                                    onClick={() => navigate('/agent')}
                                >
                                    Skip
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please wait
                                        </>
                                    ) : currentStep === steps.length - 1 ? (
                                        'Finish'
                                    ) : (
                                        'Next'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}