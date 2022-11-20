import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./insert-item.css";
import utils from "../../api/utils";
import { selectCount } from "../../App/item-catalog-slice";

export const InsertItem = () => {
  const navigate = useNavigate();
  const count = useSelector(selectCount);
  const [defaultValue, setNewDefaultValue] = useState(undefined);
  const [Error, setError] = useState(true);

  if (count !== undefined && defaultValue === undefined) {
    setNewDefaultValue({ catalog: count });
    setError(false);
  }

  const { register, handleSubmit } = useForm({
    defaultValue,
  });
  const onSubmit = (data) => {
    utils.postItem(data).then((response) => {
      if (response.status === 200) window.location.reload(false);
    });
  };
  const onError = (errors, e) => console.log(errors, e);

  const categories = [
    { name: "Computers" },
    { name: "Laptops" },
    { name: "Televions" },
    { name: "Graphic Cards" },
    { name: "Displays" },
    { name: "Phones" },
  ];
  

  const categoriesMap = categories.map((c, i) => {
    return (
      <option value={c.name} key={i}>
        {c.name}
      </option>
    );
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="create-new-item"
    >
      <div className="name-div">
        <div>
          Product:
          <input
            type="text"
            className="new-item-name"
            placeholder="Enter name"
            {...register("name", { required: true })}
          />
        </div>
        <div>
          Quantity:
          <input
            type="number"
            className="new-item-quantity"
            {...register("quantity", { required: true })}
          />
        </div>
        {!Error && (
          <span type="number" className="new-item-catalog">
            Catalog number:
            <input
              type="number"
              value={count}
              readOnly={true}
              {...register("catalog")}
            />
          </span>
        )}
        {Error && (
          <span type="number" className="new-item-catalog">
            <span className="new-item-catalog-error">
              Error connecting to the server
            </span>
          </span>
        )}
      </div>
      <div className="image-div">
        <div>
          Image:
          <input
            type="text"
            className="new-item-image"
            placeholder="Enter image"
            {...register("image", { required: true })}
          />
        </div>
        <div>
          Price:
          <input
            type="number"
            className="new-item-price"
            {...register("price", { required: true })}
          />
        </div>
        <div>
          Choose a category:
          <select name="category" {...register("category", { required: true })}>
            {categoriesMap}
          </select>
        </div>
      </div>
      <div className="description-div">
        <textarea
          className="new-item-description"
          placeholder="description"
          {...register("description", { required: true })}
        />
      </div>
      <div className="button-div">
        <input type="submit" value="Submit" />
        <input
          type="button"
          value="Cancel"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </form>
  );
};
export default InsertItem;
