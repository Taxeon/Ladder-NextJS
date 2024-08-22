"use client";

import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";

import Link from "next/link";
import Image from "next/image";

import Cookies from 'js-cookie';

// import { Link } from 'react-router-dom';
import "./Navbar.css";
import LadderImage from "../images/LadderCompetition2.jpeg";
import { SidebarData } from "../../Resources/SidebarData";
import { usePathname } from "next/navigation";
import {useJwt} from "../utils/cookie/useJwt.jsx";


function Navbar() {
	const [sidebar, setSidebar] = useState(false);

	console.log('Navbar: Check for cookie')
	const jwtValues = useJwt();
		
	const showSidebar = () => setSidebar(!sidebar);	
	const currentPage = usePathname();

  useEffect(() => {
    if (jwtValues) {
      console.log('JWT values changed:', jwtValues);
      // Additional logic based on jwtValues
    }
  }, [jwtValues]);

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<div className="navbar">
					<Link href="#" className="menu-bars">
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
					<Image
						src={LadderImage}
						alt="Ladder Games Image"
						width={70}
						placeholder="blur"
						quality={100}
            id="centerimage"
					/>
			<Link href={!jwtValues || jwtValues.email =='Cookie not found' ?  "/auth": "/account"} 
						className="nav-menu-right" 
						style={{visibility:currentPage=='/auth'?'hidden':'visible'}}
						>			
				{!jwtValues || jwtValues.email =='Cookie not found' ?  "Login" :   `Hello ${jwtValues.email}`}
			</Link>
				</div>
				<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
					<ul className="nav-menu-items" onClick={showSidebar}>
						<li className="navbar-toggle">
							<Link href="#" className="menu-bars">
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link href={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}

export default Navbar;
