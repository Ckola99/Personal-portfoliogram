import React from 'react';
import { Youtube, Github, ExternalLink } from 'lucide-react';

const SideActions = ({ reel }) => {
	return (
		<div className="absolute right-2 bottom-16 flex flex-col gap-4">
			{/* YouTube Link (Replaces the generic Share) */}
			<a
				href={reel.youtubeUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="flex flex-col items-center gap-0.5 text-white transition-transform duration-200 hover:scale-110 hover:text-red-500"
				title="Watch Demo on YouTube"
			>
				<div className="p-2 bg-black/40 backdrop-blur-md rounded-full">
					<Youtube className="w-5 h-5" />
				</div>
			</a>

			{/* GitHub Link */}
			{reel.githubUrl && (
				<a
					href={reel.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center gap-0.5 text-white transition-transform duration-200 hover:scale-110"
					title="View Source Code"
				>
					<div className="p-2 bg-black/40 backdrop-blur-md rounded-full">
						<Github className="w-5 h-5" />
					</div>
				</a>
			)}

			{/* Project Live Link (Optional) */}
			{reel.projectUrl && (
				<a
					href={reel.projectUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center gap-0.5 text-white transition-transform duration-200 hover:scale-110"
					title="View Live Project"
				>
					<div className="p-2 bg-black/40 backdrop-blur-md rounded-full">
						<ExternalLink className="w-5 h-5" />
					</div>
				</a>
			)}
		</div>
	);
};

export default SideActions;
