/**
 * Displays the application footer
 */
const Footer = () => {
  const link = "https://lacuesta.salesianos.edu";
  const target = "_blank";

  const divStyle = { textAlign: "center", marginTop: "1rem" };

  return (
    <div style={divStyle}>
      Copyright &copy; <small>{new Date().getFullYear()}</small> Acceso a datos{" "}
      <a href={link} target={target}>
        salesianos-lacuesta
      </a>
    </div>
  );
};

export default Footer;
