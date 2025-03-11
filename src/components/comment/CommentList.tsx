// CommentList.tsx
import React, { useEffect, useState } from "react";
import { CommentType } from "../../types/interface";
import CommentItem from "./CommentItem";
import { buildCommentTree } from "../../utils/Comment/CommentUtil"; 

interface CommentListProps {
    comments: CommentType[];
    openFormId: number | null; 
    setOpenFormId: (id: number | null) => void;  
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;  
    onSubmitSuccess: () => void;  
    openEditFormId: number | null;
    setOpenEditFormId: (boardNum: number | null) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, openFormId, setOpenFormId, setComments, onSubmitSuccess, openEditFormId, setOpenEditFormId }) => {
    const [treeComments, setTreeComments] = useState<CommentType[]>([]);

    useEffect(() => {
        const transformedComments = buildCommentTree(comments); 
        setTreeComments(transformedComments);
    }, [comments]);

    return (
        <div style={{marginLeft: "10px"}}>
            {treeComments.length === 0 ? <p>댓글이 없습니다.</p> : treeComments.map((comment) => (
                <CommentItem
                    key={comment.commentNum}
                    comment={comment}
                    openFormId={openFormId} 
                    setOpenFormId={setOpenFormId}  
                    setComments={setComments}  
                    onSubmitSuccess={onSubmitSuccess}
                    openEditFormId={openEditFormId}
                    setOpenEditFormId={setOpenEditFormId}
                />
            ))}
        </div>
    );
};

export default CommentList;

