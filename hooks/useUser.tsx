import { User } from '@supabase/auth-helpers-nextjs';
import { Subscription, UserDetails } from '../types';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';

export type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isUserLoading,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();

  const accessToken = session?.access_token ?? null;

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserSubscription = () => supabase.from('users').select('*').single();
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserSubscription(), getSubscription()]).then(
        (results) => {
          const userDetailPromise = results[0];
          const subscriptionPromise = results[1];
          if (userDetailPromise.status === 'fulfilled') {
            setUserDetails(userDetailPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(
              subscriptionPromise.value.data as unknown as Subscription
            );
          }
          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingData && !userDetails) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isUserLoading]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isUserLoading || isLoadingData,
    subscription,
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider');
  }
  return context;
};
