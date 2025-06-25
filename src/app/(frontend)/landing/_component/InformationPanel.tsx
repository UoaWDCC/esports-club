// import { satoshi } from "../../layout";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "@/libs/utils";

const informationPanel = tv({
    base: "font-tomorrow text-xl",
    variants: {
        headerColour: {
            purple: "text-purple-border",
            pink: "text-pink-border"
        },
    },
    defaultVariants: {
        headerColour: "purple",
    }
})

type InformationPanelProps = {
    title: String;
    subtitle: String;
    description: String;
    variant?: VariantProps<typeof informationPanel>;
};

export default function InformationPanel({ title, subtitle, description, variant }: InformationPanelProps) {
    return (
        <div className="w-106 flex flex-col gap-4">
            <h1 className={cn(informationPanel(variant))}>{title}</h1>
            <h3 className="font-tomorrow text-3xl font-normal">{subtitle}</h3>
            <p className="font-satoshi font-light">{description}</p>
        </div>
    );
}

//how do I use the satoshi font
//am I setting font sizing right
