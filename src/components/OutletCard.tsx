import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Store } from "lucide-react";
import { Link } from "react-router-dom";

interface OutletProps {
    id: number | string;
    name: string;
    image?: string; // Keep for backward compatibility
    banner?: string; // New field from database
    description: string;
    rating: number;
    deliveryTime: string;
    priceRange: string;
    type: string;
    isVeg: boolean;
    isOpen: boolean;
}

const OutletCard = ({ outlet }: { outlet: OutletProps }) => {
    // Use banner if available, fallback to image for backward compatibility
    const imageUrl = outlet.banner || outlet.image;

    return (
        <Link to={`/student/outlets/${outlet.id}`}>
            <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white rounded-2xl cursor-pointer h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-orange-50">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={outlet.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Store className="w-16 h-16 text-orange-300" />
                        </div>
                    )}
                    <div className="absolute top-3 right-3">
                        <Badge className={`${outlet.isOpen ? 'bg-green-500' : 'bg-red-500'} text-white border-0`}>
                            {outlet.isOpen ? 'Open' : 'Closed'}
                        </Badge>
                    </div>
                    {outlet.isVeg && (
                        <div className="absolute top-3 left-3">
                            <Badge className="bg-green-600 text-white border-0">Pure Veg</Badge>
                        </div>
                    )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{outlet.name}</h3>
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-lg">
                            <span className="text-xs font-bold text-green-700">{outlet.rating}</span>
                            <Star className="w-3 h-3 fill-green-700 text-green-700" />
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{outlet.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{outlet.deliveryTime}</span>
                        </div>
                        <span>{outlet.priceRange} • {outlet.type}</span>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default OutletCard;

