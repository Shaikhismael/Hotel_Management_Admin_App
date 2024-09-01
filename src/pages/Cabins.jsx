import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from '../features/cabins/cabinTableOperations'

function Cabins() {
  

  return (
  <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <CabinTableOperations></CabinTableOperations>
    </Row>
      <Row>
        <CabinTable />        
        <AddCabin></AddCabin>
      </Row>
  </>
  );
}

export default Cabins;
