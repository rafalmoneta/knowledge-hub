type IconProps = React.SVGProps<SVGSVGElement>;

export const GithubIcon = (props: IconProps) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

export function SearchIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.333 12.667A5.333 5.333 0 107.333 2a5.333 5.333 0 000 10.667zM14 14l-2.9-2.9"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo(props: IconProps) {
  return (
    <svg
      width={326}
      height={94}
      viewBox="0 0 326 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.2035 2.60884C13.2035 1.61473 12.3976 0.808838 11.4034 0.808838H2.15889C1.16477 0.808838 0.358887 1.61473 0.358887 2.60884V58.1154H0.362244C0.626443 77.5323 16.4488 93.1911 35.9284 93.1911C55.573 93.1911 71.498 77.2661 71.498 57.6216C71.498 37.977 55.573 22.052 35.9284 22.052C27.2876 22.052 19.3663 25.1332 13.2035 30.2567V2.60884ZM13.2035 57.6216C13.2035 70.1722 23.3778 80.3466 35.9284 80.3466C48.4791 80.3466 58.6534 70.1722 58.6534 57.6216C58.6534 45.0709 48.4791 34.8966 35.9284 34.8966C23.3778 34.8966 13.2035 45.0709 13.2035 57.6216Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M189.008 22.0516C169.363 22.0516 153.438 37.9766 153.438 57.6211C153.438 77.2656 169.363 93.1907 189.008 93.1907C197.649 93.1907 205.57 90.1093 211.733 84.9854V89.9088C211.733 90.9029 212.539 91.7088 213.533 91.7088H222.778C223.772 91.7088 224.578 90.9029 224.578 89.9088V57.6213H224.577C224.577 37.9768 208.652 22.0516 189.008 22.0516ZM166.283 57.6211C166.283 45.0705 176.457 34.8961 189.008 34.8961C201.558 34.8961 211.733 45.0705 211.733 57.6211C211.733 70.1718 201.558 80.3461 189.008 80.3461C176.457 80.3461 166.283 70.1718 166.283 57.6211Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.8984 57.6216C76.8984 37.977 92.8235 22.052 112.468 22.052C132.113 22.052 148.038 37.977 148.038 57.6216C148.038 59.4776 147.895 61.3005 147.621 63.0799C147.49 63.9298 146.746 64.5375 145.886 64.5375L90.8146 64.5377C93.7406 73.7065 102.329 80.3466 112.468 80.3466C118.549 80.3466 124.072 77.958 128.151 74.0679C128.5 73.7343 128.961 73.5374 129.444 73.5374H141.371C142.71 73.5374 143.571 74.944 142.875 76.0877C136.633 86.3426 125.35 93.1911 112.468 93.1911C92.8235 93.1911 76.8984 77.2661 76.8984 57.6216ZM112.468 34.8966C101.968 34.8966 93.1317 42.0173 90.5241 51.6931L134.412 51.6931C131.804 42.0173 122.968 34.8966 112.468 34.8966Z"
        fill="currentColor"
      />
      <path
        d="M272.287 48.6827C272.262 41.0645 266.079 34.8966 258.455 34.8966C250.816 34.8966 244.624 41.0879 244.622 48.7259L244.622 89.909C244.622 90.9031 243.816 91.709 242.822 91.709H233.577C232.583 91.709 231.777 90.9032 231.777 89.909C231.777 76.1813 231.776 62.4536 231.777 48.7259C231.779 33.994 243.722 22.052 258.455 22.052C266.558 22.052 273.817 25.6647 278.709 31.3672C283.602 25.6647 290.861 22.052 298.964 22.052C313.698 22.052 325.641 33.9958 325.641 48.7292C325.641 62.4558 325.641 76.1824 325.641 89.909C325.641 90.9032 324.835 91.709 323.841 91.709H314.597C313.603 91.709 312.797 90.9032 312.797 89.909C312.797 76.1813 312.797 62.4536 312.797 48.7259C312.795 41.0879 306.603 34.8966 298.964 34.8966C291.34 34.8966 285.156 41.0649 285.132 48.6833L285.132 89.909C285.132 90.9032 284.326 91.709 283.332 91.709H274.087C273.093 91.709 272.287 90.9032 272.287 89.909L272.287 48.6827Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SpinnerIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle
        className="opacity-25"
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={4}
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function BoldIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 2.667h5.333a2.667 2.667 0 110 5.333H4V2.667z"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 8h6a2.667 2.667 0 010 5.333H4V8z"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ItalicIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.667 2.667h-6M9.333 13.333h-6M10 2.667L6 13.333"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.333 4H14M5.333 8H14M5.333 12H14M2 4h.007M2 8h.007M2 12h.007"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.667 8.667a3.333 3.333 0 005.026.36l2-2A3.334 3.334 0 008.98 2.313l-1.147 1.14"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.333 7.333a3.334 3.334 0 00-5.026-.36l-2 2a3.333 3.333 0 004.713 4.714l1.14-1.14"
        stroke="currentColor"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MarkdownIcon(props: IconProps) {
  return (
    <svg
      width={26}
      height={16}
      viewBox="0 0 26 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_33_726)">
        <path
          d="M24.125.625H1.875c-.69 0-1.25.56-1.25 1.25v12.25c0 .69.56 1.25 1.25 1.25h22.25c.69 0 1.25-.56 1.25-1.25V1.875c0-.69-.56-1.25-1.25-1.25z"
          stroke="currentColor"
          strokeWidth={1.29808}
        />
        <path
          d="M3.75 12.25v-8.5h2.5l2.5 3.125 2.5-3.125h2.5v8.5h-2.5V7.375L8.75 10.5l-2.5-3.125v4.875h-2.5zm15.625 0l-3.75-4.125h2.5V3.75h2.5v4.375h2.5l-3.75 4.125z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_33_726">
          <path fill="#fff" d="M0 0H26V16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.5 11.5l3.146-3.146a.5.5 0 000-.708L6.5 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 4.004c-.907 1.411-.686 3.31.5 4.496l4.793 4.793a1 1 0 001.414 0L13.5 8.5c1.186-1.186 1.407-3.085.5-4.496-1.38-2.147-4.584-2.123-6 0-1.416-2.123-4.62-2.147-6 0z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartFilledIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 4.004c-.907 1.411-.686 3.31.5 4.496l4.793 4.793a1 1 0 001.414 0L13.5 8.5c1.186-1.186 1.407-3.085.5-4.496-1.38-2.147-4.584-2.123-6 0-1.416-2.123-4.62-2.147-6 0z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 7l-11 11M6.5 7l11 11"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.5 2.513a1 1 0 011 1V11.5a1 1 0 01-1 1H5.37a1 1 0 00-.65.24l-1.57 1.345a1 1 0 01-1.65-.76V3.514a1 1 0 011-1h11z"
        stroke="currentColor"
      />
    </svg>
  );
}
