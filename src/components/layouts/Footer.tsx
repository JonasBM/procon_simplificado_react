import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary py-1 ">
      <div className="container">
        &#169; 2021 - <small>CÁLCULO ENGENHARIA E PROGRAMAÇÃO LTDA</small>
        <br />
        <i className="bi bi-envelope">
          {" "}
          <a href="mailto:contato@calculoengenharia.com.br">
            contato@calculoengenharia.com.br
          </a>{" "}
        </i>
      </div>
    </footer>
  );
};

export default Footer;
