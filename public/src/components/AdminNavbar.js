import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaCaretDown } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex space-x-4">
          <a href="/admin-dashboard" className="text-white px-3 py-2 rounded-md text-sm font-medium">
            Dashboard
          </a>
          <DropdownMenu title="Users">
            <a href="/user-management" className="block px-4 py-2 text-sm text-gray-700">View Users</a>
            <a href="/adminregister" className="block px-4 py-2 text-sm text-gray-700">Add User</a>
          </DropdownMenu>
          <DropdownMenu title="Roles">
            <a href="/role" className="block px-4 py-2 text-sm text-gray-700">View Roles</a>
            <a href="/addrole" className="block px-4 py-2 text-sm text-gray-700">Add Role</a>
            <a href="/assignrole" className="block px-4 py-2 text-sm text-gray-700">Assign Role</a>
          </DropdownMenu>
          <DropdownMenu title="Reports">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Monthly Report</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Yearly Report</a>
          </DropdownMenu>
          <DropdownMenu title="Settings">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Profile Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Account Settings</a>
          </DropdownMenu>
          <DropdownMenu title="More">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Help</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Feedback</a>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

const DropdownMenu = ({ title, children }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700">
          {title}
          <FaCaretDown className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {children}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Navbar;
