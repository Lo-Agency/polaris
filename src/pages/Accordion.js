import { useRef, useState } from 'react';

function Accordion({ title, content }) {
	const [active, setActive] = useState(false);
	const [height, setHeight] = useState('0px');
	const contentSpace = useRef(null);

	function toggleAccordion() {
		setActive(!active);
		setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`);
	}

	return (
		<>
			<div className="">
				<div className="w-1/2">
					<div className="relative bg-black text-white p-4 shadow border-b border-grey">
						<p>{title}</p>
						<label onClick={toggleAccordion} className="absolute right-3 top-2 cursor-pointer">
							{!active && (
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
								</svg>
							)}
							{active && (
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
								</svg>
							)}
						</label>
					</div>

					<div
						className="bg-grey-lighter overflow-auto transition-max-height duration-700 ease-in-out"
						ref={contentSpace}
						style={{ maxHeight: `${height}` }}>
						<button className="">{content}</button>
						{/* {content.map((item, index) => {
							return (
								<h2 key={index} className="pt-4 pl-4 text-black">
									{item}
								</h2>
							);
						})} */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Accordion;
