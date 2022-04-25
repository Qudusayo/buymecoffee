import styles from "./style.module.scss";
import profilePic from "./../../assets/images/profile.png";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.Sidebar}>
      <div className={styles.Header}>
        <img src={profilePic} alt="profilePic" />
        <h3>Ayoola Abdulqudus</h3>
        <div className={styles.Buttons}>
          <button>Post</button>
          <button>Message</button>
        </div>
      </div>
      <ul>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? styles.isActive : "")}
        >
          <li>Creators | Follow</li>
        </NavLink>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? styles.isActive : "")}
        >
          <li>My Posts</li>
        </NavLink>
        <NavLink
          to="/dashboard/messages"
          className={(navData) => (navData.isActive ? styles.isActive : "")}
        >
          <li>Messages</li>
        </NavLink>
      </ul>
      <p>CREATOR DASHBOARD</p>
      <ul>
        <NavLink
          to="/dashboard/r"
          className={(navData) => {
            console.log(navData);
            return navData.isActive ? styles.isActive : "";
          }}
        >
          <li>Dashboard</li>
        </NavLink>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? styles.isActive : "")}
        >
          <li>Support</li>
        </NavLink>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? styles.isActive : "")}
        >
          <li>Members</li>
        </NavLink>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? styles.isActive : "")}
        >
          <li>Extra</li>
        </NavLink>
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? styles.isActive : "")}
        >
          <li>Settings</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
