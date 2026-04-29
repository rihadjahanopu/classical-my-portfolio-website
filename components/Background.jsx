"use client";

import { memo } from "react";

const Background = memo(function Background() {
	return (
		<>
			<div className="noise-overlay"></div>
			<div className="bg-blob blob-1"></div>
			<div className="bg-blob blob-2"></div>
			<div className="bg-blob blob-3"></div>
		</>
	);
});

export default Background;
