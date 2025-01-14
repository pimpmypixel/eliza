import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../assets/cube-leg.png";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { settingsList, SettingsProps } from "../config/settings";
import { useNavigate } from "react-router-dom";

export const WelcomeOptions = () => {
    const navigate = useNavigate();

    return (
        <section className="container py-24 sm:py-12">
            <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                            Welcome{" "}
                        </span>
                        on board, traveller!
                    </h2>

                    <p className="text-muted-foreground text-xl mt-4 mb-8 ">
                        First, we set things up for you. You set a few preferences and we get you started. You can always change things later by clicking the settings button in the top right.
                    </p>

                    <div className="flex flex-col gap-8">
                        {settingsList.map(({ icon, title, description, component }: SettingsProps) => (
                            <Dialog key={title}>
                                <DialogTrigger asChild>
                                    <Card className="cursor-pointer hover:bg-accent transition-colors">
                                        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                                            <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                                                {icon}
                                            </div>
                                            <div>
                                                <CardTitle>{title}</CardTitle>
                                                <CardDescription className="text-md mt-2">
                                                    {description}
                                                </CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>{title}</DialogTitle>
                                    </DialogHeader>
                                    {component}
                                </DialogContent>

                            </Dialog>
                        ))}
                        <Card
                            onClick={() => navigate('/trip')}
                            className="cursor-pointer hover:bg-accent transition-colors">
                            <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                                <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                                    <WalletIcon />
                                </div>
                                <div>
                                    <CardTitle>Done!</CardTitle>
                                    <CardDescription className="text-md mt-2">
                                        I'm ready to start planning your trip!
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                </div>

                <img
                    src={cubeLeg}
                    className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
                    alt="About services"
                />
            </div>
        </section>
    );
};
