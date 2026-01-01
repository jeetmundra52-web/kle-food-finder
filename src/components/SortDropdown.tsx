import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[140px] rounded-xl bg-white border-gray-200">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="rating">Rating: High to Low</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SortDropdown;
