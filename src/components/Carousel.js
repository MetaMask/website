import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import classnames from 'classnames'

function NavButton({ right, onClick }) {
  return (
    <div
      className={classnames('nav-button', {
        right: right,
      })}
      onClick={onClick}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="20" fill="#037DD6" />
        <path
          d="M23 14.6665C23.0012 14.3376 22.9005 14.0159 22.7105 13.7419C22.5205 13.468 22.2498 13.2542 21.9329 13.1277C21.6159 13.0013 21.2668 12.9678 20.9299 13.0315C20.593 13.0952 20.2834 13.2533 20.0404 13.4856L14.5082 18.7891C14.3463 18.944 14.2182 19.1282 14.1311 19.3309C14.0441 19.5336 13.9999 19.7508 14.0011 19.9699C14.0011 19.9891 14.0011 20.0068 14.0011 20.0245C13.9927 20.2515 14.0333 20.4777 14.1203 20.689C14.2073 20.9003 14.3388 21.0922 14.5067 21.2526L20.042 26.5428C20.3698 26.8413 20.8066 27.0054 21.259 26.9999C21.7115 26.9944 22.1437 26.8197 22.4636 26.5133C22.7834 26.2068 22.9655 25.7928 22.971 25.3595C22.9764 24.9263 22.8049 24.5082 22.4929 24.1944L18.1306 20.0172L22.4929 15.8399C22.6538 15.6859 22.7814 15.5029 22.8684 15.3016C22.9555 15.1002 23.0002 14.8844 23 14.6665Z"
          fill="white"
        />
      </svg>
    </div>
  )
}
const Carousel = ({
  children,
  items = 1,
  itemsOnMobile = 1,
  itemsOnTablet = 1,
  speed = 500,
  infinite = true,
  dots = false,
  gap = '10px',
  autoplay = true,
}) => {
  const settings = {
    autoplay,
    dots,
    infinite,
    speed,
    slidesToShow: items,
    slidesToScroll: items,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: itemsOnMobile,
          slidesToScroll: itemsOnMobile,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: itemsOnTablet,
          slidesToScroll: itemsOnTablet,
        },
      },
    ],
    nextArrow: <NavButton right />,
    prevArrow: <NavButton />,
  }
  return (
    <Wrapper $gap={gap}>
      <Slider {...settings}>{children}</Slider>
    </Wrapper>
  )
}

export default Carousel

const Wrapper = styled.div`
  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }
  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slider {
    box-sizing: border-box;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }
  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: 0;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-list,
  .slick-slider .slick-track {
    transform: translate3d(0, 0, 0);
  }
  .slick-track {
    top: 0;
    left: 0;
  }
  .slick-track:after,
  .slick-track:before {
    display: table;
    content: '';
  }
  .slick-track:after {
    clear: both;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }
  [dir='rtl'] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }
  .slick-dots,
  .slick-next,
  .slick-prev {
    position: absolute;
    display: block;
    padding: 0;
  }
  .slick-dots li button:before,
  .slick-next:before,
  .slick-prev:before {
    font-family: slick;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-loading .slick-list {
    background: url(ajax-loader.gif) center center no-repeat #fff;
  }
  @font-face {
    font-family: slick;
    font-weight: 400;
    font-style: normal;
    src: url(fonts/slick.eot);
    src: url(fonts/slick.eot?#iefix) format('embedded-opentype'),
      url(fonts/slick.woff) format('woff'),
      url(fonts/slick.ttf) format('truetype'),
      url(fonts/slick.svg#slick) format('svg');
  }
  .slick-next,
  .slick-prev {
    font-size: 0;
    line-height: 0;
    top: 50%;
    width: 20px;
    height: 20px;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: 0;
    background: 0 0;
  }
  .slick-next:focus,
  .slick-next:hover,
  .slick-prev:focus,
  .slick-prev:hover {
    color: transparent;
    outline: 0;
    background: 0 0;
  }
  .slick-next:focus:before,
  .slick-next:hover:before,
  .slick-prev:focus:before,
  .slick-prev:hover:before {
    opacity: 1;
  }
  .slick-next.slick-disabled:before,
  .slick-prev.slick-disabled:before {
    opacity: 0.25;
  }
  .slick-next:before,
  .slick-prev:before {
    font-size: 20px;
    line-height: 1;
    opacity: 0.75;
    color: #fff;
  }
  .slick-prev {
    left: -25px;
  }
  [dir='rtl'] .slick-prev {
    right: -25px;
    left: auto;
  }
  .slick-prev:before {
    content: '←';
  }
  .slick-next:before,
  [dir='rtl'] .slick-prev:before {
    content: '→';
  }
  .slick-next {
    right: -25px;
  }
  [dir='rtl'] .slick-next {
    right: auto;
    left: -25px;
  }
  [dir='rtl'] .slick-next:before {
    content: '←';
  }
  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }
  .slick-dots {
    bottom: -25px;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;
  }
  .slick-dots li {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 5px;
    padding: 0;
    cursor: pointer;
  }
  .slick-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: 0;
    background: 0 0;
  }
  .slick-dots li button:focus,
  .slick-dots li button:hover {
    outline: 0;
  }
  .slick-dots li button:focus:before,
  .slick-dots li button:hover:before {
    opacity: 1;
  }
  .slick-dots li button:before {
    font-size: 6px;
    line-height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    content: '•';
    text-align: center;
    opacity: 0.25;
    color: #000;
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: #000;
  }
  ${({ $gap }) =>
    $gap
      ? `
    .slick-slide {
      padding: 0 ${$gap};
    }
    .slick-list {
      margin: 0 -${$gap};
    }
  `
      : ``}
  position: relative;
  padding-bottom: 60px;
  .nav-button {
    position: absolute;
    display: inline-block;
    cursor: pointer;
    height: 40px;
    bottom: -60px;
    left: calc(50% - 50px);

    &.right {
      transform: rotate(180deg);
      right: calc(50% - 50px);
      left: unset;
    }
  }
  .slick-track {
    display: flex;
  }
  .slick-slide {
    height: auto;

    & > div {
      height: 100%;
    }
  }
  @media (min-width: 1300px) {
    .nav-button {
      top: calc(50% - 20px);
      left: -50px;
      bottom: unset;

      &.right {
        transform: rotate(180deg);
        left: unset;
        right: -50px;
      }
    }
  }
`
