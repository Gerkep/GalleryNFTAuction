import EventsNavbar from "../../components/EventsNavbar";
import ComingSoon from "../ComingSoon";

const Profile = (props) => {
    return(
        <div>
            <EventsNavbar openPage="profile"/>
            <ComingSoon what="PROFILE"/>
        </div>
    )
}

export default Profile;