import "./modal.css";

export default function Modal({ active, setActive, oneCategory }) {
  console.log(oneCategory);
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal__content flex justify-around"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2>{oneCategory?._id}</h2>
          <h2>{oneCategory?.price}</h2>
          <h2>{oneCategory?.title}</h2>
          <h2>{oneCategory?.description}</h2>
        </div>
      </div>
    </div>
  );
}
