import React, { Component } from 'react';
function ShowValues({func}){
    const show = ()=>{
        if(document.querySelector('.userBookedResults').style.display === 'block'){
            document.querySelector('.userBookedResults').style.display = 'none';
            document.querySelector('#toggle').innerHTML = "Show Results";
            {func()};
        }else{
            document.querySelector('#toggle').innerHTML = "Hide";
            document.querySelector('.userBookedResults').style.display = 'block';
        }}

        return (
            <button id='toggle' onClick={show}>Show Results</button>
        );
    }

 
export default ShowValues;