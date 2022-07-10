import Navbar from "./Navbar";
import ComingSoon from "../ComingSoon";

const Profile = (props) => {
    return(
        <div>
            <Navbar openPage="profile"/>
            <ComingSoon what="PROFILE"/>
        </div>
    )
}

export default Profile;