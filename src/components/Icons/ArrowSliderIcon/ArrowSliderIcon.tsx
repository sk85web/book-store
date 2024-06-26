import './ArrowSliderIcon.css';

interface ArrowSliderIconProps {
  className?: string;
  onClick: () => void;
}

const ArrowSliderIcon: React.FC<ArrowSliderIconProps> = ({ className = '', onClick }) => {
  return (
    <div className={`arrow-slider-icon ${className}`} onClick={onClick}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" transform="translate(24) rotate(90)" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.2925 18.7125C13.1025 18.5125 13.0025 18.2625 13.0025 18.0025C13.0025 17.7425 13.1025 17.4925 13.2925 17.2925L17.5925 13.0025L4.0025 13.0025C3.4525 13.0025 3.0025 12.5525 3.0025 12.0025C3.0025 11.4525 3.4525 11.0025 4.0025 11.0025L17.5925 11.0025L13.2925 6.7125C12.9025 6.3225 12.9025 5.6825 13.2925 5.2925C13.6825 4.9025 14.3225 4.9025 14.7125 5.2925L20.7125 11.2925C20.8025 11.3825 20.8725 11.4925 20.9225 11.6125C20.9425 11.6625 20.9625 11.7025 20.9625 11.7525C21.0125 11.9125 21.0125 12.0925 20.9625 12.2525C20.9625 12.3025 20.9425 12.3425 20.9225 12.3925C20.8725 12.5125 20.8025 12.6225 20.7125 12.7125L14.7125 18.7125C14.3225 19.1025 13.6825 19.1025 13.2925 18.7125Z"
          fill="#313037"
        />
      </svg>
    </div>
  );
};

export { ArrowSliderIcon };
