
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

interface Review {
  id: number;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
  initialReviews?: Review[];
}

const ProductReviews = ({ productId, initialReviews = [] }: ProductReviewsProps) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [showForm, setShowForm] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to leave a review");
      return;
    }
    
    if (newReview.trim().length < 10) {
      toast.error("Review must be at least 10 characters long");
      return;
    }
    
    // Add new review
    const review: Review = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      rating,
      comment: newReview.trim(),
      date: new Date().toISOString(),
    };
    
    setReviews([review, ...reviews]);
    setNewReview('');
    setRating(5);
    setShowForm(false);
    toast.success("Review submitted successfully");
  };

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-5 w-5 ${i < count ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Customer Reviews</h2>
      
      {user && !showForm && (
        <Button 
          onClick={() => setShowForm(true)} 
          className="mb-6"
        >
          Write a Review
        </Button>
      )}
      
      {showForm && (
        <Card className="mb-8 p-4">
          <h3 className="font-semibold mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">Rating:</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`h-6 w-6 ${value <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <Textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="resize-none"
                rows={4}
                required
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit">Submit Review</Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {reviews.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500">
            This product has no reviews yet. Be the first to leave one!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <div className="flex my-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
