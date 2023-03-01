import styles from "./Inventory.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useEffect, useState, useContext } from "react";
import Logo from "../../../src/Images/EquipmentsLogo.png";
import loadingAnimation from "../../../src/Images/loading_animation.gif";
import Axios from "axios";

const ModalInventory = (props) => {
  const { display, setDisplay, inventoryData, setInventoryData } =
    useContext(UserContext);

  const [updateDisplay, setUpdateDisplay] = useState(false);

  const [loading, setLoading] = useState(loadingAnimation);

  const [maintainenceLogDisplay, setMaintainenceLogDisplay] = useState(false);

  const navigate = useNavigate();

  const handleDisplay = () => {
    setDisplay(false);
    setLoading(null);
  };

  const handleUpdate = () => {
    navigate("/updateInventory");
    setDisplay(false);
  };

  const handleMaintenance = () => {
    navigate("/maintenance");
    setDisplay(false);
  };

  const handleMaintenanceLog = () => {
    // navigate("/maintenanceLog");
    setMaintainenceLogDisplay((prev) => !prev);
  };

  // console.log("Props", props.modalInventory);
  // console.log("global", inventoryData);

  console.log(inventoryData.maintenance_documents);

  console.log(maintainenceLogDisplay);

  return (
    <div className={styles.main_modal_container}>
      <div className={styles.modal_container}>
        {!maintainenceLogDisplay ? (
          inventoryData ? (
            [inventoryData].map((item) => (
              <div className={styles.wrap_container} key={item.unit}>
                <div className={styles.licence_container}>
                  <div className={styles.main_top_container}>
                    <div className={styles.top_container}>
                      <img src={Logo} alt="" className={styles.equi_logo} />
                      <div className={styles.title}>
                        <label>
                          Plate
                          <br /> Plaque
                        </label>
                        <p>{item.licence_plate}</p>
                      </div>
                    </div>
                    <p>
                      Issued pursuant to the <i>Highway Traffic Act</i> /
                      Délivré en vertu du <i>Code da la route</i>
                    </p>
                    <div className={styles.black_top_container}>
                      <p>
                        PERMIT - PLATE PORTION / CERTIFICATION D'IMM. - PLAQUE
                      </p>
                    </div>
                  </div>

                  <div className={styles.desc_container}>
                    <div className={styles.container_1}>
                      <div>
                        <label>
                          V.I.N. <br /> N.I.V.
                        </label>
                        <p> {item.VIN}</p>
                      </div>
                      <div>
                        <label>
                          MAKE <br /> MARQUE
                        </label>
                        <p>{item.made_by}</p>
                      </div>
                      <div>
                        <label>
                          VALTAG NO. <br /> N DE VALIDATION
                        </label>
                        <p></p>
                      </div>
                      <div>
                        <label>
                          CODE <br />
                        </label>
                        <p></p>
                      </div>
                      <div>
                        <label>
                          NAME <br /> NOM
                        </label>
                        <p> {item.ownership} </p>
                      </div>
                      <div>
                        <label>
                          ADDRESS <br /> ADDRESSE
                        </label>
                        <p></p>
                      </div>
                      <div>
                        <label>
                          MAILING ADDRESS <br /> ADDRESSE POSTALE
                        </label>
                        <p></p>
                      </div>

                      <div>
                        <label>Accidents and citations:</label>
                        <p>{item.accidents_and_citations} </p>
                      </div>
                    </div>

                    <div className={styles.container_2}>
                      <div>
                        <label>
                          R.I.N. <br /> N.I.T.
                        </label>
                        <p></p>
                      </div>

                      <div>
                        <label>
                          MODEL <br /> MODÉLE
                        </label>
                        <p></p>
                      </div>
                      <div>
                        <label>
                          Year <br /> ANŃEE
                        </label>
                        <p>{item.year}</p>
                      </div>

                      <div>
                        <label>
                          EXPIRY DATE <br /> DATE D'EXPIRATION
                        </label>
                        <p>
                          {item.safety_expiry_date
                            ? item.safety_expiry_date.substr(0, 10)
                            : ""}
                        </p>
                      </div>
                      <div>
                        <label>
                          REG. GROSS WT. <br /> POIDS BRUT ENR.
                        </label>
                        <p />
                      </div>
                    </div>
                  </div>
                  <div className={styles.bottom_container}>
                    <div className={styles.bottom_wrap_container}>
                      <div className={styles.bottom_upper_container}>
                        <div className={styles.upper_info_container}>
                          <label>OFFICE/BUREAU</label>
                          <p>1212121</p>
                        </div>
                        <div className={styles.upper_info_container}>
                          <label>EFF. DATE/EN VIGUEUR</label>
                          <p></p>
                        </div>
                        <div className={styles.upper_info_container}>
                          <label>PERMIT NO./N' DE CERTIFACT</label>
                          <p></p>
                        </div>
                      </div>
                      <div className={styles.signature_container}>
                        <label>Signature</label>
                        <img src alt="" />
                      </div>
                    </div>
                    <div className={styles.bottom_right_container}>
                      <p>
                        Minister of transportation <br /> Ministre des
                        Transports
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.container_3}>
                  <h2>Other information</h2>
                  <div className={styles.container_3_main}>
                    <div className={styles.left_container}>
                      <div>
                        <label>Unit:</label>
                        <p>{item.unit}</p>
                      </div>
                      <div>
                        <label>Type:</label>
                        <p>{item.type}</p>
                      </div>
                      <div>
                        <label>Plate expiry date:</label>
                        <p>
                          {" "}
                          {item.plate_expiry_date
                            ? item.plate_expiry_date.substr(0, 10)
                            : ""}
                        </p>
                      </div>
                      <div>
                        <label>Terminal:</label>
                        <p>{item.terminal}</p>
                      </div>
                      <div>
                        <label>ELD:</label>
                        <p>{item.ELD}</p>
                      </div>
                      <div>
                        <label>Color:</label>
                        <p>{item.color}</p>
                      </div>
                      <div>
                        <label>Description:</label>
                        <p>{item.description}</p>
                      </div>
                      <div>
                        <label>Number of axles:</label>
                        <p>{item.number_of_axles}</p>
                      </div>
                      <div>
                        <label>Weight:</label>
                        <p>{item.weight}</p>
                      </div>
                      <div>
                        <label>Other:</label>
                        <p>{item.other}</p>
                      </div>
                      <div>
                        <label>Tyre size:</label>
                        <p>{item.tyre_size} </p>
                      </div>
                      <div>
                        <label>Standard job:</label>
                        <p>{item.standard_job}</p>
                      </div>
                      <div>
                        <label>Annual Inspection:</label>
                        <p>
                          {item.annual_inspection
                            ? item.annual_inspection.substr(0, 10)
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className={styles.right_container}>
                      <div>
                        <label>Status:</label>
                        <p>{item.status}</p>
                      </div>

                      <div>
                        <label>Plate expiry date:</label>
                        <p>
                          {item.plate_expiry_date
                            ? item.plate_expiry_date.substr(0, 10)
                            : ""}
                        </p>
                      </div>

                      <div>
                        <label>Maintainence duration:</label>
                        <p>{item.maintenance_duration}</p>
                      </div>
                      <div>
                        <label>Next maintainence at:</label>
                        <p>
                          {item.next_maintenance_at
                            ? item.next_maintenance_at.substr(0, 10)
                            : ""}
                        </p>
                      </div>
                      <div>
                        <label>Last maintainence at:</label>
                        <p>
                          {item.last_maintenance_at
                            ? item.last_maintenance_at.substr(0, 10)
                            : ""}
                        </p>
                      </div>

                      {item.PM1 && (
                        <div>
                          <label>PM1:</label>
                          <p>{item.PM1 ? item.PM1.substr(0, 10) : ""}</p>
                        </div>
                      )}
                      {item.PM2 && (
                        <div>
                          <label>PM2:</label>
                          <p>{item.PM2 ? item.PM2.substr(0, 10) : ""}</p>
                        </div>
                      )}
                      {item.PM3 && (
                        <div>
                          <label>PM3:</label>
                          <p>{item.PM3 ? item.PM3.substr(0, 10) : ""}</p>
                        </div>
                      )}

                      <div>
                        <label>Maintainence delay:</label>
                        <p>{item.maintenance_delay}</p>
                      </div>
                      <div>
                        <label>Mechanical notes:</label>
                        <p>{item.mechanical_notes}</p>
                      </div>
                      {/* <div>
                      <label>Maintainence documents:</label>
                      {console.log(
                        props.modalInventory[0].maintenance_documents
                      )}
                      <button
                        className={styles.view_button}
                        onClick={(event) =>
                          props.modalInventory[0].maintenance_documents[
                            props.modalInventory[0].maintenance_documents
                              .length - 1
                          ] == "none"
                            ? "none"
                            : props.modalInventory[0].maintenance_documents[
                                props.modalInventory[0].maintenance_documents
                                  .length - 1
                              ] == null
                            ? "none"
                            : props.modalInventory[0].maintenance_documents[
                                props.modalInventory[0].maintenance_documents
                                  .length - 1
                              ] == undefined
                            ? "none"
                            : props.modalInventory[0].maintenance_documents[
                                props.modalInventory[0].maintenance_documents
                                  .length - 1
                              ] === [""]
                            ? "none"
                            : window.open(
                                `${
                                  props.modalInventory[0].maintenance_documents[
                                    props.modalInventory[0]
                                      .maintenance_documents.length - 1
                                  ]
                                }`,
                                "_blank"
                              )
                        }
                      >
                        View
                      </button>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <img src={loading} alt="" style={{ height: "700px" }} />
          )
        ) : inventoryData.maintenance_documents ? (
          inventoryData.maintenance_documents.map((item, index) => (
            <div className={styles.maintenance_container}>
              <div className={styles.upper_maintenacne_container}>
                <p className={styles.upper_maintenacne_container_index}>
                  {index + 1}.
                </p>
                <p>Type: {item.type}</p>
              </div>
              <p>Date: {item.date.substr(0, 10)}</p>
              <p>Invoice: {item.invoice}</p>
              <p>Safety certificate: {item.safety_certificate}</p>
              <p>Inspection checklist: {item.inspection_checklist}</p>
              <p>Actual date: {item.actual_date}</p>
              <p>Scheduled date: {item.scheduled_date}</p>
              <p>Delay: {item.delay}</p>
            </div>
          ))
        ) : (
          <img src={loading} alt="" style={{ height: "700px" }} />
        )}

        <div className={styles.button_container}>
          {!maintainenceLogDisplay && (
            <>
              <button onClick={handleDisplay} className="button_general">
                Close
              </button>

              <button className="button_general" onClick={handleUpdate}>
                Update
              </button>
              <button className="button_general" onClick={handleMaintenance}>
                Maintainence
              </button>
            </>
          )}

          <button className="button_general" onClick={handleMaintenanceLog}>
            {maintainenceLogDisplay ? "Back" : "Maintainence Log"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInventory;
