import supabase from "@utils/supabase";

export const useAuth = () => {
  const signUpWithEmail = async function signUpWithEmail(
    email: string,
    password: string
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const loginWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return { signUpWithEmail, loginWithEmail, getSession, signOut };
};

export default useAuth;

// TODO - memoize function?
// export const useAuth = () => {
//   const signUpWithEmail = useCallback(
//     async (email: string, password: string) => {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//       });
//       return { data, error };
//     },
//     []
//   );

//   const loginWithEmail = useCallback(
//     async (email: string, password: string) => {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       return { data, error };
//     },
//     []
//   );

//   return [signUpWithEmail, loginWithEmail];
// };
