import { React, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { black } from 'tailwindcss/colors';

export function Landing() {
	const boxRef = useRef();
	useEffect(() => {
		let tl = gsap.timeline({ repeat: -1, yoyo: true });
		tl.to(boxRef.current, {
			x: 732,
			y: 92,
			ease: 'Circ.ease0ut',
			opacity: 0,
			width: 20,
			height: 20,
			duration: 0.2,
			boxShadow: 'inset 0 0 5px 5px white, 0 0 5px 5px black',
		})
			.to(boxRef.current, { x: 733, y: 93, ease: 'Circ.ease0ut', opacity: 1, width: 20, height: 20, duration: 2 })
			.to(boxRef.current, {
				x: 598,
				y: 165,
				ease: 'Circ.ease0ut',
				opacity: 1,
				width: 50,
				height: 50,
				duration: 2,
			})
			.to(boxRef.current, { x: 497, y: 294, ease: 'Circ.ease0ut', opacity: 1, width: 20, height: 20, duration: 2 })
			.to(boxRef.current, { x: 369, y: 131, ease: 'Circ.ease0ut', opacity: 1, width: 50, height: 50, duration: 2 })
			.to(boxRef.current, { x: 294, y: 220, ease: 'Circ.ease0ut', opacity: 1, width: 20, height: 20, duration: 2 })
			.to(boxRef.current, { x: 152, y: 221, ease: 'Circ.ease0ut', opacity: 1, width: 40, height: 40, duration: 2 })
			.to(boxRef.current, {
				x: 52,
				y: 361,
				ease: 'Circ.ease0ut',
				opacity: 1,
				width: 30,
				height: 30,
				background: black,
				duration: 2,
			});
	});

	return (
		<div className="py-10 px-14 h-screen">
			<header className="h-16 flex items-center justify-between px-8">
				<div className="border-bottom-style">
					<h1 className="text-5xl cursor-pointer">Polaris.</h1>
				</div>
				<Link className="text-2xl" to={`/login`}>
					login
				</Link>
			</header>
			<div className="flex justify-center">
				<div className="w-96 mt-16 mr-24">
					<p className="text-base text-justify">
						Polaris is an open source roadmap creator that help you build your own roadmaps and besides that you can
						invite anybody to your workspace to see your roadmaps that had been created. First you have to create some
						categories for your lessons then create your lessons. Every lesson has duration which calculates the number
						of days it takes. Lesson has also dependency filed that related to any lesson exist. After you create some
						lesson you may also wants to define some target like your first project before it create categories for
						them. At last make your phases for every target and finally create your roadmap!
					</p>
				</div>
				<div className="w-7/12 relative">
					<img src="Galaxy-resize.jpg" className="absolute w-full h-auto"></img>
					<div ref={boxRef} className="w-5 h-5 bg-black rounded-full relative opacity-0"></div>
					<div className="point1 "></div>
					<div className="point2 "></div>
					<div className="point3 "></div>
					<div className="point4 "></div>
					<div className="point5 "></div>
					<div className="point6 "></div>
					<div className="point7 "></div>
				</div>
			</div>
		</div>
	);
}
export default Landing;
