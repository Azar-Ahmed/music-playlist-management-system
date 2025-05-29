import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <header className="flex justify-between items-center p-4  text-white">
      <h2 className="text-2xl font-bold">Hello {user?.name}</h2>

      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
        {user?.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
