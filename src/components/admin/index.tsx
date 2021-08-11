import React from "react";
import AccordionItem from "../common/AccordionItem";
import BackupRestore from "./backupRestore";
import ListaTiposdeSituacoes from "./listaTiposdeSituacoes";
import ListaUsarios from "./listaUsuarios";

export default function Admin() {
  return (
    <div>
      <div className="mx-5 mt-2">
        <a
          href="https://materializecss.com/color.html#palette"
          target="_blank"
          rel="noreferrer noopener"
        >
          Paleta de cores para referência
        </a>
        <div className="accordion mt-2" id="accordionAdmin">
          <AccordionItem
            name="usuarios"
            title="Lista de usuários"
            accordionId="accordionAdmin"
          >
            <ListaUsarios />
          </AccordionItem>
          <AccordionItem
            name="tiposdesituacoes"
            title="Lista de Tipos de Locais"
            accordionId="accordionAdmin"
          >
            <ListaTiposdeSituacoes />
          </AccordionItem>
          <AccordionItem
            name="backuprestore"
            title="Backup & Restore"
            accordionId="accordionAdmin"
          >
            <BackupRestore />
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}
