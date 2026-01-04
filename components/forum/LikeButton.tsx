"use client";

import { useState, useTransition, useOptimistic } from 'react';
import { toggleThreadLike, toggleReplyLike } from '@/app/actions/forum';
import { Heart } from 'lucide-react';

interface LikeButtonProps {
  threadId?: string;
  replyId?: string;
  initialLikes: number;
  initialLiked: boolean;
  parentThreadId?: string; // For replies, we need the thread ID for revalidation
}

export default function LikeButton({
  threadId,
  replyId,
  initialLikes,
  initialLiked,
  parentThreadId
}: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticState, setOptimisticState] = useOptimistic(
    { likes: initialLikes, liked: initialLiked },
    (state, newLiked: boolean) => ({
      likes: newLiked ? state.likes + 1 : state.likes - 1,
      liked: newLiked
    })
  );

  const handleLike = () => {
    const newLiked = !optimisticState.liked;
    setOptimisticState(newLiked);

    startTransition(async () => {
      if (threadId) {
        await toggleThreadLike(threadId);
      } else if (replyId && parentThreadId) {
        await toggleReplyLike(replyId, parentThreadId);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
        transition-all
        ${optimisticState.liked
          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
          : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
      aria-label={optimisticState.liked ? 'Quitar me gusta' : 'Me gusta'}
    >
      <Heart
        className={`w-4 h-4 ${optimisticState.liked ? 'fill-current' : ''}`}
      />
      <span>{optimisticState.likes}</span>
    </button>
  );
}
