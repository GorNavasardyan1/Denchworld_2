import "./modal.css";

export default function Modal({
  active,
  setActive,
  oneCategory,
  nextImage,
  lastImage,
  countImgae,
  deletePhoto,
}) {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className="modal__content flex justify-between gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="w-[350px] h-[350px]">
            <img
              className="w-full h-full"
              src={oneCategory?.photos?.[countImgae]?.url}
              alt=""
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => lastImage(1)}
              className="my-2 text-[14px] text-white bg-sky-500 px-6 py-2 mx-1"
            >
              Last
            </button>
            <button
              onClick={() =>
                deletePhoto(
                  oneCategory._id,
                  oneCategory?.photos?.[countImgae]?.url
                )
              }
              className="my-2 text-[14px] text-white bg-red-600 px-6 py-2 mx-1"
            >
              Delete Photo
            </button>
            <button
              onClick={() => nextImage(1, (oneCategory?.photos).length)}
              className="my-2 text-[14px] text-white bg-sky-500 px-6 py-2 mx-1"
            >
              Next
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="mt-10">
            Product Title:
            <input className="mx-3" type="text" value={oneCategory?.title} />
          </span>
          <span className="mt-2">
            Product Price:
            <input className="mx-3" type="text" value={oneCategory?.price} />
          </span>
          <span className="mt-2">
            Product Description:
            <textarea
              rows="2"
              cols="50"
              value={oneCategory?.description}
            ></textarea>
          </span>
        </div>
      </div>
    </div>
  );
}
