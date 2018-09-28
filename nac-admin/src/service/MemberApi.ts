import { Firebase } from './Firebase';
import { Member } from '../model/member.model';

const fb = new Firebase();

export function MemberApi(){
    return {
        getMember(){
            return fb.auth.signInWithPopup(fb.googleAuthProvider);
        },
        getMemberList(){
            return fb.auth.signOut();
        }
    }
}

