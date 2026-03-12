import { Loader2 } from 'lucide-react';
const StatItem = ({ label, value, delay, loading }) => {
  return (
	  <div
		  className="flex items-center gap-1.5 animate-fade-in"
		  style={{ animationDelay: delay }}
	  >
		  {loading ? (
			  <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
		  ) : (
			  <span className="font-semibold text-sm sm:text-base">
				  {typeof value === 'number' ? value.toLocaleString() : value || 0}
			  </span>
		  )}
		  <span className="text-muted-foreground text-xs sm:text-sm">{label}</span>
	  </div>
  )
}

export default StatItem
