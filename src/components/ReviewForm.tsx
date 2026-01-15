"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewFormProps {
  productId: string;
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sweetness, setSweetness] = useState(3);
  const [bitterness, setBitterness] = useState(3);
  const [umami, setUmami] = useState(3);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    console.log("Submitting review for", productId, {
        rating, sweetness, bitterness, umami, comment
    });

    setIsSubmitting(false);
    setSubmitted(true);
    // In a real app, this would refresh the data
  };

  if (submitted) {
     return (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="text-xl font-bold text-primary">Thank you for your review!</h3>
            <p className="mt-2 text-muted-foreground">Your taste profile has been noted and helps others find their perfect matcha.</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 text-sm underline opacity-70 hover:opacity-100">
                Write another review
            </button>
        </div>
     )
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full rounded-full border border-input bg-background px-8 py-4 text-center font-bold transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Write a Review
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-2xl font-bold">Write a Review</h3>
         <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">Cancel</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Overall Rating */}
        <div className="space-y-2">
            <label className="text-sm font-medium">Overall Rating</label>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className="p-1 focus:outline-none"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                    >
                        <Star
                            className={cn(
                                "h-8 w-8 transition-colors",
                                (hoverRating || rating) >= star
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted-foreground"
                            )}
                        />
                    </button>
                ))}
            </div>
        </div>

        {/* Taste Profile Sliders */}
        <div className="space-y-4 rounded-xl bg-muted/30 p-4">
            <p className="font-semibold text-sm mb-4">Taste Profile (1 = Low, 5 = High)</p>
            
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <label>Sweetness</label>
                    <span className="font-medium">{sweetness}</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={sweetness}
                    onChange={(e) => setSweetness(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <label>Bitterness</label>
                    <span className="font-medium">{bitterness}</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={bitterness}
                    onChange={(e) => setBitterness(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <label>Umami</label>
                    <span className="font-medium">{umami}</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={umami}
                    onChange={(e) => setUmami(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium">Your Review</label>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                required
                className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Share your thoughts on the taste, texture, and aroma..."
            />
        </div>

        <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full rounded-full bg-primary py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
            {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </motion.div>
  );
}
