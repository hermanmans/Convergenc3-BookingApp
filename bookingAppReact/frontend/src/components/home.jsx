import React from 'react';
import {NavLink} from 'react-router-dom';
import Selection from './common/select';
import ConfirmAlert from './common/confirmAlert';

function Home(){
    return(
        <section>
            <div>
                <Selection/>
                <ConfirmAlert
                label="Confirm"/>
                <h1>Welcome to Getaway Rooms</h1>
            </div>
            <div className='workForm'>
                <div>
                    <button><NavLink to='/login' className="nav-item nav-link">Login</NavLink></button>
                    <button><NavLink to='/register' className="nav-item nav-link">Register</NavLink></button>
                </div>
            </div>
        </section>
    );
}

export default Home;