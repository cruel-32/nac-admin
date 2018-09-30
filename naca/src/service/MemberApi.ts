import { Firebase } from './Firebase';
import { Member } from '../model/member.model';

export function MemberApi(){
    return {
        getMember(){
            return Firebase.auth.signInWithPopup(Firebase.googleAuthProvider);
        },
        getMemberList(){
            return Firebase.auth.signOut();
        }
    }
}

