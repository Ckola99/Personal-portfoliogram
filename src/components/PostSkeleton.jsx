import React from 'react'

const PostSkeleton = () => {
  return (
	  <div className="flex flex-col h-full bg-card border border-border rounded-xl overflow-hidden">
		  {/* Header */}
		  <div className="flex items-center gap-3 p-3 sm:p-4">
			  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full animate-shimmer" />
			  <div className="h-3 w-24 animate-shimmer rounded" />
		  </div>

		  {/* Image Area */}
		  <div className="aspect-square animate-shimmer" />

		  {/* Content Area */}
		  <div className="p-3 sm:p-4 space-y-3">
			  <div className="flex justify-between">
				  <div className="flex gap-3">
					  <div className="w-5 h-5 animate-shimmer rounded-full" />
					  <div className="w-5 h-5 animate-shimmer rounded-full" />
					  <div className="w-5 h-5 animate-shimmer rounded-full" />
				  </div>
				  <div className="w-5 h-5 animate-shimmer rounded" />
			  </div>
			  <div className="h-3 w-full animate-shimmer rounded" />
			  <div className="h-3 w-2/3 animate-shimmer rounded" />
		  </div>
	  </div>
  )
}

export default PostSkeleton
