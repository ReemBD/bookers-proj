import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { userService } from 'services/userService';
import { BookersUser } from 'lib/models/User.interface';

export const useUserData = () => {
  const [authUser] = useAuthState(auth);
  const [user, setUser] = useState<BookersUser | null>();

  useEffect(() => {
    if (authUser) {
      (async () => {
        const user = await userService.getUserById(authUser.uid);
        setUser(user);
      })();
    } else {
      setUser(null);
    }
  }, [authUser]);
  return { user, username: user };
};
