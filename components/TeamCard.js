import Image from "next/image";

const TeamCard = ({ name, imagePath, content }) => {
  return (
    <div>
      <div className="card card-background">
        <Image
          className="card-img-top"
          src={imagePath}
          alt=""
          width={300}
          height={300}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-white">{name}</h5>
          <p className="card-text text-center text-secondary">
            {content}
          </p>
        </div>
        <svg viewBox="0 0 1920 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#181818"
            d="M 0 0 L 330 72 L 330 0 L 0 0 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#181818"
            d="M 329 72 L 776 4 L 776 0 L 329 0 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#181818"
            d="M 775 4 L 1408 173 L 1408 0 L 775 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#181818"
            d="M 1407 173 L 1920 0 L 1920 0 L 1407 0 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#000"
            d="M 0 0 L 330 72 L 330 320 L 0 320 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#000"
            d="M 329 72 L 776 4 L 776 320 L 329 320 Z"
            strokeWidth="0"
          ></path>{" "}
          <path
            fill="#000"
            d="M 775 4 L 1408 173 L 1408 320 L 775 320 Z"
            strokeWidth="0"
          ></path>
          <path
            fill="#000"
            d="M 1407 173 L 1920 0 L 1920 320 L 1407 320 Z"
            strokeWidth="0"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default TeamCard;
