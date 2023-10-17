import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { User, signOut } from "firebase/auth";
import { Fragment, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { RootState } from "../../redux/store";

export default function Layout() {
	const { user } = useSelector((store: RootState) => store.user);
	const userProfileImg = (user as User).photoURL;

	const handleSignOut = useCallback(async () => {
		try {
			await signOut(auth);
		} catch (err) {
			console.error(err);
		}
	}, []);

	return (
		<span className="text-center">
			<header className="flex items-center justify-between px-4 py-1 border-b border-gray-200 ">
				<div className="text-start mx-auto max-w-2xl lg:mx-0">
					<Link
						to="/"
						className="text-3xl font-bold tracking-tight text-purple-900 sm:text-4xl"
					>
						Notes App
					</Link>
				</div>

				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
							{userProfileImg ? (
								<img
									className="w-8 rounded-full"
									src={userProfileImg}
									alt="profile"
								/>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path
										fillRule="evenodd"
										d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
										clipRule="evenodd"
									/>
								</svg>
							)}
							<ChevronDownIcon
								className="-mr-1 h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Menu.Button>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<a
											href="/"
											className={classNames(
												active ? "bg-gray-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Account settings
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="/"
											className={classNames(
												active ? "bg-gray-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}
										>
											Support
										</a>
									)}
								</Menu.Item>

								<Menu.Item>
									{({ active }) => (
										<button
											className={classNames(
												active ? "bg-gray-100 text-gray-900" : "text-gray-700",
												"block w-full px-4 py-2 text-left text-sm"
											)}
											onClick={handleSignOut}
										>
											Sign out
										</button>
									)}
								</Menu.Item>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</header>
			<Outlet />
		</span>
	);
}
