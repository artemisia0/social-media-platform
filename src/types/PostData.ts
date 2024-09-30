import type CommentData from '@/types/CommentData';


export default interface PostData {
		authorUsername: string;
		usersWhoLiked: string[];
		_id: string;
		images: string[];
		texts: string[];
		createdAt: string;
}

