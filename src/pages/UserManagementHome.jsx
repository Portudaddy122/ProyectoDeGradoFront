import React from "react";
import Menu from "../components/Menu";

import "./UserManagementPage.css";
import UserTable from "../components/UserTable";
import DynamycCard from "../components/DynamycCard";
import Header from "../components/Header";
import UsersIcon from '../assets/icons/Users.svg'
import UsersBIcon from '../assets/icons/UsersB.svg'

function UserManagementHome() {
  return (
    <>
      <section className="container-UserManagemet-Home">
      <Menu />
        <section className="header-container">
          <Header title={"DASHBOARD"} subtitle={"BIENVENIDO AL SISTEMA IDED"}/>
        </section>
        <section className="Card-Dinamc-Container">
          <DynamycCard NumberUsers={70} icon={UsersIcon} nameTitle={"Usuarios Nuevos"}/>
          <DynamycCard NumberUsers={50} icon={UsersBIcon} nameTitle={"Ingresos Hoy"}/>
          <DynamycCard NumberUsers={70} icon={UsersBIcon} nameTitle={"Total Profesores "}/>
          </section>
        
      </section>
    </>
  );
}

export default UserManagementHome;
