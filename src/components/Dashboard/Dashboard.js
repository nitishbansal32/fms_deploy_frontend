import { Link, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";

import Permission from "../../components/Permission/Permission";

import { UserContext } from "../../UserContext";

const Dashboard = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  return (
    <>
      {/* {!(isLoggedIn===null) ? ( */}
      <div className="wrapper_container">
        <Navbar />
        <div className={styles.main_container}>
          <div className={styles.container}>
            <div className={styles.top_description}>
              <h1>About FMS</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                facere quam ea hic ad nam tenetur facilis rem voluptate
                nesciunt? Molestiae ipsam quae eveniet iusto possimus eaque eum
                aliquid nulla! Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Debitis molestias dolores accusamus,
                voluptates consequuntur, quae magni blanditiis sit fuga ea
                aliquam quo modi repudiandae, eveniet et eaque placeat corrupti
                nostrum? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Tenetur, nemo inventore itaque voluptas aspernatur,
                recusandae eos quisquam vero animi necessitatibus corrupti eaque
                quibusdam suscipit doloremque libero! Magni quas eveniet harum.
              </p>
            </div>

            <div className={styles.content_container}>
              <div>
                <h2>Equipments</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>

              <div>
                <h2>Drivers</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>

              <div>
                <h2>Accident</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ) : (
                <Permission />
            )} */}
    </>
  );
  // }
};

export default Dashboard;
