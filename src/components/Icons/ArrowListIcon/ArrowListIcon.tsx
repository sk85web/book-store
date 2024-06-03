import './ArrowListIcon.css';
type ArrowListIconProps = {
  className: string;
};

const ArrowListIcon: React.FC<ArrowListIconProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="10"
        height="7"
        viewBox="0 0 10 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9 1L5 5L1 1" stroke="#313037" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export { ArrowListIcon };
