import React from 'react';
import './CSS/ControlPanel.css';
import './CSS/ControlPanelMobile.css';
import {Checkbox} from 'semantic-ui-react';
import {useDispatch, useSelector} from "react-redux";
import {state} from "../../types/state";
import {myMovies} from "../../actions";
import RangeSlider from "./RangeSlider";
import GenreSelector from "./GenreSelector";
import {useMediaQuery} from "@material-ui/core";

// Holder styr på parametere å endre søket etter
function ControlPanel(props: { refresh: () => void, show:boolean }) {

    const dispatch = useDispatch();
    // Henter inn score fra redux state
    const score = useSelector((state: state) => state.filter.score);
    // Henter årstall fra redux state
    const year = useSelector((state: state) => state.filter.year);
    const user = useSelector((state: state) => state.user);

    //Brukes for å bestemme hvilken meny som skal rendres.
    const mobile = useMediaQuery('(max-width: 1200px)').valueOf();

    function handleTick() {
        dispatch(myMovies())
    }

    return (
        <div className={mobile ? "MobilePanel":"ControlPanel"} style={{display:(props.show || !mobile) ? "initial":"none"}}>
            {!!user ?
                <div className={"Checkbox"}>
                    <h2>My movies</h2>
                    <Checkbox id={"checkboxMovie"} style={{margin: '10px'}} onChange={handleTick} toggle/>
                </div> : 
                <div/>}
            <GenreSelector refresh={props.refresh}/>
            <RangeSlider score={score} type="score"/>
            <RangeSlider score={year} type="year"/>
        </div>
    );
}

export default ControlPanel;