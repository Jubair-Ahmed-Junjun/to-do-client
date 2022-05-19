import React, { useEffect } from 'react';
import {
  useAuthState,
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { toast } from 'react-hot-toast';
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Social = () => {
  const navigate = useNavigate();
  const [signInWithGoogle, userGo, loadingGo, errorGo] =
    useSignInWithGoogle(auth);
  const [signInWithFacebook, userFb, loadingFb, errorFb] =
    useSignInWithFacebook(auth);
  const [signInWithGithub, userGit, loadingGit, errorGit] =
    useSignInWithGithub(auth);

  const [userSocial] = useAuthState(auth);

  useEffect(() => {
    const err = errorFb || errorGit || errorGo;
    if (
      err?.message.includes('auth/account-exists-with-different-credential')
    ) {
      toast.error(
        `User already exist with this email. Please use another email or give correct credential`
      );
    }
  }, [errorFb, errorGit, errorGo]);

  return (
    <div className="text-center">
      <button
        onClick={() => signInWithGoogle()}
        class="mr-2 hover:text-slate-500"
      >
        <BsGoogle size={35} />
      </button>
      <button
        onClick={() => signInWithFacebook()}
        class="mr-2 hover:text-slate-500"
      >
        <BsFacebook size={35} />
      </button>
      <button onClick={() => signInWithGithub()} class=" hover:text-slate-500">
        <BsGithub size={35} />
      </button>
    </div>
  );
};

export default Social;
