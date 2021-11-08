import { FC, memo, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, googleAuthProvider } from 'lib/firebase'
import { BookersTextField } from "cmps/base/bookers-textfield";
import { useForm, useFormState } from "react-hook-form";
import { BookersButton } from "cmps/base/bookers-button";
import { useToggle } from "lib/hooks/useToggle";
import googleIcon from 'assets/img/google.png'
import { bookersToast } from "lib/hooks/bookersToast";
import { createPortal } from "react-dom";
import { BookersModal } from "cmps/base/bookers-modal";
import { SignupForm, UserCred, UserPhoto } from "lib/models/User.interface";
import { UserCredential } from "firebase/auth";
import { userService } from "services/userService";
import { cloudinaryService, CLOUD_NAME } from "services/cloudinaryService";
import AddIcon from '@mui/icons-material/Add';
import { Image } from 'cloudinary-react'
import { passwordValidations, usernameValidations } from "services/validationService";
import { useNavigate } from "react-router";

export const LoginSignup: FC<{}> = () => {
    const [user] = useAuthState(auth)
    const { register, handleSubmit, formState } = useForm()
    const [isSignupOpen, toggleSignupOpen] = useToggle(false)

    const signInWithGoogle = async () => {
        try {
            await auth.signInWithPopup(googleAuthProvider);
        } catch (err) {
            console.error('err: ', err)
        }
    };

    const onSubmitLogin = async ({ email, password }: UserCred) => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (err) {
            bookersToast.error('One ore more fields are incorrect.', {
                duration: 5000
            })
        }
    }

    const onCloseSignupModal = useCallback(() => {
        toggleSignupOpen(false)
    }, [])

    const { isValid, touchedFields } = formState
    useEffect(() => {
        console.log('isValid: ', isValid)
    }, [isValid])

    return <div className="login-signup center-content">
        { }
        <form onSubmit={handleSubmit(onSubmitLogin)} action="" className="login-form login-and-search-layout flex column">
            <button className="btn-google btn flex align-center" onClick={signInWithGoogle}>
                <div className="google-icon">
                    <img src={googleIcon} />
                </div>
                <span> Sign in with Google</span>
            </button>
            <BookersTextField type="email" {...register('email', {
                required: true
            })}
                className="login-signup-form-field"
                label="Username/Email"
                errorMessage={formState.errors.email?.message}
            />
            <BookersTextField type="password" {...register('password', passwordValidations)}
                className="login-signup-form-field"
                label="Password"
                errorMessage={formState.errors.password?.message}
            />
            <div className="signup-suggestion">Doesn't have an account yet? Click <span onClick={() => toggleSignupOpen()} className="btn-signup-suggestion">here</span> !</div>
            <BookersButton className="btn" variant="outlined" type="submit">
                Submit
            </BookersButton>
            {isSignupOpen && <SignupModal onClose={onCloseSignupModal} />}
        </form>
    </div >
}

interface SignupModalProps {
    onClose: () => void
}


const SignupModal: FC<SignupModalProps> = memo(({ onClose }) => {
    const { register, watch, formState, setError, setValue, handleSubmit } = useForm()
    const navigate = useNavigate()
    const onSubmit = async ({ email, password, username, photo, matchPassword, }: SignupForm) => {
        console.log('submitting')
        try {
            const { user }: UserCredential = await auth.createUserWithEmailAndPassword(email, password)
            await userService.addUser({ ...user, username, photo })
            bookersToast.success(`Welcome, ${username}!`, {
                icon: '👋',
                duration: 5000
            })
            onClose()
            navigate('/books')
        } catch (err) {
            console.error('err: ', err)
        }
    }

    const onFinishUpload = useCallback((photo: UserPhoto) => {
        setValue('photo', photo)
    }, [])

    return createPortal(<BookersModal className="signup-modal" title="Sign up" onClose={onClose} open={true}>
        <div className="signup-modal-body">

            <form onSubmit={handleSubmit(onSubmit)} action="" className="login-form login-and-search-layout flex column">
                <Uploader
                    onFinishUpload={onFinishUpload}
                    labelProps={{
                        size: 70,
                        rounded: true
                    }}
                />
                <BookersTextField type="email" {...register('email')} className="login-signup-form-field" label="Email" />
                <BookersTextField {...register('username', usernameValidations)} errorMessage={formState.errors.username?.message} className="login-signup-form-field" label="Username" />
                <BookersTextField type="password" {...register('password', passwordValidations)} className="login-signup-form-field" label="Password" />
                <BookersTextField type="password" errorMessage={formState.errors.passwordMatch?.message} {...register('matchPassword')} className="login-signup-form-field" label="Re-enter Password" />
                <BookersButton color="secondary" className="btn" variant="contained" type="submit">
                    Submit
                </BookersButton>
            </form>
        </div>
    </BookersModal >, document.getElementById('modal-portal') as HTMLElement)
})

interface UploaderProps {
    onFinishUpload: (photo: UserPhoto) => void
    renderLabel?: ReactNode
    labelProps?: {
        size: number
        rounded?: boolean
    }
}

const Uploader: FC<UploaderProps> = ({ onFinishUpload, renderLabel, labelProps = {} }) => {
    const [isUploading, setIsUploading] = useState(false)
    const [photo, setPhoto] = useState<UserPhoto>({
        photoId: '',
        photoURL: ''
    })

    const onUpload: React.ChangeEventHandler<HTMLInputElement> | undefined = async (ev) => {
        setIsUploading(true);
        const { secure_url, public_id } = await cloudinaryService.uploadImg(
            ev!.target!.files![0]
        );
        const photo = { photoURL: secure_url, photoId: public_id }
        setPhoto(photo)
        setIsUploading(false);
        onFinishUpload(photo);
    }

    return <div className="uploader flex align-center justify-center">
        <label className="upload-label-container" htmlFor="imageUploader">
            {renderLabel ||
                <div style={{ width: labelProps.size, height: labelProps.size }} className={`default-label center-content ${labelProps.rounded && 'rounded'}`}>

                    {photo.photoId && <div className={`image-container ${labelProps.rounded && 'rounded'}`} >
                        <Image className={`${labelProps.rounded && 'rounded'}`} publicId={photo.photoId} height="100%" cloudName={CLOUD_NAME}>
                        </Image></div>}
                    <AddIcon />
                </div>
            }

        </label>
        <input
            onChange={onUpload}
            hidden
            type="file"
            accept="image/*"
            id="imageUploader"
        />
    </div>
}