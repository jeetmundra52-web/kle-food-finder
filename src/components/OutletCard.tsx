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
    let imageUrl = outlet.banner || outlet.image;
    if (outlet.name === 'Doughpaze') imageUrl = '/doughpaze-logo.png';
    if (outlet.name === 'Ethnic Flavours') imageUrl = '/ethnic-flavours-logo.png';
    if (outlet.name === 'Spice Story') imageUrl = '/spice-story-logo.png';
    if (outlet.name === 'Chow King') imageUrl = '/chow-king-logo.png';
    if (outlet.name === 'Gapa Gup') imageUrl = '/gapa-gup-logo.png';
    if (outlet.name === 'Chai Paani') imageUrl = '/chai-paani-logo.png';
    if (outlet.name === 'Wow Franky, Wraps and Sandwich') imageUrl = '/wow-franky-logo.png';
    if (outlet.name === 'Crazy Corn Juice and Snacks') imageUrl = '/crazy-corn-logo.png';
    if (outlet.name === 'The Bake Hub') imageUrl = '/the-bake-hub-logo.png';
    if (outlet.name === 'Leafy Life: Fresh and Healthy Bowls') imageUrl = '/leafy-life-logo.png';

    return (
        <Link to={`/student/outlets/${outlet.id}`}>
            <Card className="outlet-card group overflow-hidden border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 bg-white rounded-[2rem] cursor-pointer h-full flex flex-col hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden bg-[#fcfdfe]">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={outlet.name}
                            className={`w-full h-full transition-transform duration-700 ease-out ${['Doughpaze', 'Ethnic Flavours', 'Spice Story', 'Chow King', 'Gapa Gup', 'Chai Paani', 'Wow Franky, Wraps and Sandwich', 'Crazy Corn Juice and Snacks', 'The Bake Hub', 'Leafy Life: Fresh and Healthy Bowls'].includes(outlet.name)
                                ? 'object-contain p-0 scale-150 group-hover:scale-[1.7]'
                                : 'object-cover group-hover:scale-110'
                                }`}
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

                <div className="p-6 flex-1 flex flex-col bg-white">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{outlet.name}</h3>
                        <div className="flex items-center gap-1.5 bg-green-50/80 px-2.5 py-1 rounded-full border border-green-100">
                            <span className="text-xs font-black text-green-700">{outlet.rating}</span>
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

