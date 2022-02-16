import { title } from 'case';

const Button = ({ className, loading, actionName }) => {
	return (
		<button className={className} type="submit">
			{!loading ? (
				title(actionName)
			) : (
				<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
					<g transform="translate(1 1)" strokeWidth="2">
						<circle opacity=".5" cx="18" cy="18" r="18" />
						<path d="M36 18c0-9.94-8.06-18-18-18">
							<animateTransform
								attributeName="transform"
								type="rotate"
								from="0 18 18"
								to="360 18 18"
								dur="1s"
								repeatCount="indefinite"
							/>
						</path>
					</g>
				</svg>
			)}
		</button>
	);
};
export default Button;
