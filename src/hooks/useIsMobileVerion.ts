import { useState, useEffect } from "react";

const useIsMobileVersion = () => {
	const [isMobileVersion, setIsMobileVersion] = useState<boolean>(
		typeof window !== "undefined" && window.innerWidth < 768
	);

	useEffect(() => {
		const updateIsMobileVersion = () => {
			setIsMobileVersion(window.innerWidth < 768);
		};

		updateIsMobileVersion();
		window.addEventListener("resize", updateIsMobileVersion);
		return () => window.removeEventListener("resize", updateIsMobileVersion);
	}, []);

	return isMobileVersion;
}

export { useIsMobileVersion };