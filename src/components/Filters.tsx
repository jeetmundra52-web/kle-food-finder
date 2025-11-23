import { Button } from "@/components/ui/button";

interface FiltersProps {
    type: string;
    setType: (type: string) => void;
    isVeg: boolean;
    setIsVeg: (isVeg: boolean) => void;
}

const Filters = ({ type, setType, isVeg, setIsVeg }: FiltersProps) => {
    return (
        <div className="flex flex-wrap gap-2">
            <Button
                variant={type === 'Snacks' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType(type === 'Snacks' ? '' : 'Snacks')}
                className="rounded-full"
            >
                Snacks
            </Button>
            <Button
                variant={type === 'Meals' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType(type === 'Meals' ? '' : 'Meals')}
                className="rounded-full"
            >
                Meals
            </Button>
            <Button
                variant={isVeg ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsVeg(!isVeg)}
                className={`rounded-full ${isVeg ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
                Pure Veg
            </Button>
        </div>
    );
};

export default Filters;
