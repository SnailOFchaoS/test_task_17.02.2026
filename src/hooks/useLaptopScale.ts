import { useEffect, useState } from "react";

const useLaptopScale = () => {
	const [scale, setScale] = useState<number>(() =>
		typeof window !== "undefined" && window.innerWidth >= 1920 ? 1 : 0.67
	);

	useEffect(() => {
		const updateScale = () => {
			setScale(window.innerWidth >= 1920 ? 1 :  0.67);
		};

		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, []);

	return scale;
};

export { useLaptopScale };