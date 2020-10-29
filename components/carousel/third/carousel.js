const slideData = [
	{
		index: 0,
		headline: 'Music',
		button: 'Songs',
		src: 'https://www.wissenschaft.de/wp-content/uploads/1/9/19-11-22-musik.jpg' },

	{
		index: 1,
		headline: 'Nature',
		button: 'Travel',
		src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bachalpsee_reflection.jpg/300px-Bachalpsee_reflection.jpg' },

	{
		index: 2,
		headline: 'Food',
		button: 'Eat',
		src: 'http://spreadseed.net/wp-content/uploads/sites/3/2019/05/naturbelassene-nahrung-rohkost.jpeg' },

	{
		index: 3,
		headline: 'Book',
		button: 'Read and Write',
		src: 'https://lh3.googleusercontent.com/proxy/cCzfYTu4iTJCYRFXcHNUcsJ46LPHnDwjYbLbhhUrBYMdE-cVRD43LWMiexFC2jjilJ_JItacz2A8CLsBGeBF6TgFCMRhi_TE9NT6CBKNBOcDp5_dXNGdfMGg5v2T' }];




	// =========================
	// Slide
	// =========================

	class Slide extends React.Component {
		constructor(props) {
			super(props);

			this.handleMouseMove = this.handleMouseMove.bind(this);
			this.handleMouseLeave = this.handleMouseLeave.bind(this);
			this.handleSlideClick = this.handleSlideClick.bind(this);
			this.imageLoaded = this.imageLoaded.bind(this);
			this.slide = React.createRef();
		}

		handleMouseMove(event) {
			const el = this.slide.current;
			const r = el.getBoundingClientRect();

			el.style.setProperty('--x', event.clientX - (r.left + Math.floor(r.width / 2)));
			el.style.setProperty('--y', event.clientY - (r.top + Math.floor(r.height / 2)));
		}

		handleMouseLeave(event) {
			this.slide.current.style.setProperty('--x', 0);
			this.slide.current.style.setProperty('--y', 0);
		}

		handleSlideClick(event) {
			this.props.handleSlideClick(this.props.slide.index);
		}

		imageLoaded(event) {
			event.target.style.opacity = 1;
		}

		render() {
			const { src, button, headline, index } = this.props.slide;
			const current = this.props.current;
			let classNames = 'slide';

			if (current === index) classNames += ' slide--current';else
			if (current - 1 === index) classNames += ' slide--previous';else
			if (current + 1 === index) classNames += ' slide--next';

			return (
				React.createElement("li", {
					ref: this.slide,
					className: classNames,
					onClick: this.handleSlideClick,
					onMouseMove: this.handleMouseMove,
					onMouseLeave: this.handleMouseLeave },

				React.createElement("div", { className: "slide__image-wrapper" },
				React.createElement("img", {
					className: "slide__image",
					alt: headline,
					src: src,
					onLoad: this.imageLoaded })),



				React.createElement("article", { className: "slide__content" },
				React.createElement("h2", { className: "slide__headline" }, headline),
				React.createElement("button", { className: "slide__action btn" }, button))));



		}}



	// =========================
	// Slider control
	// =========================

	const SliderControl = ({ type, title, handleClick }) => {
		return (
			React.createElement("button", { className: `btn btn--${type}`, title: title, onClick: handleClick },
			React.createElement("svg", { className: "icon", viewBox: "0 0 24 24" },
			React.createElement("path", { d: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" }))));



	};


	// =========================
	// Slider
	// =========================

	class Slider extends React.Component {
		constructor(props) {
			super(props);

			this.state = { current: 0 };
			this.handlePreviousClick = this.handlePreviousClick.bind(this);
			this.handleNextClick = this.handleNextClick.bind(this);
			this.handleSlideClick = this.handleSlideClick.bind(this);
		}

		handlePreviousClick() {
			const previous = this.state.current - 1;

			this.setState({
				current: previous < 0 ?
				this.props.slides.length - 1 :
				previous });

		}

		handleNextClick() {
			const next = this.state.current + 1;

			this.setState({
				current: next === this.props.slides.length ?
				0 :
				next });

		}

		handleSlideClick(index) {
			if (this.state.current !== index) {
				this.setState({
					current: index });

			}
		}

		render() {
			const { current, direction } = this.state;
			const { slides, heading } = this.props;
			const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`;
			const wrapperTransform = {
				'transform': `translateX(-${current * (100 / slides.length)}%)` };


			return (
				React.createElement("div", { className: "slider", "aria-labelledby": headingId },
				React.createElement("ul", { className: "slider__wrapper", style: wrapperTransform },
				React.createElement("h3", { id: headingId, class: "visuallyhidden" }, heading),

				slides.map(slide => {
					return (
						React.createElement(Slide, {
							key: slide.index,
							slide: slide,
							current: current,
							handleSlideClick: this.handleSlideClick }));


				})),


				React.createElement("div", { className: "slider__controls" },
				React.createElement(SliderControl, {
					type: "previous",
					title: "Go to previous slide",
					handleClick: this.handlePreviousClick }),


				React.createElement(SliderControl, {
					type: "next",
					title: "Go to next slide",
					handleClick: this.handleNextClick }))));




		}}



	ReactDOM.render(React.createElement(Slider, { heading: "Example Slider", slides: slideData }), document.getElementById('app'));
