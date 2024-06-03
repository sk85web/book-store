interface BookImageContainerProps {
  width?: string;
  image: string;
}

const color = ['#fee9e2', '#d7e4fd', '#f4eefd'];

const BookImageContainer: React.FC<BookImageContainerProps> = ({ width='auto', image }) => {
  return (
    <div
      className="image-block"
      style={{ backgroundColor: color[Math.floor(Math.random() * 3)], width }}
    >
      <img src={image} alt="book" />
    </div>
  );
};

export default BookImageContainer;
