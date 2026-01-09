
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: any; // Type should be imported effectively, but using any for flexibility with backend response
    onReviewSubmitted: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, order, onReviewSubmitted }) => {
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const [comments, setComments] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!order) return null;

    const handleRatingChange = (itemName: string, rating: number) => {
        setRatings(prev => ({ ...prev, [itemName]: rating }));
    };

    const handleCommentChange = (itemName: string, comment: string) => {
        setComments(prev => ({ ...prev, [itemName]: comment }));
    };

    const handleSubmit = async () => {
        // Validate that all items are rated
        const allRated = order.items.every((item: any) => ratings[item.name] && ratings[item.name] > 0);
        if (!allRated) {
            toast.error("Please rate all items before submitting.");
            return;
        }

        setIsSubmitting(true);

        const reviews = order.items.map((item: any) => ({
            foodItemName: item.name,
            rating: ratings[item.name],
            comment: comments[item.name] || ''
        }));

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("You are not authenticated. Please login again.");
                return;
            }

            console.log(`[ReviewSubmit] Submitting reviews with token: ${token.substring(0, 10)}...`);

            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    orderId: order._id,
                    reviews
                })
            });

            if (response.status === 401) {
                toast.error("Session expired or unauthorized. Please re-login.");
                return;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Failed to submit review');
            }

            toast.success("Reviews submitted successfully!");
            onReviewSubmitted();
            onClose();
        } catch (error: any) {
            console.error("[ReviewSubmitError]", error);
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Rate your Order</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {order.items.map((item: any, index: number) => (
                        <div key={index} className="space-y-2 border-b pb-4 last:border-0">
                            <h3 className="font-medium text-lg">{item.name}</h3>

                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingChange(item.name, star)}
                                        className={`p-1 transition-colors ${(ratings[item.name] || 0) >= star
                                            ? 'text-yellow-500 fill-yellow-500'
                                            : 'text-gray-300'
                                            }`}
                                    >
                                        <Star className={`w-6 h-6 ${(ratings[item.name] || 0) >= star ? 'fill-current' : ''}`} />
                                    </button>
                                ))}
                            </div>

                            <div className="pt-2">
                                <Label htmlFor={`comment-${index}`} className="text-xs text-muted-foreground">
                                    Optional feedback
                                </Label>
                                <Textarea
                                    id={`comment-${index}`}
                                    placeholder="How was the taste?"
                                    value={comments[item.name] || ''}
                                    onChange={(e) => handleCommentChange(item.name, e.target.value)}
                                    className="mt-1 h-20 resize-none"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Reviews'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewModal;
