import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 4.8, reviewCount, showCount = true }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-amber-400">
        {stars.map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-700 ml-1">{rating}</span>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-slate-500">({reviewCount} reviews)</span>
      )}
    </div>
  );
}
