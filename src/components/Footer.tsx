const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#000000",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <p>
        &copy; {new Date().getFullYear()} Mi Empresa. Todos los derechos
        reservados.
      </p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <a href="/about">Acerca de Nosotros</a>
        </li>
        <li>
          <a href="/contact">Contacto</a>
        </li>
        <li>
          <a href="/privacy">Política de Privacidad</a>
        </li>
        <li>
          <a href="/terms">Términos y Condiciones</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
