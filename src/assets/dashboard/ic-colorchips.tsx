interface IconProps {
  color?: string;
  size?: number;
}

// type Size = {""}

export function HashtagIcon({ color = "#AE2E24", size = 36 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.45193 15.9303L8.76243 12.463H13.0577L13.9374 7.081L17.8187 6.71875L16.8872 12.463H20.8719L21.7517 7.081L25.5812 6.71875L24.6497 12.463H28.9967L28.6862 15.9303H24.0804L23.5112 19.7598H27.5477L27.2372 23.2788H22.9419L22.0622 28.9195L18.1809 29.2818L19.1124 23.2788H15.1794L14.2997 28.9195L10.4184 29.2818L11.3499 23.2788H7.00293L7.31343 19.7598H11.9192L12.5402 15.9303H8.45193ZM16.3179 15.9303L15.7487 19.7598H19.6817L20.3027 15.9303H16.3179Z"
        fill={color}
      />
    </svg>
  );
}
