import React from "react";

const KeyProductsInput = ({ keyProducts, setKeyProducts }) => {
    console.log({keyProducts})
    if(typeof keyProducts === 'string'){
        setKeyProducts([keyProducts])
    }
  const handleChange = (index, value) => {
    const updated = [...keyProducts];
    updated[index] = value;
    setKeyProducts(updated);
  };

  const handleAdd = () => {
    setKeyProducts([...keyProducts, ""]);
  };

  const handleRemove = (index) => {
    const updated = keyProducts.filter((_, i) => i !== index);
    setKeyProducts(updated);
  };

  return (
    <div className="form-group col-lg-12 col-md-12">
      <label>Key Products</label>
      {keyProducts.map((product, index) => (
        <div
          key={index}
          className="d-flex align-items-center mb-2"
        >
          <span className="me-2">{index + 1}.</span>
          <input
            type="text"
            className="form-control me-2"
            value={product}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Product ${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemove(index)}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary btn-sm mt-2"
        onClick={handleAdd}
      >
        Add Product
      </button>
    </div>
  );
};

export default KeyProductsInput;
