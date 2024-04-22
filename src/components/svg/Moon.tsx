import type { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

export default function Moon(props: Props) {
  return (
    <svg
      width="67"
      height="73"
      viewBox="0 0 67 73"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_i_3109_8)">
        <path
          d="M33.7458 0.573755C25.5049 11.7626 24.0759 27.0324 31.3455 39.6237C38.6151 52.215 52.5536 58.6124 66.3639 57.0701C63.4275 61.057 59.6261 64.5257 55.0452 67.1705C37.6085 77.2376 15.4802 71.5542 5.62019 54.4763C-4.23976 37.3983 1.90243 15.3929 19.3391 5.32581C23.9201 2.68103 28.8248 1.12334 33.7458 0.573755Z"
          fill="url(#paint0_linear_3109_8)"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_3109_8"
          x="0.91571"
          y="0.573755"
          width="65.4482"
          height="75.5752"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_3109_8"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3109_8"
          x1="35.5403"
          y1="-5.36006"
          x2="22.4575"
          y2="73.856"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFEE94" />
          <stop offset="1" stop-color="#FF9900" />
        </linearGradient>
      </defs>
    </svg>
  );
}
