import "./Loader.css";

/**
 * It is a component that displays a load spinner.
 */

const Loader = () => {
  return (
    <div className="container text-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
