import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="text-center ">
			Notes App
			<Outlet />
		</div>
	);
}
