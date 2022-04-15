import { CommentEntity } from 'src/comment/comment.entity';

export type CommentType = Omit<CommentEntity, 'updateTimestamp'>;
