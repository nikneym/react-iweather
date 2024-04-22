import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

export default function Cloud(props: Props) {
  return (
    <svg
      width="64"
      height="39"
      viewBox="0 0 64 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i_3109_9)">
        <path
          d="M56.4019 19.9993C56.5638 19.08 56.6482 18.1343 56.6482 17.1691C56.6482 8.13974 49.2602 0.819969 40.1466 0.819969C33.3715 0.819969 27.55 4.86536 25.0086 10.6512C22.9498 8.89006 20.2782 7.82676 17.3588 7.82676C10.8491 7.82676 5.57192 13.1133 5.57192 19.6345C5.57192 19.9976 5.58829 20.3569 5.62032 20.7117C2.48927 22.2312 0.333328 25.4195 0.333328 29.1066C0.333328 34.2663 4.55505 38.449 9.7628 38.449H54.2909C59.4986 38.449 63.7203 34.2663 63.7203 29.1066C63.7203 24.666 60.5933 20.949 56.4019 19.9993Z"
          fill="url(#paint0_linear_3109_9)"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_3109_9"
          x="0.333328"
          y="0.819969"
          width="63.387"
          height="47.629"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_3109_9"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3109_9"
          x1="4.36497"
          y1="35.0893"
          x2="68.3119"
          y2="-12.731"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0.58" />
        </linearGradient>
      </defs>
    </svg>
  );
}
