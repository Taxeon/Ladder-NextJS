"use client";

import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// import { Link } from 'react-router-dom';
import "./Navbar.css";
import { IconContext } from "react-icons";
import Link from "next/link";
import Image from "next/image";
import LadderImage from "../images/LadderCompetition2.jpeg";
import { SidebarData } from "./sidebarData";
import { usePathname } from "next/navigation";

function Navbar() {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);
	const existsToken = localStorage.getItem('accessToken');
	const currentPage = usePathname();

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
			<Link href={existsToken==null ? "/auth": "/account"} className="nav-menu-right" style={{visibility:currentPage=='/auth'?'hidden':'visible'}}>			
				{existsToken==null ? "Login" : "Hello"}
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
