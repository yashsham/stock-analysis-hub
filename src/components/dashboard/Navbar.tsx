import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../common/ThemeToggle';

export const Navbar: React.FC = () => {
  const { signOut, user } = useAuthStore();

  return (
    <nav className="bg-white dark:bg-github-secondary border-b border-gray-200 dark:border-github-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-github-text-primary">
              Stock Analytics Hub
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-github-accent-blue">
                <UserCircleIcon className="h-8 w-8 text-gray-400 dark:text-github-text-secondary" />
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-48 mt-2 origin-top-right bg-white dark:bg-github-secondary rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-github-text-primary">
                          {user?.email}
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => signOut()}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-github-dark' : ''
                          } block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-github-text-primary`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};