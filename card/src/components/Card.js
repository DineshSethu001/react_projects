
import React from 'react';
import UserImg from '../assets/img/hai.jpg';
import './styles.css'

const userData=[{
         name:"Dinesh",
         city:"Vellore",
        description:"Developer",
         skills:["react","js","HTML","CSS","SASS"],
         outline:true,


    },
{
         name:"Dinesh",
         city:"Vellore",
        description:"Developer",
         skills:["react","js","HTML","CSS","SASS"],
         outline:true,


    },
{
         name:"Dinesh",
         city:"Vellore",
        description:"Developer",
         skills:["react","js","HTML","CSS","SASS"],
         outline:true,


    }]

function User(props) {

    return (
        <div className='card-container'>
            <span className={props.online?"pro online":"pro offline"}>{props.online ?
            "online":"offline"}</span>
            <img src={UserImg} className="img" alt="user_img" />
            <h3>{props.name}</h3>
            <h3>Vellore</h3>
            <p>Developer</p>
            <div className='buttons'>
                <button className='primary'>Message</button>
                <button className='primary outline'>Follow</button>
            </div>
            <div className='skills'>
                <h6>Skills</h6>
                <ul>
                    {props.skills.map((skill,index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default function Card() {
    return (
        <div>
            {/* <User name="Dinesh" skills={["HTML", "CSS",
                "Javascript", "React Js"
                , "MongoDB", "Python", "MongoDB"]} online={false}/> */}
                {userData.map((user,index)=>(
<User key={index}
name={user.name}
city={user.city}
description={user.description}
online={user.online}
profile={user.profile}
skills={user.skills}
/>
                ))}
        </div>
    )
}