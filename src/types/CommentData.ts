export default interface CommentData {
	username: string;
	postID: string;
	contents: string;
	createdAt: string;
	repliesIDs: string[];  // comment IDs
	usersWhoLiked: string[];
}

